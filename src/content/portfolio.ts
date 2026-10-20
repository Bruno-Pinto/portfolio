export type Locale = "en" | "de";
export const content = {
  en: {
    nav: ["Experience", "Projects", "Skills", "About", "Contact"],
    skip: "Skip to content",
    role: "Software Developer",
    student: "Computer Science student at ZHAW",
    location: "Zurich, Switzerland",
    description:
      "Hands-on experience developing and modernizing software applications, backend systems and deployment workflows.",
    supporting:
      "I enjoy building practical, maintainable software — from improving production systems to developing new applications.",
    availability: "60–80% workload · Available immediately",
    cvLabel: "Download CV",
    explore: "Explore my work",
    contact: "Get in touch",
    emailLabel: "Email",
    work: "Selected work",
    workTitle: "Projects",
    workIntro: "Selected professional, university and personal projects.",
    details: "Project details",
    contributionTitle: "My contributions",
    projects: [
      {
        id: "php",
        title: "PHP intranet modernization",
        category: "Professional / PHP",
        text: "Modernized an internal PHP portal at the University of Zurich into a structured application now in production.",
        tags: ["PHP 5 → 8", "SQL", "GitLab CI/CD"],
        contributions: [
          "Separated public files, application functionality and shared core components; standardized layouts and styling.",
          "Migrated PHP 5-era code to PHP 8, resolving compatibility issues and refactoring existing functionality.",
          "Centralized database access and added reusable utilities, logging and error handling.",
          "Implemented page-level authorization using LDAP and Active Directory roles.",
          "Established GitLab version control and GitLab CI/CD for automated deployment.",
        ],
        detail: [
          "Outcome: Delivered a production application with improved maintainability, clearer structure and stronger access controls. Source code and internal screens remain private.",
        ],
      },
      {
        id: "products",
        title: "Client apps and marketplace",
        category: "Professional / Product development",
        text: "Custom client applications at Rocketlaunch and a C2C services marketplace at Kork Tech.",
        tags: ["Bubble.io", "XANO", "Product development"],
        contributions: [
          "Rocketlaunch · Co-Founder & CTO: Developed client frontends and workflows with Bubble.io; designed databases, APIs and business logic with Xano.",
          "Rocketlaunch: Built the agency website and an internal content management system.",
          "Rocketlaunch: Led developers and managed requirements, client communication, delivery and business development.",
          "Kork Tech: Built Bubble.io interfaces and workflows, maintained the marketplace database and contributed to service listings and requests.",
          "Kork Tech: Supported marketing and user acquisition.",
        ],
        detail: [
          "Rocketlaunch was a software agency delivering custom applications for clients. My role combined hands-on development, technical leadership and project management.",
          "At Kork Tech, I contributed to a consumer-to-consumer services marketplace where people could offer services or request assistance, from household tasks to recreational activities.",
        ],
      },
      {
        id: "itsm",
        title: "GLPI IT service management",
        category: "Professional / ITSM",
        text: "Deployed and configured a self-hosted GLPI platform for internal IT service management at the University of Zurich.",
        tags: ["GLPI", "Docker", "LDAPS", "ITSM", "Documentation"],
        contributions: [
          "Prepared the server environment and deployed GLPI with Docker.",
          "Configured HTTPS and TLS certificates, LDAPS authentication and SMTP email services.",
          "Configured ticket categories, workflows and service management processes.",
          "Maintained infrastructure, application configuration and technical documentation.",
        ],
        detail: [
          "Outcome: A working internal IT service management environment with integrated authentication, email and ticketing workflows. Internal architecture and configuration remain private.",
        ],
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
          "Modernized a legacy PHP portal, including application architecture, PHP 5-era to PHP 8 migration and role-based authorization.",
          "Established GitLab version control and automated deployment.",
          "Deployed and configured an internal GLPI service management platform and maintained technical documentation.",
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
          "Co-founded a software agency and combined client application development with technical leadership.",
          "Led developers and managed technical requirements, client communication and project delivery.",
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
          "Contributed to a C2C services marketplace, including application development, database design and marketing.",
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
            text: "Modernized a production PHP portal, restructuring application code, centralizing data access and adding role-based authorization.",
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
    opportunity: "Open to working-student and junior developer roles",
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
      "Praktische Erfahrung in der Entwicklung und Modernisierung von Softwareanwendungen, Backend-Systemen und Deployment-Prozessen.",
    supporting:
      "Ich entwickle gerne praxisnahe, wartbare Software – von der Weiterentwicklung produktiver Systeme bis zur Umsetzung neuer Anwendungen.",
    availability: "60–80% Pensum · Ab sofort verfügbar",
    cvLabel: "Lebenslauf herunterladen",
    explore: "Projekte entdecken",
    contact: "Kontakt aufnehmen",
    emailLabel: "E-Mail",
    work: "Ausgewählte Projekte",
    workTitle: "Projekte",
    workIntro:
      "Ausgewählte berufliche Projekte, Hochschulprojekte und eigene Anwendungen.",
    details: "Projektdetails",
    contributionTitle: "Meine Beiträge",
    projects: [
      {
        id: "php",
        title: "Modernisierung eines PHP-Intranets",
        category: "Beruflich / PHP",
        text: "Ein internes PHP-Portal an der Universität Zürich zu einer strukturierten Anwendung modernisiert, die heute produktiv eingesetzt wird.",
        tags: ["PHP 5 → 8", "SQL", "GitLab CI/CD"],
        contributions: [
          "Öffentliche Dateien, Anwendungslogik und zentrale Komponenten getrennt sowie Layouts und Styling vereinheitlicht.",
          "PHP-5-Code auf PHP 8 migriert, Kompatibilitätsprobleme behoben und bestehende Funktionen überarbeitet.",
          "Datenbankzugriffe zentralisiert sowie wiederverwendbare Hilfsfunktionen, Logging und Fehlerbehandlung eingeführt.",
          "Seitenbezogene Zugriffssteuerung über LDAP und Active-Directory-Rollen implementiert.",
          "GitLab-Versionsverwaltung und GitLab CI/CD für automatisierte Deployments eingerichtet.",
        ],
        detail: [
          "Ergebnis: Eine modernisierte Produktivanwendung mit verbesserter Wartbarkeit, klarerer Struktur und gezielter Zugriffssteuerung. Quellcode und interne Ansichten bleiben privat.",
        ],
      },
      {
        id: "products",
        title: "Kundenapps und Marktplatz",
        category: "Beruflich / Produktentwicklung",
        text: "Kundenspezifische Anwendungen bei Rocketlaunch und ein C2C-Dienstleistungsmarktplatz bei Kork Tech.",
        tags: ["Bubble.io", "XANO", "Produktentwicklung"],
        contributions: [
          "Rocketlaunch · Mitgründer & CTO: Oberflächen und Workflows mit Bubble.io entwickelt sowie Datenbanken, APIs und Geschäftslogik mit Xano konzipiert.",
          "Rocketlaunch: Agenturwebsite und internes Content-Management-System entwickelt.",
          "Rocketlaunch: Entwickler geleitet und Anforderungen, Kundenkommunikation, Projektabwicklung und Geschäftsentwicklung verantwortet.",
          "Kork Tech: Bubble.io-Oberflächen und Workflows entwickelt, die Marktplatzdatenbank gepflegt und an Angeboten und Anfragen mitgearbeitet.",
          "Kork Tech: Marketing und Nutzergewinnung unterstützt.",
        ],
        detail: [
          "Rocketlaunch war eine Softwareagentur für kundenspezifische Anwendungen. Meine Rolle verband eigene Entwicklungsarbeit mit technischer Leitung und Projektmanagement.",
          "Bei Kork Tech arbeitete ich an einem C2C-Dienstleistungsmarktplatz mit, auf dem Nutzer Angebote veröffentlichen oder Hilfe anfragen konnten – von Haushaltshilfe bis zu Freizeitaktivitäten.",
        ],
      },
      {
        id: "itsm",
        title: "GLPI IT-Service-Management",
        category: "Beruflich / ITSM",
        text: "Eine selbst gehostete GLPI-Plattform für das interne IT-Service-Management an der Universität Zürich bereitgestellt und konfiguriert.",
        tags: ["GLPI", "Docker", "LDAPS", "ITSM", "Dokumentation"],
        contributions: [
          "Serverumgebung eingerichtet und GLPI mit Docker bereitgestellt.",
          "HTTPS und TLS-Zertifikate, LDAPS-Authentifizierung und SMTP-E-Mail-Dienste konfiguriert.",
          "Ticketkategorien, Workflows und Service-Management-Prozesse eingerichtet.",
          "Infrastruktur, Anwendungskonfiguration und technische Dokumentation betreut.",
        ],
        detail: [
          "Ergebnis: Eine funktionsfähige interne IT-Service-Management-Umgebung mit integrierter Authentifizierung, E-Mail-Anbindung und Ticket-Workflows. Interne Architektur und Konfiguration bleiben privat.",
        ],
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
          "Ein gewachsenes PHP-Portal modernisiert: Architektur überarbeitet, PHP-5-Code auf PHP 8 migriert und rollenbasierte Zugriffssteuerung implementiert.",
          "GitLab-Versionsverwaltung und automatisierte Deployments eingeführt.",
          "Eine interne GLPI-Service-Management-Plattform bereitgestellt und konfiguriert sowie technische Dokumentation gepflegt.",
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
          "Eine Softwareagentur mitgegründet und Kundenanwendungen entwickelt sowie die technische Leitung übernommen.",
          "Entwickler geleitet sowie technische Anforderungen, Kundenkommunikation und Projektabwicklung verantwortet.",
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
          "An einem C2C-Dienstleistungsmarktplatz mitgearbeitet, inklusive Anwendungsentwicklung, Datenbankkonzeption und Marketing.",
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
            text: "Ein produktives PHP-Portal modernisiert: Anwendungscode neu strukturiert, Datenzugriffe zentralisiert und rollenbasierte Zugriffssteuerung ergänzt.",
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
      "Offen für Werkstudentenstellen und Junior-Developer-Positionen",
    education: "ZHAW · Informatik · 2024–2028 (voraussichtlich)",
    skillsIntro:
      "Werkzeuge aus meiner beruflichen Arbeit, Hochschulprojekten und diesem Portfolio. Im Web-Frontend lerne ich gerade dazu.",
  },
};
export type PortfolioContent = typeof content.en;
