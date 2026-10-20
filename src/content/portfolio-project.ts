export const portfolioProject = {
  en: {
    id: "portfolio",
    tags: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    contributions: [],
    title: "Developer portfolio",
    category: "Personal / Web application",
    summary:
      "A bilingual portfolio with a project scanner and an accessible list view.",
    description:
      "Built with Next.js, React and TypeScript to present my projects, experience and skills in English and German. The scanner offers an interactive way to explore the same content available in the project list.",
    overviewTitle: "Application features",
    overview: [
      "Draggable project cards with flight, scan and return animations",
      "Keyboard navigation, focus restoration and reduced-motion support",
      "Expandable project list, categorized skills and a personal identity map",
      "Mobile project picker and compact results after the full scan",
    ],
    details: [
      "Technical highlight: Both project views use the same typed content model. The Web Animations API handles card flights, while selection and scan states coordinate project switching, returns and keyboard focus.",
      "Next.js exports static files that Nginx serves from a multi-stage Docker image. Node.js is used for development and builds; the deployed site needs neither a Node.js server nor a database.",
      "Playwright checks both languages, responsive layouts, scanner interactions and text contrast. TypeScript, ESLint and formatting checks support local development.",
    ],
  },
  de: {
    id: "portfolio",
    tags: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    contributions: [],
    title: "Entwicklerportfolio",
    category: "Privat / Webanwendung",
    summary:
      "Ein zweisprachiges Portfolio mit Projekt-Scanner und zugänglicher Listenansicht.",
    description:
      "Mit Next.js, React und TypeScript entwickelt, um meine Projekte, Berufserfahrung und Kenntnisse auf Deutsch und Englisch zu zeigen. Der Scanner bietet einen interaktiven Zugang zu denselben Inhalten wie die Projektliste.",
    overviewTitle: "Funktionen der Anwendung",
    overview: [
      "Ziehbare Projektkarten mit Flug-, Scan- und Rückgabeanimationen",
      "Tastaturbedienung, gezielte Fokusrückgabe und reduzierte Bewegung",
      "Aufklappbare Projektliste, gruppierte Kenntnisse und eine persönliche Profilkarte",
      "Mobile Projektauswahl und kompakte Ansicht nach dem vollständigen Scan",
    ],
    details: [
      "Technisches Highlight: Beide Projektansichten nutzen dasselbe typisierte Inhaltsmodell. Die Web Animations API bewegt die Karten; Auswahl- und Scan-Zustände koordinieren Projektwechsel, Rückgaben und den Tastaturfokus.",
      "Next.js exportiert statische Dateien, die Nginx aus einem mehrstufig gebauten Docker-Image ausliefert. Node.js wird für Entwicklung und Build benötigt; die veröffentlichte Website braucht weder einen Node.js-Server noch eine Datenbank.",
      "Playwright prüft beide Sprachen, responsive Layouts, Scanner-Interaktionen und Textkontraste. TypeScript, ESLint und Formatierungsprüfungen unterstützen die lokale Entwicklung.",
    ],
  },
};
