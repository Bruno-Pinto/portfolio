import type { Locale } from "@/content/portfolio";

export const spinwheels = {
  en: {
    label: "ZHAW / Team project",
    title: "SpinWheels",
    subtitle: "Turn-based racing game",
    description:
      "A JavaFX turn-based racing game built in a four-person ZHAW team, with human players and CPU opponents, multiple tracks, vehicle customization and progression.",
    featuresTitle: "Application features",
    features: [
      "Turn-based movement, collisions and finish detection",
      "Player accounts, statistics, skin shop and garage",
      "JSON storage, MVC structure and JUnit tests",
    ],
    detail: [
      "Technical highlight: Balanced effective pathfinding with adjustable opponent difficulty to make gameplay more varied. Player input and CPU decisions share a MoveStrategy interface.",
      "Players collect coins and choose car skins. The application uses Java 21, JavaFX and Gradle.",
    ],
    contributions: [
      "Primarily developed the AI opponent system, using breadth-first search over position and velocity for pathfinding.",
      "Designed difficulty-dependent opponent behavior through controlled mistakes in movement decisions.",
      "Built player and track selection interfaces with JavaFX, FXML and CSS.",
      "Contributed to architecture, integration, automated tests, debugging and logging.",
    ],
  },
  de: {
    label: "ZHAW / Teamprojekt",
    title: "SpinWheels",
    subtitle: "Rundenbasiertes Rennspiel",
    description:
      "Ein rundenbasiertes JavaFX-Rennspiel aus einem ZHAW-Viererteam mit menschlichen Spielern und CPU-Gegnern, mehreren Strecken, Fahrzeuganpassungen und Fortschrittsmechaniken.",
    featuresTitle: "Funktionen der Anwendung",
    features: [
      "Rundenbasierte Bewegung, Kollisionen und Zielerkennung",
      "Spielerkonten, Statistiken, Skin-Shop und Garage",
      "JSON-Speicherung, MVC-Aufbau und JUnit-Tests",
    ],
    detail: [
      "Technisches Highlight: Effiziente Pfadfindung mit anpassbarer Gegnerstärke verbunden, um abwechslungsreicheres Gameplay zu ermöglichen. Spielereingaben und CPU-Entscheidungen nutzen dieselbe MoveStrategy-Schnittstelle.",
      "Spieler sammeln Münzen und wählen Fahrzeug-Skins. Die Anwendung verwendet Java 21, JavaFX und Gradle.",
    ],
    contributions: [
      "Das KI-Gegnersystem hauptsächlich entwickelt, mit Breitensuche über Position und Geschwindigkeit zur Pfadfindung.",
      "Schwierigkeitsabhängiges Gegnerverhalten durch gezielte Fehler in den Bewegungsentscheidungen umgesetzt.",
      "Spieler- und Streckenauswahl mit JavaFX, FXML und CSS entwickelt.",
      "An Architektur, Integration, automatisierten Tests, Debugging und Logging mitgearbeitet.",
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
    contributions: string[];
    detail: string[];
  }
>;
