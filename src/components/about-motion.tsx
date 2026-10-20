"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Content is visible by default. Motion and measured connections are enhancement.
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
    const desktop = window.matchMedia("(min-width: 1051px)");
    const animations = new Set<Animation>();
    let frame = 0;
    function update() {
      frame = 0;
      if (!desktop.matches) return;
      const svg = element!
        .querySelector("svg.about-connections")
        ?.getBoundingClientRect();
      if (!svg) return;
      element!
        .querySelectorAll<SVGPathElement>("[data-connect-to]")
        .forEach((path) => {
          const id = path.dataset.connectTo;
          const start = element!
            .querySelector('[data-profile-anchor="' + id + '"]')
            ?.getBoundingClientRect();
          const end = element!
            .querySelector('[data-panel="' + id + '"] [data-node-anchor]')
            ?.getBoundingClientRect();
          if (!start || !end) return;
          const x = start.left + start.width / 2 - svg.left;
          const y = start.top + start.height / 2 - svg.top;
          const endX = end.left + end.width / 2 - svg.left;
          const endY = end.top + end.height / 2 - svg.top;
          if (id === "music") {
            const portraitBottom =
              element!
                .querySelector("[data-about-portrait]")!
                .getBoundingClientRect().bottom - svg.top;
            const panelTop =
              element!
                .querySelector('[data-panel="music"]')!
                .getBoundingClientRect().top - svg.top;
            const elbowY = (portraitBottom + panelTop) / 2;
            path.setAttribute("d", `M${x} ${y}V${elbowY}H${endX}V${endY}`);
          } else {
            const elbow = x + (endX - x) * 0.5;
            const diagonal = elbow + Math.sign(endX - x) * 14;
            path.setAttribute(
              "d",
              `M${x} ${y}H${elbow}L${diagonal} ${endY}H${endX}`,
            );
          }
        });
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function animate(target: Element, keyframes: Keyframe[], delay: number) {
      const animation = target.animate(keyframes, {
        duration: 380,
        delay,
        easing: "cubic-bezier(.2,.7,.3,1)",
        fill: "backwards",
      });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    }
    const visibility = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        element.dataset.active = String(visible);
        if (visible) {
          element.dataset.revealed = "true";
          schedule();
        }
      },
      { threshold: 0.08 },
    );
    visibility.observe(element);
    const topics = new IntersectionObserver(
      (entries) => {
        update();
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          topics.unobserve(entry.target);
          if (reduced.matches) return;
          const panel = entry.target as HTMLElement;
          const index = Array.from(
            element.querySelectorAll(".about-panel"),
          ).indexOf(panel);
          const delay = desktop.matches ? index * 65 : 0;
          const path = element.querySelector(
            '[data-connect-to="' + panel.dataset.panel + '"]',
          );
          if (path && desktop.matches)
            animate(
              path,
              [
                { strokeDasharray: "1", strokeDashoffset: "1" },
                { strokeDasharray: "1", strokeDashoffset: "0" },
              ],
              delay,
            );
          for (const child of panel.children) {
            if (child.hasAttribute("data-node-anchor")) continue;
            animate(
              child,
              [
                { opacity: 0.55, translate: "-6px 0" },
                { opacity: 1, translate: "0 0" },
              ],
              delay,
            );
          }
        });
      },
      { threshold: 0.15 },
    );
    element
      .querySelectorAll(".about-panel")
      .forEach((panel) => topics.observe(panel));
    function preferenceChanged() {
      if (reduced.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
      schedule();
    }
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    element
      .querySelectorAll(".about-panel, [data-about-portrait]")
      .forEach((node) => resize.observe(node));
    document.fonts.ready.then(schedule);
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    reduced.addEventListener("change", preferenceChanged);
    schedule();
    return () => {
      visibility.disconnect();
      topics.disconnect();
      resize.disconnect();
      animations.forEach((animation) => animation.cancel());
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      reduced.removeEventListener("change", preferenceChanged);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div ref={root} className={className} data-active="false">
      {children}
    </div>
  );
}
