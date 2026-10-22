import { content, type Locale } from "@/content/portfolio";
import { spinwheels } from "@/content/spinwheels";
import { personalProjects } from "@/content/personal-projects";
import { portfolioProject } from "@/content/portfolio-project";

// Category identity is locale-independent; foil status remains separate.
export const projectCategories = {
  professional: { accent: "#7EDFE6" },
  university: { accent: "#CBBBF0" },
  personal: { accent: "#9ED6B1" },
  infrastructure: { accent: "#E8C18A" },
} as const;
const projectKinds: Record<string, keyof typeof projectCategories> = {
  php: "professional",
  spinwheels: "university",
  portfolio: "personal",
  products: "professional",
  itsm: "infrastructure",
  "mission-life": "personal",
  "mission-chess": "personal",
};

const repositories: Record<string, string> = {
  "mission-life": "https://github.com/Bruno-Pinto/Mission-Life",
  "mission-chess": "https://github.com/Bruno-Pinto/Mission-Chess",
  portfolio: "https://github.com/Bruno-Pinto/portfolio",
};

export function getProjects(locale: Locale) {
  const t = content[locale],
    spin = spinwheels[locale];
  const professional = t.projects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    summary: p.text,
    description: p.text,
    tags: p.tags,
    overviewTitle: t.contributionTitle,
    overview: p.contributions,
    contributions: [] as string[],
    details: p.detail,
  }));
  const racing = {
    id: "spinwheels",
    title: spin.title,
    category: spin.label,
    summary: spin.subtitle,
    description: spin.description,
    tags: ["Java 21", "JavaFX", "Gradle", "JUnit"],
    overviewTitle: spin.featuresTitle,
    overview: spin.features,
    contributions: spin.contributions,
    details: spin.detail,
  };
  return [
    professional[0],
    racing,
    portfolioProject[locale],
    professional[1],
    professional[2],
    ...personalProjects[locale],
  ].map((project, i) => ({
    ...project,
    kind: projectKinds[project.id],
    accent: projectCategories[projectKinds[project.id]].accent,
    repositoryUrl: repositories[project.id] ?? null,
    featured: ["php", "spinwheels", "portfolio"].includes(project.id),
    number: String(i + 1).padStart(2, "0"),
  }));
}
export type ScannerProject = ReturnType<typeof getProjects>[number];
export const scannerText = {
  en: {
    label: "Project scanner",
    instruction:
      "Select a card from the deck below. Its details appear after the scan.",
    empty: "Choose a card below to scan it",
    hintClick: "Click a card to scan it",
    hintTap: "Tap a card to scan it",
    keyboard:
      "Use Tab to focus a project card, then Enter or Space to scan it.",
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
    chooseAnother: "Choose another project",
    contribution: "My contributions",
  },
  de: {
    label: "Projekt-Scanner",
    instruction:
      "Wähle unten eine Karte aus. Nach dem Scan erscheinen hier die Details.",
    empty: "Zum Scannen unten eine Karte auswählen",
    hintClick: "Klicke auf eine Karte, um sie zu scannen",
    hintTap: "Tippe auf eine Karte, um sie zu scannen",
    keyboard:
      "Mit Tab eine Projektkarte fokussieren, dann mit Enter oder Leertaste scannen.",
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
    chooseAnother: "Anderes Projekt auswählen",
    contribution: "Meine Beiträge",
  },
};
