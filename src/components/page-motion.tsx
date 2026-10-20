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
          const animation = entry.target.animate(
            [
              { opacity: 0.85, transform: "translateY(8px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 460, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(
        ".hero-copy, .portrait-wrap, .job, #skills .skill-card, #contact > .container",
      )
      .forEach((element) => observer.observe(element));
    const stop = () => {
      if (reduced.matches)
        animations.forEach((animation) => animation.cancel());
    };
    reduced.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", stop);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);
  return null;
}
