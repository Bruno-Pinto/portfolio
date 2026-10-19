"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function SiteHeader({ children }: { children: ReactNode }) {
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const mobile = window.matchMedia("(max-width: 700px)");
    let previous = Math.max(0, window.scrollY);
    let frame = 0;

    function show() {
      element!.dataset.scrollHidden = "false";
      previous = Math.max(0, window.scrollY);
    }

    function update() {
      frame = 0;
      const current = Math.max(0, window.scrollY);
      if (
        !mobile.matches ||
        current <= element!.offsetHeight ||
        element!.querySelector(":focus-visible")
      ) {
        show();
        return;
      }
      // Accumulate small movements so touch scrolling does not flicker.
      const distance = current - previous;
      if (Math.abs(distance) < 12) return;
      element!.dataset.scrollHidden = distance > 0 ? "true" : "false";
      previous = current;
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function onFocus(event: FocusEvent) {
      if (
        event.target instanceof Element &&
        event.target.matches(":focus-visible")
      )
        show();
    }

    window.addEventListener("scroll", schedule, { passive: true });
    mobile.addEventListener("change", show);
    element.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("scroll", schedule);
      mobile.removeEventListener("change", show);
      element.removeEventListener("focusin", onFocus);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="site-header" id="top" ref={header}>
      {children}
    </header>
  );
}
