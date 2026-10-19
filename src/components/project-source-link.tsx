import { GitHubIcon } from "@/components/github-icon";
import type { Locale } from "@/content/portfolio";

export function ProjectSourceLink({
  url,
  title,
  locale,
}: {
  url: string | null;
  title: string;
  locale: Locale;
}) {
  if (!url) return null;
  const text =
    locale === "en" ? "View source on GitHub" : "Quellcode auf GitHub";
  const newTab =
    locale === "en" ? "opens in a new tab" : "öffnet in einem neuen Tab";
  return (
    <a
      className="project-source-link"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={text + ": " + title + " (" + newTab + ")"}
    >
      <GitHubIcon /> {text} <span aria-hidden="true">↗</span>
    </a>
  );
}
