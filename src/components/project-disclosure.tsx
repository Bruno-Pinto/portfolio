"use client";

import { useState, type ReactNode } from "react";
import type { Locale } from "@/content/portfolio";

export function ProjectDisclosure({
  id,
  locale,
  title,
  children,
}: {
  id: string;
  locale: Locale;
  title: string;
  children: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const label =
    locale === "en"
      ? expanded
        ? "Close details"
        : "Explore project"
      : expanded
        ? "Details schliessen"
        : "Projekt ansehen";
  return (
    <details
      className="project-disclosure"
      onToggle={(event) => setExpanded(event.currentTarget.open)}
    >
      <summary
        aria-label={label + ": " + title}
        aria-expanded={expanded}
        aria-controls={id}
      >
        <span>{label}</span>
        <span className="disclosure-symbol" aria-hidden="true">
          {expanded ? "\u00d7" : "+"}
        </span>
      </summary>
      <div id={id} className="project-expanded">
        {children}
      </div>
    </details>
  );
}
