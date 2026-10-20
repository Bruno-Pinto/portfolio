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
          if (entry.target.matches(".portrait-wrap")) {
            const image = entry.target.querySelector(".portrait-image");
            if (image) {
              // Two gentle power dips, then steady illumination. Never loops.
              const light = image.animate(
                [
                  { filter: "brightness(0.35) saturate(0.65)", offset: 0 },
                  { filter: "brightness(0.75) saturate(0.8)", offset: 0.25 },
                  { filter: "brightness(0.45) saturate(0.7)", offset: 0.36 },
                  { filter: "brightness(1) saturate(0.92)", offset: 0.65 },
                  { filter: "brightness(0.8) saturate(0.85)", offset: 0.76 },
                  { filter: "brightness(1) saturate(0.92)", offset: 1 },
                ],
                { duration: 1700, easing: "linear" },
              );
              animations.add(light);
              light.onfinish = () => animations.delete(light);
            }
          }
          const animation = entry.target.animate(
            [
              { opacity: 0, transform: "translateY(26px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 720, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -16px 0px" },
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
