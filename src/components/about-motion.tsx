"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function AboutMotion({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 901px)");
    const reveals = new Set<Animation>();
    let nextReveal = 0;
    let visible = false;
    let frame = 0;
    function update() {
      frame = 0;
      const offset =
        visible && desktop.matches && !reduced.matches
          ? Math.max(
              -120,
              Math.min(
                120,
                (window.innerHeight / 2 -
                  element!.getBoundingClientRect().top -
                  element!.offsetHeight / 2) *
                  0.3,
              ),
            )
          : 0;
      element!.style.setProperty("--about-parallax", offset + "px");
      if (!desktop.matches) return;
      const map = element!.getBoundingClientRect();
      const photo = element!
        .querySelector("[data-about-portrait] img")
        ?.getBoundingClientRect();
      if (!photo) return;
      element!
        .querySelectorAll<SVGPathElement>("[data-connect-to]")
        .forEach((path, index) => {
          const heading = element!
            .querySelector('[data-panel="' + path.dataset.connectTo + '"] h3')
            ?.getBoundingClientRect();
          if (!heading) return;
          const left = heading.left < photo.left;
          const startX = (left ? photo.left - 18 : photo.right + 18) - map.left;
          const startY =
            photo.top + photo.height * (index < 2 ? 0.28 : 0.76) - map.top;
          const endX =
            (left ? heading.right + 16 : heading.left - 16) - map.left;
          const endY = heading.top + heading.height / 2 - map.top;
          const elbowX = startX + (endX - startX) * (index % 2 ? 0.42 : 0.58);
          const diagonalX = elbowX + (left ? -22 : 22);
          path.setAttribute(
            "d",
            "M" +
              startX +
              " " +
              startY +
              "H" +
              elbowX +
              "L" +
              diagonalX +
              " " +
              endY +
              "H" +
              endX,
          );
        });
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        element.dataset.active = String(visible);
        schedule();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    const topics = new IntersectionObserver(
      (entries) => {
        update();
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          topics.unobserve(entry.target);
          if (reduced.matches) continue;
          const now = performance.now();
          const delay = Math.max(0, nextReveal - now);
          nextReveal = now + delay + 680;
          const panel = entry.target as HTMLElement;
          const line = element.querySelector(
            '[data-connect-to="' + panel.dataset.panel + '"]',
          );
          const animate = (
            target: Element,
            frames: Keyframe[],
            wait: number,
            duration: number,
          ) => {
            const animation = target.animate(frames, {
              delay: wait,
              duration,
              fill: "backwards",
              easing: "cubic-bezier(0.2, 0.7, 0.3, 1)",
            });
            reveals.add(animation);
            animation.onfinish = () => reveals.delete(animation);
          };
          if (line && desktop.matches)
            animate(
              line,
              [
                { strokeDasharray: "1", strokeDashoffset: "1", opacity: 0 },
                { strokeDasharray: "1", strokeDashoffset: "0", opacity: 1 },
              ],
              delay,
              420,
            );
          for (const child of panel.children)
            animate(
              child,
              [
                { opacity: 0, transform: "translateY(12px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              delay + (desktop.matches ? 180 : 0),
              500,
            );
        }
      },
      { threshold: 0.08 },
    );
    element
      .querySelectorAll(".about-panel")
      .forEach((panel) => topics.observe(panel));
    const stopReveals = () => {
      if (reduced.matches) reveals.forEach((animation) => animation.cancel());
    };
    reduced.addEventListener("change", stopReveals);
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    element
      .querySelectorAll(".about-panel, [data-about-portrait]")
      .forEach((item) => resize.observe(item));
    document.fonts.ready.then(schedule);
    return () => {
      observer.disconnect();
      topics.disconnect();
      reveals.forEach((animation) => animation.cancel());
      reduced.removeEventListener("change", stopReveals);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div ref={root} className={className} data-active="false">
      {children}
    </div>
  );
}
