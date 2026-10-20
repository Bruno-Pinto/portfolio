"use client";

import { useEffect } from "react";

// Progressive enhancement: content stays visible without JavaScript or motion.
export function PageMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (reduced.matches) continue;
          const target = entry.target;
          let frames: Keyframe[] = [{ opacity: 0 }, { opacity: 1 }];
          let duration = 650;
          if (target.matches("#hero-title")) {
            frames = [
              { clipPath: "inset(0 100% 0 0)", opacity: 0.4 },
              { clipPath: "inset(0 0% 0 0)", opacity: 1 },
            ];
            duration = 850;
          } else if (target.matches(".portrait-wrap")) {
            frames = [
              { clipPath: "inset(45% 0 45% 0)", opacity: 0.4 },
              { clipPath: "inset(0% 0 0% 0)", opacity: 1 },
            ];
            duration = 900;
          } else if (target.matches(".skill-card")) {
            frames = [
              { opacity: 0.3, scale: "0.96" },
              { opacity: 1, scale: "1" },
            ];
          } else if (target.matches(".job")) {
            frames = [
              { opacity: 0.25, clipPath: "inset(0 0 0 6%)" },
              { opacity: 1, clipPath: "inset(0 0 0 0%)" },
            ];
          }
          const animation = target.animate(frames, {
            duration,
            easing: "cubic-bezier(0.2, 0.7, 0.3, 1)",
          });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -16px 0px" },
    );
    document
      .querySelectorAll(
        "#hero-title, .hero-copy > p, .hero-copy .actions, .portrait-wrap, .job, #skills .skill-card, #contact > .container",
      )
      .forEach((element) => observer.observe(element));
    const surface = document.querySelector<HTMLElement>(".hero-surface");
    const backgroundObserver = new IntersectionObserver((entries) => {
      if (surface) surface.dataset.inView = String(entries[0].isIntersecting);
    });
    if (surface) backgroundObserver.observe(surface);
    const stop = () => {
      if (reduced.matches)
        animations.forEach((animation) => animation.cancel());
    };
    reduced.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      backgroundObserver.disconnect();
      reduced.removeEventListener("change", stop);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);
  return null;
}
