export type Locale = "en" | "de";
export const content = {
  en: {
    nav: ["Experience", "Projects", "About", "Contact"],
    skip: "Skip to content",
    role: "Software Developer",
    student: "Computer Science student at ZHAW",
    location: "Zurich, Switzerland",
    description:
      "I’ve worked on a PHP/SQL intranet service at the University of Zurich, built Java applications, and developed client applications at Rocketlaunch.",
    explore: "Explore my work",
    contact: "Get in touch",
    emailLabel: "Email",
    work: "Selected work",
    workTitle: "Projects",
    workIntro: "Selected professional, university and personal projects.",
    details: "Project details",
    contributionTitle: "My contribution",
    projects: [
      {
        title: "PHP intranet migration",
        category: "Professional / PHP",
        text: "Reorganized and migrated a PHP intranet service at the University of Zurich.",
        tags: ["PHP 7 → 8", "SQL", "GitLab CI/CD"],
        contributions: [
          "Unified scattered folders and files into one project",
          "Migrated PHP 7 to PHP 8",
          "Centralized database access and integrated GitLab CI/CD",
        ],
        detail:
          "The intranet work also included SQL database queries and LDAP / Active Directory integration. This professional project’s source code and internal screens are not published here.",
        id: "php",
      },
      {
        title: "Client apps and marketplace",
        category: "Professional / Product development",
        text: "Client applications at Rocketlaunch and a two-sided marketplace at Kork Tech.",
        tags: ["Bubble.io", "XANO", "Product development"],
        contributions: [
          "Built client applications with Bubble.io and XANO",
          "Developed a two-sided marketplace",
          "Planned technical projects and coordinated developers",
        ],
        detail:
          "At Rocketlaunch, I used Bubble.io and XANO and coordinated the technical team. At Kork Tech, I developed and launched a two-sided marketplace with Bubble.io.",
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
          "The work included ongoing development and technical documentation for knowledge transfer and operation.",
      },
    ],
    experience: "Experience",
    experienceTitle: "Work experience",
    jobs: [
      {
        company: "University of Zurich · Institute of Medical Microbiology",
        role: "Student Assistant",
        date: "Oct 2025 — Oct 2026",
        points: [
          "Reorganized a scattered PHP intranet into a unified project, migrated PHP 7 to 8 and centralized database access.",
          "Integrated GitLab for version control, CI/CD and deployments.",
          "Designed and implemented a central ticketing system and maintained technical documentation.",
        ],
        area: "Web development",
        tags: ["PHP", "SQL", "GitLab CI/CD"],
        projectIds: ["php", "itsm"],
        logo: {
          src: "/images/employers/uzh.svg",
          width: 121,
          height: 41,
        },
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
        projectIds: [],
        logo: {
          src: "/images/employers/ikamed.jpg",
          width: 64,
          height: 64,
        },
      },
      {
        company: "Rocketlaunch",
        role: "Co-Founder & CTO",
        date: "2022 — 2024",
        points: [
          "Developed client applications with Bubble.io and XANO and coordinated the technical team.",
          "Planned technical projects and managed budgets and schedules.",
        ],
        area: "Product development",
        tags: ["Bubble.io", "XANO"],
        projectIds: ["products"],
        logo: {
          src: "/images/employers/rocket.jpg",
          width: 64,
          height: 64,
        },
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
        projectIds: ["products"],
        logo: {
          src: "/images/employers/kork.jpg",
          width: 64,
          height: 64,
        },
      },
    ],
    about: "About me",
    aboutTitle: "Education and background",
    aboutText:
      "Previously studied at ETH Zurich. Alongside my studies, I have worked in software development, product development and IT support.",
    skillsTitle: "Technical skills",
    skills: [
      {
        title: "PHP and databases",
        text: "PHP · SQL · LDAP",
        evidence:
          "PHP 7-to-8 migration, shared database access and directory integration in a professional intranet project.",
        id: "php",
        symbol: "</>",
        context: "University of Zurich",
      },
      {
        title: "Java",
        text: "Java · JavaFX · JUnit",
        evidence:
          "JavaFX applications, object-oriented modelling and JUnit tests in university and personal projects.",
        id: "java",
        symbol: "{ }",
        context: "ZHAW and personal projects",
      },
      {
        title: "Development tools",
        text: "Git · GitLab · CI/CD · GitHub · Gradle · Jira",
        evidence:
          "GitLab CI/CD in professional work; GitHub and Gradle in team and personal projects.",
        id: "tools",
        symbol: "git",
        context: "Professional and team projects",
      },
      {
        title: "Bubble.io and XANO",
        text: "Bubble.io · XANO",
        evidence:
          "Built client applications at Rocketlaunch and a two-sided marketplace at Kork Tech.",
        id: "products",
        symbol: "[ ]",
        context: "Rocketlaunch and Kork Tech",
      },
      {
        title: "Web frontend",
        text: "TypeScript · React · Next.js · Tailwind CSS",
        evidence:
          "Building localized components, accessible interactions and responsive layouts.",
        id: "frontend",
        symbol: "TS",
        context: "Currently learning · This portfolio",
      },
      {
        title: "Systems and support",
        text: "Linux · Windows Server · Active Directory · ITSM",
        evidence:
          "Server maintenance, user permissions and technical documentation in IT roles.",
        id: "systems",
        symbol: ">_",
        context: "IT roles",
      },
    ],
    languages:
      "German and Portuguese: native · English: professional proficiency · Italian: fluent · French: basic",
    contactTitle: "Get in touch",
    contactText:
      "Interested in my work? Get in touch about junior software engineering, full-stack development or working-student opportunities.",
    cv: "Download CV (EN)",
    cvNote: "PDF · English and German",
    footer: "Built with Next.js, React & TypeScript.",
    top: "Back to top",
    cvHref: "/cv/bruno-pinto-cv-en.pdf",
    cvEnglish: "English CV (PDF)",
    cvGerman: "German CV (PDF)",
    relatedProjects: "Related projects",
    opportunity:
      "Seeking junior software development or working-student opportunities.",
    education: "ZHAW · Computer Science · 2024–2028 (expected)",
  },
  de: {
    nav: ["Erfahrung", "Projekte", "Über mich", "Kontakt"],
    skip: "Zum Inhalt springen",
    role: "Softwareentwickler",
    student: "Informatikstudent an der ZHAW",
    location: "Zürich, Schweiz",
    description:
      "Ich habe an einem PHP-/SQL-Intranet der Universität Zürich gearbeitet, Java-Anwendungen entwickelt und Kundenanwendungen bei Rocketlaunch umgesetzt.",
    explore: "Projekte entdecken",
    contact: "Kontakt aufnehmen",
    emailLabel: "E-Mail",
    work: "Ausgewählte Projekte",
    workTitle: "Projekte",
    workIntro:
      "Ausgewählte berufliche Projekte, Hochschulprojekte und eigene Anwendungen.",
    details: "Projektdetails",
    contributionTitle: "Mein Beitrag",
    projects: [
      {
        title: "Migration eines PHP-Intranets",
        category: "Beruflich / PHP",
        text: "Neuorganisation und Migration eines PHP-Intranets an der Universität Zürich.",
        tags: ["PHP 7 → 8", "SQL", "GitLab CI/CD"],
        contributions: [
          "Verstreute Ordner und Dateien in einem einheitlichen Projekt zusammengeführt",
          "PHP 7 auf PHP 8 migriert",
          "Datenbankzugriffe zentralisiert und GitLab CI/CD integriert",
        ],
        detail:
          "Zur Intranet-Arbeit gehörten auch SQL-Datenbankabfragen sowie die Anbindung an LDAP / Active Directory. Quellcode und interne Ansichten dieses beruflichen Projekts werden hier nicht veröffentlicht.",
        id: "php",
      },
      {
        title: "Kundenapps und Marktplatz",
        category: "Beruflich / Produktentwicklung",
        text: "Kundenanwendungen bei Rocketlaunch und ein zweiseitiger Marktplatz bei Kork Tech.",
        tags: ["Bubble.io", "XANO", "Produktentwicklung"],
        contributions: [
          "Kundenanwendungen mit Bubble.io und XANO entwickelt",
          "Einen zweiseitigen Marktplatz entwickelt",
          "Technische Projekte geplant und Entwickler koordiniert",
        ],
        detail:
          "Bei Rocketlaunch setzte ich Bubble.io und XANO ein und koordinierte das technische Team. Bei Kork Tech entwickelte und lancierte ich einen zweiseitigen Marktplatz mit Bubble.io.",
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
          "Zur Arbeit gehörten die Weiterentwicklung sowie technische Dokumentationen für Wissenstransfer und Betrieb.",
      },
    ],
    experience: "Erfahrung",
    experienceTitle: "Berufserfahrung",
    jobs: [
      {
        company: "Universität Zürich · Institut für Medizinische Mikrobiologie",
        role: "Studentische Hilfskraft",
        date: "Okt. 2025 — Okt. 2026",
        points: [
          "Verstreutes PHP-Intranet in einem einheitlichen Projekt zusammengeführt, PHP 7 auf 8 migriert und Datenbankzugriffe zentralisiert.",
          "GitLab für Versionsverwaltung, CI/CD und Deployments integriert.",
          "Zentrales Ticketsystem konzipiert und implementiert sowie technische Dokumentationen gepflegt.",
        ],
        area: "Webentwicklung",
        tags: ["PHP", "SQL", "GitLab CI/CD"],
        projectIds: ["php", "itsm"],
        logo: {
          src: "/images/employers/uzh.svg",
          width: 121,
          height: 41,
        },
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
        projectIds: [],
        logo: {
          src: "/images/employers/ikamed.jpg",
          width: 64,
          height: 64,
        },
      },
      {
        company: "Rocketlaunch",
        role: "Co-Founder & CTO",
        date: "2022 — 2024",
        points: [
          "Entwicklung von Kundenanwendungen mit Bubble.io und XANO und Koordination des technischen Teams.",
          "Technische Projekte geplant sowie Budget- und Terminverantwortung übernommen.",
        ],
        area: "Produktentwicklung",
        tags: ["Bubble.io", "XANO"],
        projectIds: ["products"],
        logo: {
          src: "/images/employers/rocket.jpg",
          width: 64,
          height: 64,
        },
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
        projectIds: ["products"],
        logo: {
          src: "/images/employers/kork.jpg",
          width: 64,
          height: 64,
        },
      },
    ],
    about: "Über mich",
    aboutTitle: "Studium und Hintergrund",
    aboutText:
      "Zuvor habe ich an der ETH Zürich studiert. Neben dem Studium habe ich in der Softwareentwicklung, Produktentwicklung und im IT-Support gearbeitet.",
    skillsTitle: "Technische Kenntnisse",
    skills: [
      {
        title: "PHP und Datenbanken",
        text: "PHP · SQL · LDAP",
        evidence:
          "PHP-7-auf-8-Migration, zentrale Datenbankzugriffe und Verzeichnisanbindung in einem beruflichen Intranet-Projekt.",
        id: "php",
        symbol: "</>",
        context: "Universität Zürich",
      },
      {
        title: "Java",
        text: "Java · JavaFX · JUnit",
        evidence:
          "JavaFX-Anwendungen, objektorientierte Modellierung und JUnit-Tests in Hochschulprojekten und eigenen Anwendungen.",
        id: "java",
        symbol: "{ }",
        context: "ZHAW und eigene Projekte",
      },
      {
        title: "Entwicklungswerkzeuge",
        text: "Git · GitLab · CI/CD · GitHub · Gradle · Jira",
        evidence:
          "GitLab CI/CD im Beruf; GitHub und Gradle in Teamprojekten und eigenen Anwendungen.",
        id: "tools",
        symbol: "git",
        context: "Berufliche Arbeit und Teamprojekte",
      },
      {
        title: "Bubble.io und XANO",
        text: "Bubble.io · XANO",
        evidence:
          "Kundenanwendungen bei Rocketlaunch und einen zweiseitigen Marktplatz bei Kork Tech entwickelt.",
        id: "products",
        symbol: "[ ]",
        context: "Rocketlaunch und Kork Tech",
      },
      {
        title: "Web-Frontend",
        text: "TypeScript · React · Next.js · Tailwind CSS",
        evidence:
          "Aufbau lokalisierter Komponenten, zugänglicher Interaktionen und responsiver Layouts.",
        id: "frontend",
        symbol: "TS",
        context: "Diese Werkzeuge lerne ich gerade · Dieses Portfolio",
      },
      {
        title: "Systeme und Support",
        text: "Linux · Windows Server · Active Directory · ITSM",
        evidence:
          "Serverwartung, Benutzerrechte und technische Dokumentation in IT-Tätigkeiten.",
        id: "systems",
        symbol: ">_",
        context: "IT-Tätigkeiten",
      },
    ],
    languages:
      "Deutsch und Portugiesisch: Muttersprache · Englisch: verhandlungssicher · Italienisch: fliessend · Französisch: Grundkenntnisse",
    contactTitle: "Kontakt aufnehmen",
    contactText:
      "Interesse an meiner Arbeit? Ich freue mich über Kontakt zu Junior-Stellen in der Software- und Full-Stack-Entwicklung sowie Werkstudentenstellen.",
    cv: "Lebenslauf herunterladen (DE)",
    cvNote: "PDF · Deutsch und Englisch",
    footer: "Entwickelt mit Next.js, React & TypeScript.",
    top: "Nach oben",
    cvHref: "/cv/bruno-pinto-cv-de.pdf",
    cvEnglish: "Lebenslauf Englisch (PDF)",
    cvGerman: "Lebenslauf Deutsch (PDF)",
    relatedProjects: "Zugehörige Projekte",
    opportunity:
      "Ich suche eine Junior- oder Werkstudentenstelle in der Softwareentwicklung.",
    education: "ZHAW · Informatik · 2024–2028 (voraussichtlich)",
  },
};
export type PortfolioContent = typeof content.en;
