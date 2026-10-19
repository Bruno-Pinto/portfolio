import type { Locale } from "@/content/portfolio";

export const spinwheels = {
  en: {
    label: "ZHAW / Team project",
    title: "SpinWheels",
    subtitle: "Turn-based racing game",
    description:
      "A turn-based desktop racer with selectable tracks, CPU opponents and a garage of car skins. Built in a four-person team using Java 21 and JavaFX.",
    contributions: [
      "Car skins and player statistics",
      "Car, user and skin integration",
      "Track selection and JavaFX interface fixes",
    ],
    detail:
      "The application separates models, FXML views and controllers using MVC. User data is persisted in JSON, and the repository includes JUnit tests and manual test scenarios. CPU opponents use a pathfinding strategy.",
  },
  de: {
    label: "ZHAW / Teamprojekt",
    title: "SpinWheels",
    subtitle: "Rundenbasiertes Rennspiel",
    description:
      "Ein rundenbasiertes Desktop-Rennspiel mit Streckenauswahl, CPU-Gegnern und einer Garage für Fahrzeug-Skins. Im Viererteam mit Java 21 und JavaFX entwickelt.",
    contributions: [
      "Fahrzeug-Skins und Spielerstatistiken",
      "Integration von Fahrzeugen, Nutzern und Skins",
      "Streckenauswahl und Korrekturen der JavaFX-Oberfläche",
    ],
    detail:
      "Die Anwendung trennt Modelle, FXML-Ansichten und Controller nach MVC. Nutzerdaten werden in JSON gespeichert. Das Repository enthält JUnit-Tests und manuelle Testszenarien. CPU-Gegner verwenden eine Pfadfindungsstrategie.",
  },
} satisfies Record<
  Locale,
  {
    label: string;
    title: string;
    subtitle: string;
    description: string;
    contributions: string[];
    detail: string;
  }
>;
