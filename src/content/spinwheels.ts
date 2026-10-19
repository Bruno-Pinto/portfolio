import type { Locale } from "@/content/portfolio";

export const spinwheels = {
  en: {
    label: "ZHAW / Team project",
    title: "SpinWheels",
    subtitle: "Turn-based racing game",
    description:
      "A JavaFX racing game built in a four-person team, with selectable tracks, human players and CPU opponents.",
    featuresTitle: "Application features",
    features: [
      "Turn-based movement, collisions and finish detection",
      "Player accounts, statistics, skin shop and garage",
      "JSON storage, MVC structure and JUnit tests",
    ],
    detail: [
      "Movement strategies: player input and CPU decisions share a MoveStrategy interface. CPU opponents use breadth-first search over position and velocity, with difficulty-based mistakes.",
      "Players collect coins and choose car skins. The application uses Java 21, JavaFX and Gradle.",
    ],
  },
  de: {
    label: "ZHAW / Teamprojekt",
    title: "SpinWheels",
    subtitle: "Rundenbasiertes Rennspiel",
    description:
      "Ein JavaFX-Rennspiel, entwickelt im Viererteam, mit Streckenauswahl, menschlichen Spielern und CPU-Gegnern.",
    featuresTitle: "Funktionen der Anwendung",
    features: [
      "Rundenbasierte Bewegung, Kollisionen und Zielerkennung",
      "Spielerkonten, Statistiken, Skin-Shop und Garage",
      "JSON-Speicherung, MVC-Aufbau und JUnit-Tests",
    ],
    detail: [
      "Bewegungsstrategien: Spielereingaben und CPU-Entscheidungen verwenden eine gemeinsame MoveStrategy-Schnittstelle. CPU-Gegner nutzen eine Breitensuche über Position und Geschwindigkeit und machen je nach Schwierigkeitsgrad Fehler.",
      "Spieler sammeln Münzen und wählen Fahrzeug-Skins. Die Anwendung verwendet Java 21, JavaFX und Gradle.",
    ],
  },
} satisfies Record<
  Locale,
  {
    label: string;
    title: string;
    subtitle: string;
    description: string;
    featuresTitle: string;
    features: string[];
    detail: string[];
  }
>;
