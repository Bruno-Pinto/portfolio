import { content, type Locale } from "@/content/portfolio";
import { spinwheels } from "@/content/spinwheels";

export function getProjects(locale: Locale) {
  const t = content[locale],
    spin = spinwheels[locale];
  return [
    {
      id: "spinwheels",
      number: "01",
      title: spin.title,
      category: spin.label,
      summary: spin.subtitle,
      description: spin.description,
      tags: ["Java 21", "JavaFX", "Gradle", "JUnit"],
      overviewTitle: spin.featuresTitle,
      overview: spin.features,
      contributions: spin.contributions,
      details: spin.detail,
    },
    ...t.projects.map((p, i) => ({
      id: i === 0 ? "php" : "products",
      number: "0" + (i + 2),
      title: p.title,
      category: p.category,
      summary: p.text,
      description: p.text,
      tags: p.tags,
      overviewTitle: t.contributionTitle,
      overview: p.contributions,
      contributions: [] as string[],
      details: [p.detail],
    })),
  ];
}
export type ScannerProject = ReturnType<typeof getProjects>[number];
export const scannerText = {
  en: {
    label: "Project scanner",
    instruction:
      "Choose a card below. It moves into the scanner; its details appear here.",
    empty: "Place a project here",
    details: "Project details",
    select: "Scan project",
    return: "Return card",
    loaded: "In scanner",
    moving: "Moving card",
    scanning: "Scanning",
    pending:
      "The scan is in progress. Project details appear when it finishes.",
    ready: "Scan complete",
    idle: "Ready for a project",
    deck: "Choose a project",
    contribution: "My contribution",
  },
  de: {
    label: "Projekt-Scanner",
    instruction:
      "Wähle unten eine Karte. Sie bewegt sich in den Scanner; die Details erscheinen hier.",
    empty: "Hier ein Projekt platzieren",
    details: "Projektdetails",
    select: "Projekt scannen",
    return: "Karte zurücklegen",
    loaded: "Im Scanner",
    moving: "Karte wird bewegt",
    scanning: "Wird gescannt",
    pending: "Der Scan läuft. Die Projektdetails erscheinen nach Abschluss.",
    ready: "Scan abgeschlossen",
    idle: "Bereit für ein Projekt",
    deck: "Projekt auswählen",
    contribution: "Mein Beitrag",
  },
};
