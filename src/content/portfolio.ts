export type Locale = "en" | "de";
export const content = {
  en: {
    nav: ["Work", "Experience", "About", "Contact"],
    skip: "Skip to content",
    role: "Software Developer",
    student: "Computer Science student at ZHAW",
    location: "Zurich, Switzerland",
    intro: "From product ideas to existing codebases.",
    description:
      "I develop digital products, work on PHP applications and study Computer Science at ZHAW. My experience connects product development with an understanding of the systems software runs on.",
    explore: "Explore my work",
    contact: "Get in touch",
    portrait: "Portrait coming soon",
    work: "Selected work",
    workTitle: "Code with context.",
    workIntro:
      "Product development, application modernization and projects from my studies.",
    details: "Explore the project",
    projects: [
      {
        title: "Modernizing a PHP portal",
        category: "Professional / PHP",
        text: "Refactoring a business-critical application at the Institute of Medical Microbiology.",
        tags: ["PHP", "SQL", "LDAP / Active Directory"],
        detail:
          "As a working student, I worked on modernization and structural refactoring of an existing PHP portal, including restructuring its codebase, SQL database queries and ongoing maintenance. The portal includes LDAP / Active Directory integration. Internal implementation details remain private.",
      },
      {
        title: "From idea to digital product",
        category: "Professional / Product development",
        text: "Client products at Rocketlaunch and a two-sided marketplace at Kork Tech.",
        tags: ["Bubble.io", "XANO", "Product development"],
        detail:
          "At Rocketlaunch, I co-founded the company and led development of digital products for international clients using Bubble.io and XANO. I managed teams and established development processes. At Kork Tech AG, I developed and launched a two-sided marketplace using Bubble.io.",
      },
      {
        title: "Learning through building",
        category: "Academic / Java",
        text: "Team projects at ZHAW: a racing game, a console text editor and Tic-Tac-Toe.",
        tags: ["Java", "JavaFX", "Team projects"],
        detail:
          "During my Computer Science studies at ZHAW, I worked in teams of four on Java projects: Tic-Tac-Toe, a console-based text editor and a racing game with a JavaFX graphical interface.",
      },
    ],
    spin: "Also in my project collection: SpinWheels. A detailed case study will follow once its scope, my contribution and technical details are documented.",
    experience: "Experience",
    experienceTitle: "Products, people & systems.",
    jobs: [
      {
        company: "Institute of Medical Microbiology",
        role: "IT Generalist · Working Student",
        date: "Oct 2025 — Oct 2026",
        text: "Modernized and refactored a PHP portal. Worked with SQL, Windows and Linux servers, permissions, ITSM and technical documentation.",
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
      {
        company: "IKAMED Institute AG",
        role: "IT Hardware & Software Support",
        date: "Jul 2025 — Mar 2026",
        text: "Resolved hardware and software issues, configured computers and servers, and maintained IT infrastructure.",
      },
    ],
    about: "About & skills",
    aboutTitle: "A developer with a wider view.",
    aboutText:
      "I study Computer Science at ZHAW, with an expected graduation in 2028. Before transferring to ZHAW in 2024, I studied Computer Science at ETH Zurich. Product development taught me to connect technical decisions with practical needs; support and administration gave me experience troubleshooting the systems behind applications.",
    skills: [
      {
        title: "Software development",
        text: "Java · PHP · SQL · CSS · C (basic knowledge)",
      },
      {
        title: "Product & collaboration",
        text: "Bubble.io · XANO · Git · GitHub · Gradle · Jira",
      },
      {
        title: "Selected systems experience",
        text: "Linux · Windows Server · Active Directory · LDAP · ITSM",
      },
    ],
    languages:
      "German and Portuguese: native · English: professional proficiency · Italian: fluent · French: basic",
    lab: "Interactive lab",
    labTitle: "A small search. A visible process.",
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
    contactTitle: "Let’s build something useful.",
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
    intro: "Von Produktideen zu bestehenden Codebasen.",
    description:
      "Ich entwickle digitale Produkte, arbeite an PHP-Anwendungen und studiere Informatik an der ZHAW. Meine Erfahrung verbindet Produktentwicklung mit einem Verständnis für die Systeme, auf denen Software läuft.",
    explore: "Projekte entdecken",
    contact: "Kontakt aufnehmen",
    portrait: "Porträt folgt",
    work: "Ausgewählte Projekte",
    workTitle: "Code mit Kontext.",
    workIntro:
      "Produktentwicklung, Anwendungsmodernisierung und Projekte aus meinem Studium.",
    details: "Projekt entdecken",
    projects: [
      {
        title: "Modernisierung eines PHP-Portals",
        category: "Beruflich / PHP",
        text: "Refactoring einer geschäftskritischen Anwendung am Institut für Medizinische Mikrobiologie.",
        tags: ["PHP", "SQL", "LDAP / Active Directory"],
        detail:
          "Als Werkstudent arbeitete ich an der Modernisierung und dem strukturellen Refactoring eines bestehenden PHP-Portals, einschliesslich der Codebasis, SQL-Datenbankabfragen und laufenden Wartung. Das Portal hat eine LDAP-/Active-Directory-Anbindung. Interne Implementierungsdetails bleiben vertraulich.",
      },
      {
        title: "Von der Idee zum digitalen Produkt",
        category: "Beruflich / Produktentwicklung",
        text: "Kundenprodukte bei Rocketlaunch und ein zweiseitiger Marktplatz bei Kork Tech.",
        tags: ["Bubble.io", "XANO", "Produktentwicklung"],
        detail:
          "Bei Rocketlaunch war ich Mitgründer und leitete die Entwicklung digitaler Produkte für internationale Kunden mit Bubble.io und XANO. Ich betreute Teams und etablierte Entwicklungsprozesse. Bei Kork Tech AG entwickelte und lancierte ich einen zweiseitigen Marktplatz mit Bubble.io.",
      },
      {
        title: "Lernen durch Entwickeln",
        category: "Studium / Java",
        text: "Teamprojekte an der ZHAW: ein Rennspiel, ein Konsolen-Texteditor und Tic-Tac-Toe.",
        tags: ["Java", "JavaFX", "Teamprojekte"],
        detail:
          "Im Informatikstudium an der ZHAW arbeitete ich in Viererteams an Java-Projekten: Tic-Tac-Toe, einem konsolenbasierten Texteditor und einem Rennspiel mit grafischer JavaFX-Oberfläche.",
      },
    ],
    spin: "Ebenfalls in meiner Projektsammlung: SpinWheels. Eine ausführliche Projektbeschreibung folgt, sobald Umfang, mein Beitrag und technische Details dokumentiert sind.",
    experience: "Erfahrung",
    experienceTitle: "Produkte, Menschen & Systeme.",
    jobs: [
      {
        company: "Institut für Medizinische Mikrobiologie",
        role: "IT-Allrounder · Werkstudent",
        date: "Okt. 2025 — Okt. 2026",
        text: "Modernisierung und Refactoring eines PHP-Portals. Arbeit mit SQL, Windows- und Linux-Servern, Berechtigungen, ITSM und technischer Dokumentation.",
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
      {
        company: "IKAMED Institute AG",
        role: "IT-Hard- und Software-Support",
        date: "Juli 2025 — März 2026",
        text: "Behebung von Hard- und Softwareproblemen, Einrichtung von Computern und Servern sowie Wartung der IT-Infrastruktur.",
      },
    ],
    about: "Über mich & Kenntnisse",
    aboutTitle: "Entwicklung mit Weitblick.",
    aboutText:
      "Ich studiere Informatik an der ZHAW und schliesse voraussichtlich 2028 ab. Vor meinem Wechsel an die ZHAW im Jahr 2024 studierte ich Informatik an der ETH Zürich. In der Produktentwicklung lernte ich, technische Entscheidungen mit praktischen Anforderungen zu verbinden. Support und Administration gaben mir Erfahrung bei der Fehlersuche in den Systemen hinter Anwendungen.",
    skills: [
      {
        title: "Softwareentwicklung",
        text: "Java · PHP · SQL · CSS · C (Grundkenntnisse)",
      },
      {
        title: "Produkt & Zusammenarbeit",
        text: "Bubble.io · XANO · Git · GitHub · Gradle · Jira",
      },
      {
        title: "Ausgewählte Systemkenntnisse",
        text: "Linux · Windows Server · Active Directory · LDAP · ITSM",
      },
    ],
    languages:
      "Deutsch und Portugiesisch: Muttersprache · Englisch: verhandlungssicher · Italienisch: fliessend · Französisch: Grundkenntnisse",
    lab: "Interaktives Labor",
    labTitle: "Kleine Suche. Sichtbarer Ablauf.",
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
    contactTitle: "Gemeinsam etwas Nützliches entwickeln.",
    contactText:
      "Interesse an meiner Arbeit? Ich freue mich über Kontakt zu Junior-Stellen in der Software- und Full-Stack-Entwicklung sowie Werkstudentenstellen.",
    cv: "Lebenslauf auf Anfrage",
    cvNote: "Auf Deutsch und Englisch verfügbar.",
    footer: "Entwickelt mit Next.js, React & TypeScript.",
    top: "Nach oben",
  },
};
export type PortfolioContent = typeof content.en;
