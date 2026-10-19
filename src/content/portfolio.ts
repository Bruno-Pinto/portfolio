export type Locale = "en" | "de";
export const content = {
  en: {
    nav: ["Experience", "Projects", "About", "Contact"],
    skip: "Skip to content",
    role: "Software Developer",
    student: "Computer Science student at ZHAW",
    location: "Zurich, Switzerland",
    description:
      "I develop web applications with PHP and SQL. My experience includes intranet development at the University of Zurich and client applications at Rocketlaunch.",
    explore: "Explore my work",
    contact: "Get in touch",
    emailLabel: "Email",
    work: "Selected work",
    workTitle: "Projects",
    workIntro:
      "Professional web applications first, followed by Java team and personal projects.",
    details: "Project details",
    contributionTitle: "My contribution",
    projects: [
      {
        title: "PHP intranet development",
        category: "Professional / PHP",
        text: "Architecture, migration and development of an intranet web service at the University of Zurich.",
        tags: ["PHP", "SQL", "GitLab CI/CD"],
        contributions: [
          "Migrated and extended the intranet web service",
          "Refactored PHP code and SQL database queries",
          "Integrated GitLab for version control, CI/CD and deployments",
        ],
        detail:
          "At the University of Zurich’s Institute of Medical Microbiology, I worked on the architecture, migration and development of a PHP intranet service. This included SQL database queries, LDAP / Active Directory integration and GitLab-based version control, CI/CD and deployment processes.",
        id: "php",
      },
      {
        title: "Applications and a marketplace",
        category: "Professional / Product development",
        text: "Client applications and technical project planning at Rocketlaunch; a two-sided marketplace at Kork Tech.",
        tags: ["Bubble.io", "XANO", "Product development"],
        contributions: [
          "Built client applications with Bubble.io and XANO",
          "Developed a two-sided marketplace",
          "Planned technical projects and coordinated developers",
        ],
        detail:
          "As Co-Founder and CTO at Rocketlaunch, I developed client applications using Bubble.io and XANO and coordinated the technical team. I planned and delivered technical projects, with responsibility for budgets and schedules, evaluated new technologies and improved development processes. Separately, at Kork Tech AG, I developed and launched a two-sided marketplace using Bubble.io.",
        id: "products",
      },
      {
        id: "itsm",
        title: "Central ticketing system",
        category: "Professional / ITSM",
        text: "Designed and implemented a central ticketing system at the University of Zurich.",
        tags: ["ITSM", "Documentation"],
        contributions: [
          "Designed and implemented the ticketing system",
          "Continued developing the system",
          "Created and maintained technical documentation",
        ],
        detail:
          "Alongside the intranet work, I designed and implemented a central ticketing system at the Institute of Medical Microbiology and continued developing it. I maintained technical documentation to support knowledge transfer and ongoing operation.",
      },
    ],
    experience: "Experience",
    experienceTitle: "Work experience",
    jobs: [
      {
        company: "University of Zurich · Institute of Medical Microbiology",
        role: "Student Assistant",
        date: "15 Oct 2025 — 14 Oct 2026",
        points: [
          "Worked on the architecture, migration and development of an intranet web service.",
          "Integrated GitLab for version control, CI/CD and deployments.",
          "Designed and implemented a central ticketing system and maintained technical documentation.",
        ],
        area: "Web development",
        tags: ["PHP", "SQL", "GitLab CI/CD"],
      },
      {
        company: "IKAMED Institute AG",
        role: "IT Hardware & Software Support",
        date: "Jul 2025 — Mar 2026",
        points: [
          "Resolved hardware and software issues, configured computers and servers, and maintained IT infrastructure.",
        ],
        area: "IT support",
        tags: ["Hardware", "Software"],
      },
      {
        company: "Rocketlaunch",
        role: "Co-Founder & CTO",
        date: "2022 — 2024",
        points: [
          "Developed client applications with Bubble.io and XANO and coordinated the technical team.",
          "Planned and delivered technical projects with budget and schedule responsibility, evaluated technologies and improved development processes.",
        ],
        area: "Product development",
        tags: ["Bubble.io", "XANO"],
      },
      {
        company: "Kork Tech AG",
        role: "Developer & Marketing",
        date: "2022 — 2023",
        points: [
          "Developed and launched a two-sided marketplace with Bubble.io and supported marketing activities.",
        ],
        area: "Application development",
        tags: ["Bubble.io"],
      },
    ],
    about: "About me",
    aboutTitle: "Education and background",
    aboutText:
      "I have studied Computer Science at ZHAW since 2024 and expect to graduate in 2028. Before that, I studied at ETH Zurich. Alongside my studies, I have worked in software development, product development and IT support.",
    skillsTitle: "Technical skills",
    skills: [
      {
        title: "PHP and databases",
        text: "PHP · SQL · LDAP",
        evidence:
          "Worked on an intranet service’s architecture, migration and PHP code, including SQL queries and directory integration.",
        id: "php",
        symbol: "</>",
        context: "University of Zurich",
      },
      {
        title: "Java",
        text: "Java · JavaFX · JUnit",
        evidence:
          "Used in ZHAW team projects, including SpinWheels. Worked on skins, statistics and interface fixes.",
        id: "java",
        symbol: "{ }",
        context: "ZHAW and personal projects",
      },
      {
        title: "Development tools",
        text: "Git · GitLab · CI/CD · GitHub · Gradle · Jira",
        evidence:
          "Integrated GitLab for version control, CI/CD and deployments at the University of Zurich. Used GitHub, Gradle and Jira in development projects.",
        id: "tools",
        symbol: "git",
        context: "Professional and team projects",
      },
      {
        title: "Application development",
        text: "Bubble.io · XANO",
        evidence:
          "Built client applications at Rocketlaunch and a two-sided marketplace at Kork Tech.",
        id: "products",
        symbol: "[ ]",
        context: "Rocketlaunch and Kork Tech",
      },
      {
        title: "Frontend — currently learning",
        text: "TypeScript · React · Next.js · Tailwind CSS",
        evidence: "Currently learning these tools by building this portfolio.",
        id: "frontend",
        symbol: "TS",
        context: "This portfolio",
      },
      {
        title: "Systems and support",
        text: "Linux · Windows Server · Active Directory · ITSM",
        evidence:
          "Designed and implemented a central ticketing system, wrote technical documentation, and worked on server maintenance and user permissions.",
        id: "systems",
        symbol: ">_",
        context: "IT roles",
      },
    ],
    languages:
      "German and Portuguese: native · English: professional proficiency · Italian: fluent · French: basic",
    lab: "Interactive lab",
    labTitle: "Binary search, step by step",
    labText:
      "Explore how binary search narrows a sorted list. Choose a number, then step through the algorithm.",
    target: "Number to find",
    step: "Next step",
    reset: "Reset",
    ready: "Choose a number from 1 to 16 and take the first step.",
    checking: "Checking",
    found: "Found",
    steps: "Steps",
    range: "Search interval",
    excluded: "excluded",
    candidate: "candidate",
    midpoint: "current midpoint",
    contactTitle: "Get in touch",
    contactText:
      "Interested in my work? Get in touch about junior software engineering, full-stack development or working-student opportunities.",
    cv: "CV available on request",
    cvNote: "English and German versions available.",
    footer: "Built with Next.js, React & TypeScript.",
    top: "Back to top",
  },
  de: {
    nav: ["Erfahrung", "Projekte", "Über mich", "Kontakt"],
    skip: "Zum Inhalt springen",
    role: "Softwareentwickler",
    student: "Informatikstudent an der ZHAW",
    location: "Zürich, Schweiz",
    description:
      "Ich entwickle Webanwendungen mit PHP und SQL. Dazu gehören ein Intranet an der Universität Zürich und Kundenanwendungen bei Rocketlaunch.",
    explore: "Projekte entdecken",
    contact: "Kontakt aufnehmen",
    emailLabel: "E-Mail",
    work: "Ausgewählte Projekte",
    workTitle: "Projekte",
    workIntro:
      "Zuerst berufliche Webanwendungen, danach Java-Teamprojekte und eigene Projekte.",
    details: "Projektdetails",
    contributionTitle: "Mein Beitrag",
    projects: [
      {
        title: "Weiterentwicklung eines PHP-Intranets",
        category: "Beruflich / PHP",
        text: "Architektur, Migration und Weiterentwicklung eines Intranet-Webservices an der Universität Zürich.",
        tags: ["PHP", "SQL", "GitLab CI/CD"],
        contributions: [
          "Intranet-Webservice migriert und weiterentwickelt",
          "PHP-Code und SQL-Datenbankabfragen überarbeitet",
          "GitLab für Versionsverwaltung, CI/CD und Deployments integriert",
        ],
        detail:
          "Am Institut für Medizinische Mikrobiologie der Universität Zürich arbeitete ich an Architektur, Migration und Weiterentwicklung eines PHP-Intranet-Webservices. Dazu gehörten SQL-Datenbankabfragen, LDAP-/Active-Directory-Anbindung sowie GitLab für Versionsverwaltung, CI/CD- und Deployment-Prozesse.",
        id: "php",
      },
      {
        title: "Anwendungen und ein Marktplatz",
        category: "Beruflich / Produktentwicklung",
        text: "Kundenanwendungen und technische Projektplanung bei Rocketlaunch; ein zweiseitiger Marktplatz bei Kork Tech.",
        tags: ["Bubble.io", "XANO", "Produktentwicklung"],
        contributions: [
          "Kundenanwendungen mit Bubble.io und XANO entwickelt",
          "Einen zweiseitigen Marktplatz entwickelt",
          "Technische Projekte geplant und Entwickler koordiniert",
        ],
        detail:
          "Als Mitgründer und CTO bei Rocketlaunch entwickelte ich Kundenanwendungen mit Bubble.io und XANO und koordinierte das technische Team. Ich plante und realisierte technische Projekte mit Budget- und Terminverantwortung, evaluierte neue Technologien und verbesserte Entwicklungsprozesse. Bei Kork Tech AG entwickelte und lancierte ich unabhängig davon einen zweiseitigen Marktplatz mit Bubble.io.",
        id: "products",
      },
      {
        id: "itsm",
        title: "Zentrales Ticketsystem",
        category: "Beruflich / ITSM",
        text: "Konzeption und Implementierung eines zentralen Ticketsystems an der Universität Zürich.",
        tags: ["ITSM", "Dokumentation"],
        contributions: [
          "Ticketsystem konzipiert und implementiert",
          "System kontinuierlich weiterentwickelt",
          "Technische Dokumentationen erstellt und gepflegt",
        ],
        detail:
          "Neben der Intranet-Entwicklung konzipierte und implementierte ich am Institut für Medizinische Mikrobiologie ein zentrales Ticketsystem und entwickelte es weiter. Ich pflegte technische Dokumentationen für Wissenstransfer und laufenden Betrieb.",
      },
    ],
    experience: "Erfahrung",
    experienceTitle: "Berufserfahrung",
    jobs: [
      {
        company: "Universität Zürich · Institut für Medizinische Mikrobiologie",
        role: "Studentische Hilfskraft",
        date: "15. Okt. 2025 — 14. Okt. 2026",
        points: [
          "Architektur, Migration und Weiterentwicklung eines Intranet-Webservices.",
          "Integration von GitLab für Versionsverwaltung, CI/CD und Deployments.",
          "Konzeption und Implementierung eines zentralen Ticketsystems sowie Pflege technischer Dokumentationen.",
        ],
        area: "Webentwicklung",
        tags: ["PHP", "SQL", "GitLab CI/CD"],
      },
      {
        company: "IKAMED Institute AG",
        role: "IT-Hard- und Software-Support",
        date: "Juli 2025 — März 2026",
        points: [
          "Behebung von Hard- und Softwareproblemen, Einrichtung von Computern und Servern sowie Wartung der IT-Infrastruktur.",
        ],
        area: "IT-Support",
        tags: ["Hardware", "Software"],
      },
      {
        company: "Rocketlaunch",
        role: "Co-Founder & CTO",
        date: "2022 — 2024",
        points: [
          "Entwicklung von Kundenanwendungen mit Bubble.io und XANO und Koordination des technischen Teams.",
          "Planung und Umsetzung technischer Projekte mit Budget- und Terminverantwortung, Evaluation neuer Technologien und Verbesserung der Entwicklungsprozesse.",
        ],
        area: "Produktentwicklung",
        tags: ["Bubble.io", "XANO"],
      },
      {
        company: "Kork Tech AG",
        role: "Entwickler & Marketing",
        date: "2022 — 2023",
        points: [
          "Entwicklung und Einführung eines zweiseitigen Marktplatzes mit Bubble.io sowie Unterstützung im Marketing.",
        ],
        area: "Anwendungsentwicklung",
        tags: ["Bubble.io"],
      },
    ],
    about: "Über mich",
    aboutTitle: "Studium und Hintergrund",
    aboutText:
      "Ich studiere seit 2024 Informatik an der ZHAW und schliesse voraussichtlich 2028 ab. Davor studierte ich an der ETH Zürich. Neben dem Studium habe ich in der Softwareentwicklung, Produktentwicklung und im IT-Support gearbeitet.",
    skillsTitle: "Technische Kenntnisse",
    skills: [
      {
        title: "PHP und Datenbanken",
        text: "PHP · SQL · LDAP",
        evidence:
          "Arbeit an Architektur, Migration und PHP-Code eines Intranet-Webservices, einschliesslich SQL-Abfragen und Verzeichnisanbindung.",
        id: "php",
        symbol: "</>",
        context: "Universität Zürich",
      },
      {
        title: "Java",
        text: "Java · JavaFX · JUnit",
        evidence:
          "In ZHAW-Teamprojekten eingesetzt, unter anderem in SpinWheels. Arbeit an Skins, Statistiken und Oberflächenkorrekturen.",
        id: "java",
        symbol: "{ }",
        context: "ZHAW und eigene Projekte",
      },
      {
        title: "Entwicklungswerkzeuge",
        text: "Git · GitLab · CI/CD · GitHub · Gradle · Jira",
        evidence:
          "GitLab für Versionsverwaltung, CI/CD und Deployments an der Universität Zürich integriert. GitHub, Gradle und Jira in Entwicklungsprojekten eingesetzt.",
        id: "tools",
        symbol: "git",
        context: "Berufliche Arbeit und Teamprojekte",
      },
      {
        title: "Anwendungsentwicklung",
        text: "Bubble.io · XANO",
        evidence:
          "Kundenanwendungen bei Rocketlaunch und einen zweiseitigen Marktplatz bei Kork Tech entwickelt.",
        id: "products",
        symbol: "[ ]",
        context: "Rocketlaunch und Kork Tech",
      },
      {
        title: "Frontend — lerne ich gerade",
        text: "TypeScript · React · Next.js · Tailwind CSS",
        evidence: "Diese Werkzeuge lerne ich beim Aufbau dieses Portfolios.",
        id: "frontend",
        symbol: "TS",
        context: "Dieses Portfolio",
      },
      {
        title: "Systeme und Support",
        text: "Linux · Windows Server · Active Directory · ITSM",
        evidence:
          "Zentrales Ticketsystem konzipiert und implementiert, technische Dokumentationen erstellt und an Serverwartung und Benutzerrechten gearbeitet.",
        id: "systems",
        symbol: ">_",
        context: "IT-Tätigkeiten",
      },
    ],
    languages:
      "Deutsch und Portugiesisch: Muttersprache · Englisch: verhandlungssicher · Italienisch: fliessend · Französisch: Grundkenntnisse",
    lab: "Interaktives Labor",
    labTitle: "Binäre Suche, Schritt für Schritt",
    labText:
      "Entdecke, wie die binäre Suche eine sortierte Liste eingrenzt. Wähle eine Zahl und gehe den Algorithmus schrittweise durch.",
    target: "Gesuchte Zahl",
    step: "Nächster Schritt",
    reset: "Zurücksetzen",
    ready: "Wähle eine Zahl von 1 bis 16 und starte den ersten Schritt.",
    checking: "Prüfung",
    found: "Gefunden",
    steps: "Schritte",
    range: "Suchbereich",
    excluded: "ausgeschlossen",
    candidate: "Kandidat",
    midpoint: "aktueller Mittelpunkt",
    contactTitle: "Kontakt aufnehmen",
    contactText:
      "Interesse an meiner Arbeit? Ich freue mich über Kontakt zu Junior-Stellen in der Software- und Full-Stack-Entwicklung sowie Werkstudentenstellen.",
    cv: "Lebenslauf auf Anfrage",
    cvNote: "Auf Deutsch und Englisch verfügbar.",
    footer: "Entwickelt mit Next.js, React & TypeScript.",
    top: "Nach oben",
  },
};
export type PortfolioContent = typeof content.en;
