"use client";
import { useEffect, useState } from "react";

const sections = ["experience", "work", "skills", "about", "contact"];
export function SectionNav({
  labels,
  label,
}: {
  labels: string[];
  label: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const header = document.querySelector(".site-header");
      const threshold = (header?.getBoundingClientRect().height ?? 100) + 100;
      let current: string | null = null;
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= threshold)
          current = id;
      }
      setActive(current);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <nav aria-label={label}>
      {labels.map((text, i) => (
        <a
          key={sections[i]}
          href={"#" + sections[i]}
          aria-current={active === sections[i] ? "location" : undefined}
        >
          {text}
        </a>
      ))}
    </nav>
  );
}
