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
    const observer = new IntersectionObserver(
      (entries) => {
        element.dataset.active = String(entries[0].isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={root} className={className} data-active="false">
      {children}
    </div>
  );
}
