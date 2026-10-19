export const portfolioProject = {
  en: {
    id: "portfolio",
    title: "Developer portfolio",
    category: "Personal / Web application",
    summary: "A bilingual portfolio with an interactive project scanner.",
    description:
      "This English/German portfolio combines an interactive project scanner with a straightforward list view.",
    tags: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    overviewTitle: "Application features",
    overview: [
      "Localized English and German pages",
      "Keyboard-accessible interactions and reduced-motion support",
      "Static export, Docker packaging and Playwright browser checks",
    ],
    contributions: [],
    details: [
      "The scanner uses the browser Web Animations API to move cards between the project tray and scan area. The list view provides the same project information without the scan sequence.",
      "Next.js generates static files at build time. Nginx serves those files from a Docker image, without a production Node.js process or database.",
    ],
  },
  de: {
    id: "portfolio",
    title: "Entwicklerportfolio",
    category: "Privat / Webanwendung",
    summary: "Ein zweisprachiges Portfolio mit interaktivem Projekt-Scanner.",
    description:
      "Dieses Portfolio auf Deutsch und Englisch verbindet einen interaktiven Projekt-Scanner mit einer einfachen Listenansicht.",
    tags: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    overviewTitle: "Funktionen der Anwendung",
    overview: [
      "Lokalisierte Seiten auf Deutsch und Englisch",
      "Tastaturbedienung und Unterstützung für reduzierte Bewegung",
      "Statischer Export, Docker-Paket und Playwright-Browsertests",
    ],
    contributions: [],
    details: [
      "Der Scanner bewegt Karten mit der Web Animations API des Browsers zwischen Projektauswahl und Scanfläche. Die Listenansicht zeigt dieselben Projektinformationen ohne Scan-Ablauf.",
      "Next.js erzeugt beim Build statische Dateien. Nginx liefert diese aus einem Docker-Image aus. Ein Node.js-Prozess oder eine Datenbank wird im Produktivbetrieb nicht benötigt.",
    ],
  },
};
