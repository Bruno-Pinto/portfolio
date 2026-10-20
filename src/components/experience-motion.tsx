"use client";

import { useEffect } from "react";

export function ExperienceMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const pending = new Map<Element, Animation[]>();
    const running = new Set<Animation>();
    function prepare(
      target: Element,
      frames: Keyframe[],
      duration: number,
      pseudoElement?: string,
    ) {
      const animation = target.animate(frames, {
        duration,
        fill: "both",
        easing: "cubic-bezier(0.2, 0.7, 0.3, 1)",
        pseudoElement,
      });
      animation.pause();
      running.add(animation);
      animation.onfinish = () => {
        animation.cancel();
        running.delete(animation);
      };
      return animation;
    }
    const headerHeight =
      document.querySelector(".site-header")?.getBoundingClientRect().height ??
      100;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Tall cards must still reveal when they cannot fit in the viewport.
          const requiredHeight = Math.min(
            entry.boundingClientRect.height * 0.65,
            (window.innerHeight - headerHeight) * 0.8,
          );
          if (
            !entry.isIntersecting ||
            entry.intersectionRect.height + 1 < requiredHeight
          )
            continue;
          observer.unobserve(entry.target);
          const animations = pending.get(entry.target);
          if (!animations) continue;
          animations.forEach((animation) => {
            animation.effect?.updateTiming({
              delay:
                (animation.effect as KeyframeEffect).pseudoElement === "::after"
                  ? 80
                  : 0,
            });
            animation.play();
          });
        }
      },
      {
        threshold: Array.from({ length: 21 }, (_, index) => index / 20),
        rootMargin: "-" + headerHeight + "px 0px 0px",
      },
    );
    document.querySelectorAll(".timeline .job").forEach((job) => {
      const animations = [
        prepare(
          job,
          [
            { opacity: 0, transform: "translateX(-16px)" },
            { opacity: 1, transform: "translateX(0)" },
          ],
          560,
        ),
      ];
      if (job.nextElementSibling)
        animations.push(
          prepare(
            job,
            [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
            480,
            "::after",
          ),
        );
      const meta = job.querySelector(".job-meta");
      if (meta)
        animations.push(
          prepare(
            meta,
            [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
            280,
            "::before",
          ),
        );
      pending.set(job, animations);
      observer.observe(job);
    });
    function stop() {
      if (!reduced.matches) return;
      observer.disconnect();
      running.forEach((animation) => animation.cancel());
      running.clear();
    }
    function onFocus(event: FocusEvent) {
      const job =
        event.target instanceof Element ? event.target.closest(".job") : null;
      if (!job) return;
      observer.unobserve(job);
      pending.get(job)?.forEach((animation) => {
        animation.cancel();
        running.delete(animation);
      });
    }
    reduced.addEventListener("change", stop);
    document.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect();
      running.forEach((animation) => animation.cancel());
      reduced.removeEventListener("change", stop);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);
  return null;
}
