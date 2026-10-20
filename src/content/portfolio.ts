export type Locale = "en" | "de";
export const content = {
  en: {
    nav: ["Experience", "Projects", "Skills", "About", "Contact"],
    skip: "Skip to content",
    role: "Software Developer",
    student: "Computer Science student at ZHAW",
    location: "Zurich, Switzerland",
    description:
      "I’ve developed web applications, restructured existing software and built applications for clients. Alongside my studies, I explore new ideas through university and personal projects.",
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
        id: "backend",
        title: "Backend",
        context: "Professional intranet development",
        tools: ["PHP", "SQL"],
        evidence: [
          {
            text: "Migrated a PHP intranet from version 7 to 8, unified its project structure and centralized database access.",
            projectId: "php",
          },
        ],
      },
      {
        id: "frontend",
        title: "Web frontend",
        context: "Currently learning · This portfolio",
        tools: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
        evidence: [
          {
            text: "Building localized components, responsive layouts and keyboard-accessible interactions in this portfolio.",
            projectId: "portfolio",
          },
        ],
      },
      {
        id: "desktop",
        title: "Desktop & testing",
        context: "University and personal projects",
        tools: ["Java", "JavaFX", "Swing", "JUnit"],
        evidence: [
          {
            text: "Java applications with object-oriented models, desktop interfaces and JUnit tests in team and personal projects.",
            projectId: "spinwheels",
          },
        ],
      },
      {
        id: "workflow",
        title: "Tooling & deployment",
        context: "Professional workflows and this portfolio",
        tools: ["Git", "GitLab CI/CD", "GitHub", "Gradle", "Docker", "Nginx"],
        evidence: [
          {
            text: "Integrated GitLab CI/CD in professional work; this portfolio uses a static export packaged with Docker and served by Nginx.",
            projectId: "portfolio",
          },
        ],
      },
      {
        id: "additional",
        title: "Additional experience",
        context: "Product development and IT roles",
        tools: [
          "Bubble.io",
          "XANO",
          "Linux",
          "Windows Server",
          "Active Directory",
          "ITSM",
        ],
        evidence: [
          {
            text: "Built client applications with Bubble.io and XANO at Rocketlaunch, and a Bubble.io marketplace at Kork Tech.",
            projectId: "products",
          },
          {
            text: "Worked on server maintenance, user permissions, technical documentation and a central ticketing system.",
            projectId: "itsm",
          },
        ],
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
    skillsIntro:
      "Tools I’ve used in professional work, university projects and this portfolio. Frontend is an area I’m currently learning.",
  },
  de: {
    nav: ["Erfahrung", "Projekte", "Kenntnisse", "Über mich", "Kontakt"],
    skip: "Zum Inhalt springen",
    role: "Softwareentwickler",
    student: "Informatikstudent an der ZHAW",
    location: "Zürich, Schweiz",
    description:
      "Ich habe Webanwendungen entwickelt, bestehende Software neu strukturiert und Anwendungen für Kunden umgesetzt. Neben meinem Studium verfolge ich eigene Ideen in Hochschul- und persönlichen Projekten.",
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
        id: "backend",
        title: "Backend",
        context: "Berufliche Intranet-Entwicklung",
        tools: ["PHP", "SQL"],
        evidence: [
          {
            text: "Ein PHP-Intranet von Version 7 auf 8 migriert, die Projektstruktur vereinheitlicht und Datenbankzugriffe zentralisiert.",
            projectId: "php",
          },
        ],
      },
      {
        id: "frontend",
        title: "Web-Frontend",
        context: "Diese Werkzeuge lerne ich gerade · Dieses Portfolio",
        tools: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
        evidence: [
          {
            text: "Aufbau lokalisierter Komponenten, responsiver Layouts und tastaturbedienbarer Interaktionen in diesem Portfolio.",
            projectId: "portfolio",
          },
        ],
      },
      {
        id: "desktop",
        title: "Desktop & Tests",
        context: "Hochschulprojekte und eigene Anwendungen",
        tools: ["Java", "JavaFX", "Swing", "JUnit"],
        evidence: [
          {
            text: "Java-Anwendungen mit objektorientierten Modellen, Desktop-Oberflächen und JUnit-Tests in Teamprojekten und eigenen Projekten.",
            projectId: "spinwheels",
          },
        ],
      },
      {
        id: "workflow",
        title: "Werkzeuge & Deployment",
        context: "Berufliche Abläufe und dieses Portfolio",
        tools: ["Git", "GitLab CI/CD", "GitHub", "Gradle", "Docker", "Nginx"],
        evidence: [
          {
            text: "GitLab CI/CD im Beruf integriert; dieses Portfolio nutzt einen statischen Export, der mit Docker verpackt und von Nginx ausgeliefert wird.",
            projectId: "portfolio",
          },
        ],
      },
      {
        id: "additional",
        title: "Weitere Erfahrung",
        context: "Produktentwicklung und IT-Tätigkeiten",
        tools: [
          "Bubble.io",
          "XANO",
          "Linux",
          "Windows Server",
          "Active Directory",
          "ITSM",
        ],
        evidence: [
          {
            text: "Kundenanwendungen mit Bubble.io und XANO bei Rocketlaunch und einen Bubble.io-Marktplatz bei Kork Tech entwickelt.",
            projectId: "products",
          },
          {
            text: "An Serverwartung, Benutzerrechten, technischer Dokumentation und einem zentralen Ticketsystem gearbeitet.",
            projectId: "itsm",
          },
        ],
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
    skillsIntro:
      "Werkzeuge aus meiner beruflichen Arbeit, Hochschulprojekten und diesem Portfolio. Im Web-Frontend lerne ich gerade dazu.",
  },
};
export type PortfolioContent = typeof content.en;
