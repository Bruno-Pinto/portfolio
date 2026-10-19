import type { Locale } from "@/content/portfolio";

export const spinwheels = {
  en: {
    label: "Featured project / ZHAW team project",
    title: "SpinWheels",
    subtitle: "A racing game. Built as a team.",
    description:
      "A turn-based desktop racer with selectable tracks, CPU opponents and a garage of car skins. Built in a four-person team using Java 21 and JavaFX.",
    contributionTitle: "My contribution",
    contributions: [
      "Car skins and player statistics",
      "Car, user and skin integration",
      "Track selection and JavaFX interface fixes",
    ],
    detailLabel: "Inside the project",
    detail:
      "The application separates models, FXML views and controllers using MVC. User data is persisted in JSON, and the repository includes JUnit tests and manual test scenarios. CPU opponents use a pathfinding strategy.",
    visualAlt:
      "Schematic of the Nascar track from SpinWheels, showing the road, coins, starting positions and finish line.",
    caption: "Track visualization · Nascar",
    source: "Based on the project’s track data",
    more: "More development work",
  },
  de: {
    label: "Projekt im Fokus / ZHAW-Teamprojekt",
    title: "SpinWheels",
    subtitle: "Ein Rennspiel. Im Team entwickelt.",
    description:
      "Ein rundenbasiertes Desktop-Rennspiel mit Streckenauswahl, CPU-Gegnern und einer Garage für Fahrzeug-Skins. Im Viererteam mit Java 21 und JavaFX entwickelt.",
    contributionTitle: "Mein Beitrag",
    contributions: [
      "Fahrzeug-Skins und Spielerstatistiken",
      "Integration von Fahrzeugen, Nutzern und Skins",
      "Streckenauswahl und Korrekturen der JavaFX-Oberfläche",
    ],
    detailLabel: "Einblick ins Projekt",
    detail:
      "Die Anwendung trennt Modelle, FXML-Ansichten und Controller nach MVC. Nutzerdaten werden in JSON gespeichert. Das Repository enthält JUnit-Tests und manuelle Testszenarien. CPU-Gegner verwenden eine Pfadfindungsstrategie.",
    visualAlt:
      "Schematische Darstellung der Nascar-Strecke aus SpinWheels mit Fahrbahn, Münzen, Startpositionen und Ziellinie.",
    caption: "Streckenvisualisierung · Nascar",
    source: "Aus den Streckendaten des Projekts",
    more: "Weitere Entwicklungsarbeit",
  },
} satisfies Record<
  Locale,
  {
    label: string;
    title: string;
    subtitle: string;
    description: string;
    contributionTitle: string;
    contributions: string[];
    detailLabel: string;
    detail: string;
    visualAlt: string;
    caption: string;
    source: string;
    more: string;
  }
>;
