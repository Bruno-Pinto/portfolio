import type { CSSProperties } from "react";
import type { ScannerProject } from "@/content/project-scanner";

export function projectAccent(project: ScannerProject): CSSProperties {
  return { "--project-accent": project.accent } as CSSProperties;
}

const takeawayPrefixes = [
  "Outcome: ",
  "Ergebnis: ",
  "Technical highlight: ",
  "Technisches Highlight: ",
];
export function isProjectTakeaway(text: string) {
  return takeawayPrefixes.some((prefix) => text.startsWith(prefix));
}

export function ProjectDetailParagraph({ text }: { text: string }) {
  const prefix = takeawayPrefixes.find((value) => text.startsWith(value));
  return prefix ? (
    <p
      className="project-takeaway"
      data-detail-kind={
        prefix === takeawayPrefixes[0] || prefix === takeawayPrefixes[1]
          ? "outcome"
          : "decision"
      }
    >
      <strong>{prefix}</strong>
      {text.slice(prefix.length)}
    </p>
  ) : (
    <p>{text}</p>
  );
}
