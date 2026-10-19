export type Locale = "en" | "de";
export const content = {
  en: {
    nav: ["Work", "Experience", "About", "Contact"],
    skip: "Skip to content",
    role: "Software Developer",
    student: "Computer Science student at ZHAW",
    location: "Zurich, Switzerland",
    description:
      "I study Computer Science at ZHAW and have worked on PHP applications, client projects and a Java racing game.",
    explore: "Explore my work",
    contact: "Get in touch",
    work: "Selected work",
    workTitle: "Projects",
    workIntro:
      "A Java racing game, PHP development and applications built for clients.",
    details: "Project details",
    contributionTitle: "My work",
    projects: [
      {
        title: "Modernizing a PHP portal",
        category: "Professional / PHP",
        text: "PHP maintenance and refactoring at the Institute of Medical Microbiology.",
        tags: ["PHP", "SQL", "LDAP / Active Directory"],
        contributions: [
          "Restructured existing PHP code",
          "Worked on SQL database queries",
          "Maintained a portal with LDAP integration",
        ],
        detail:
          "As a working student, I worked on modernization and structural refactoring of an existing PHP portal, including restructuring its codebase, SQL database queries and ongoing maintenance. The portal includes LDAP / Active Directory integration. Internal implementation details remain private.",
      },
      {
        title: "Applications and a marketplace",
        category: "Professional / Product development",
        text: "Client products at Rocketlaunch and a two-sided marketplace at Kork Tech.",
        tags: ["Bubble.io", "XANO", "Product development"],
        contributions: [
          "Built client applications with Bubble.io and XANO",
          "Developed a two-sided marketplace",
          "Supervised development teams",
        ],
        detail:
          "At Rocketlaunch, I co-founded the company and led development of digital products for international clients using Bubble.io and XANO. I managed teams and established development processes. At Kork Tech AG, I developed and launched a two-sided marketplace using Bubble.io.",
      },
    ],
    experience: "Experience",
    experienceTitle: "Work experience",
    jobs: [
      {
        company: "Institute of Medical Microbiology",
        role: "IT Generalist · Working Student",
        date: "Oct 2025 — Oct 2026",
        text: "Modernized and refactored a PHP portal. Worked with SQL, Windows and Linux servers, permissions, ITSM and technical documentation.",
      },
      {
        company: "IKAMED Institute AG",
        role: "IT Hardware & Software Support",
        date: "Jul 2025 — Mar 2026",
        text: "Resolved hardware and software issues, configured computers and servers, and maintained IT infrastructure.",
      },
      {
        company: "Rocketlaunch",
        role: "Co-Founder & CTO",
        date: "2022 — 2024",
        text: "Led development of digital products with Bubble.io and XANO, supervised teams and established development processes.",
      },
      {
        company: "Kork Tech AG",
        role: "Developer & Marketing",
        date: "2022 — 2023",
        text: "Developed and launched a two-sided marketplace with Bubble.io and supported marketing activities.",
      },
    ],
    about: "About me",
    aboutTitle: "Education and background",
    aboutText:
      "I have studied Computer Science at ZHAW since 2024 and expect to graduate in 2028. Before that, I studied at ETH Zurich. Alongside my studies, I have worked in software development, product development and IT support.",
    skillsTitle: "Technical skills",
    skills: [
      {
        title: "Java",
        text: "Java · JavaFX · JUnit",
        evidence:
          "Used in ZHAW team projects, including SpinWheels. Worked on skins, statistics and interface fixes.",
      },
      {
        title: "PHP and databases",
        text: "PHP · SQL · LDAP",
        evidence:
          "Maintained and refactored an existing PHP portal, including database queries and directory integration.",
      },
      {
        title: "Frontend — currently learning",
        text: "TypeScript · React · Next.js · Tailwind CSS",
        evidence: "Currently learning these tools by building this portfolio.",
      },
      {
        title: "Application development",
        text: "Bubble.io · XANO",
        evidence:
          "Built client applications at Rocketlaunch and a two-sided marketplace at Kork Tech.",
      },
      {
        title: "Development tools",
        text: "Git · GitHub · Gradle · Jira",
        evidence:
          "Used for source control, team development, Java builds and task tracking.",
      },
      {
        title: "Systems and support",
        text: "Linux · Windows Server · Active Directory · ITSM",
        evidence:
          "Experience with server maintenance, user permissions and troubleshooting in IT roles.",
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
    nav: ["Projekte", "Erfahrung", "Über mich", "Kontakt"],
    skip: "Zum Inhalt springen",
    role: "Softwareentwickler",
    student: "Informatikstudent an der ZHAW",
    location: "Zürich, Schweiz",
    description:
      "Ich studiere Informatik an der ZHAW und habe an PHP-Anwendungen, Kundenprojekten und einem Java-Rennspiel gearbeitet.",
    explore: "Projekte entdecken",
    contact: "Kontakt aufnehmen",
    work: "Ausgewählte Projekte",
    workTitle: "Projekte",
    workIntro:
      "Ein Java-Rennspiel, PHP-Entwicklung und Anwendungen für Kunden.",
    details: "Projektdetails",
    contributionTitle: "Meine Arbeit",
    projects: [
      {
        title: "Modernisierung eines PHP-Portals",
        category: "Beruflich / PHP",
        text: "PHP-Wartung und Refactoring am Institut für Medizinische Mikrobiologie.",
        tags: ["PHP", "SQL", "LDAP / Active Directory"],
        contributions: [
          "Bestehenden PHP-Code umstrukturiert",
          "An SQL-Datenbankabfragen gearbeitet",
          "Ein Portal mit LDAP-Anbindung gewartet",
        ],
        detail:
          "Als Werkstudent arbeitete ich an der Modernisierung und dem strukturellen Refactoring eines bestehenden PHP-Portals, einschliesslich der Codebasis, SQL-Datenbankabfragen und laufenden Wartung. Das Portal hat eine LDAP-/Active-Directory-Anbindung. Interne Implementierungsdetails bleiben vertraulich.",
      },
      {
        title: "Anwendungen und ein Marktplatz",
        category: "Beruflich / Produktentwicklung",
        text: "Kundenprodukte bei Rocketlaunch und ein zweiseitiger Marktplatz bei Kork Tech.",
        tags: ["Bubble.io", "XANO", "Produktentwicklung"],
        contributions: [
          "Kundenanwendungen mit Bubble.io und XANO entwickelt",
          "Einen zweiseitigen Marktplatz entwickelt",
          "Entwicklungsteams betreut",
        ],
        detail:
          "Bei Rocketlaunch war ich Mitgründer und leitete die Entwicklung digitaler Produkte für internationale Kunden mit Bubble.io und XANO. Ich betreute Teams und etablierte Entwicklungsprozesse. Bei Kork Tech AG entwickelte und lancierte ich einen zweiseitigen Marktplatz mit Bubble.io.",
      },
    ],
    experience: "Erfahrung",
    experienceTitle: "Berufserfahrung",
    jobs: [
      {
        company: "Institut für Medizinische Mikrobiologie",
        role: "IT-Allrounder · Werkstudent",
        date: "Okt. 2025 — Okt. 2026",
        text: "Modernisierung und Refactoring eines PHP-Portals. Arbeit mit SQL, Windows- und Linux-Servern, Berechtigungen, ITSM und technischer Dokumentation.",
      },
      {
        company: "IKAMED Institute AG",
        role: "IT-Hard- und Software-Support",
        date: "Juli 2025 — März 2026",
        text: "Behebung von Hard- und Softwareproblemen, Einrichtung von Computern und Servern sowie Wartung der IT-Infrastruktur.",
      },
      {
        company: "Rocketlaunch",
        role: "Co-Founder & CTO",
        date: "2022 — 2024",
        text: "Leitung der Entwicklung digitaler Produkte mit Bubble.io und XANO, Betreuung von Teams und Etablierung von Entwicklungsprozessen.",
      },
      {
        company: "Kork Tech AG",
        role: "Entwickler & Marketing",
        date: "2022 — 2023",
        text: "Entwicklung und Einführung eines zweiseitigen Marktplatzes mit Bubble.io sowie Unterstützung im Marketing.",
      },
    ],
    about: "Über mich",
    aboutTitle: "Studium und Hintergrund",
    aboutText:
      "Ich studiere seit 2024 Informatik an der ZHAW und schliesse voraussichtlich 2028 ab. Davor studierte ich an der ETH Zürich. Neben dem Studium habe ich in der Softwareentwicklung, Produktentwicklung und im IT-Support gearbeitet.",
    skillsTitle: "Technische Kenntnisse",
    skills: [
      {
        title: "Java",
        text: "Java · JavaFX · JUnit",
        evidence:
          "In ZHAW-Teamprojekten eingesetzt, unter anderem in SpinWheels. Arbeit an Skins, Statistiken und Oberflächenkorrekturen.",
      },
      {
        title: "PHP und Datenbanken",
        text: "PHP · SQL · LDAP",
        evidence:
          "Wartung und Refactoring eines bestehenden PHP-Portals, einschliesslich Datenbankabfragen und Verzeichnisanbindung.",
      },
      {
        title: "Frontend — lerne ich gerade",
        text: "TypeScript · React · Next.js · Tailwind CSS",
        evidence: "Diese Werkzeuge lerne ich beim Aufbau dieses Portfolios.",
      },
      {
        title: "Anwendungsentwicklung",
        text: "Bubble.io · XANO",
        evidence:
          "Kundenanwendungen bei Rocketlaunch und einen zweiseitigen Marktplatz bei Kork Tech entwickelt.",
      },
      {
        title: "Entwicklungswerkzeuge",
        text: "Git · GitHub · Gradle · Jira",
        evidence:
          "Für Versionsverwaltung, Teamarbeit, Java-Builds und Aufgabenplanung eingesetzt.",
      },
      {
        title: "Systeme und Support",
        text: "Linux · Windows Server · Active Directory · ITSM",
        evidence:
          "Erfahrung mit Serverwartung, Benutzerrechten und Fehlersuche in IT-Tätigkeiten.",
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
