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
    let visible = false;
    let frame = 0;
    function update() {
      frame = 0;
      const offset =
        visible && desktop.matches && !reduced.matches
          ? Math.max(
              -28,
              Math.min(
                28,
                (window.innerHeight / 2 -
                  element!.getBoundingClientRect().top -
                  element!.offsetHeight / 2) *
                  0.07,
              ),
            )
          : 0;
      element!.style.setProperty("--about-parallax", offset + "px");
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
    return () => {
      observer.disconnect();
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
