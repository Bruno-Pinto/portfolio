import type { Locale } from "@/content/portfolio";

export const spinwheels = {
  en: {
    label: "ZHAW / Team project",
    title: "SpinWheels",
    subtitle: "Turn-based racing game",
    description:
      "A Java 21 and JavaFX desktop game developed in a four-person team. Players choose a track, race against other players or CPU opponents, and collect coins to unlock car skins.",
    featuresTitle: "Application features",
    features: [
      "Human-controlled and CPU movement strategies",
      "Acceleration, velocity, collisions and finish-line detection",
      "Player accounts, statistics, skin shop and garage",
    ],
    contributions: [
      "Car skins and player statistics",
      "Car, user and skin integration",
      "Track selection and JavaFX interface fixes",
    ],
    detail: [
      "Movement strategies: a shared MoveStrategy interface separates player input from CPU decisions. The CPU uses breadth-first search over position and velocity to find a route to the finish. Difficulty settings introduce mistakes into its chosen moves.",
      "Gameplay: cars accelerate and move in turns. The game checks the travelled path for walls, other cars and the direction of finish-line crossings. Players can choose tracks and collect coins during a race.",
      "Player features: accounts store coins, owned skins and statistics in JSON files. The shop and garage let players obtain and select skins. Coin purchases use a simulated payment flow.",
      "Structure and testing: MVC separates game models, FXML views and JavaFX controllers. Gradle builds the application; the repository includes JUnit tests and manual test scenarios.",
    ],
  },
  de: {
    label: "ZHAW / Teamprojekt",
    title: "SpinWheels",
    subtitle: "Rundenbasiertes Rennspiel",
    description:
      "Ein Desktop-Spiel mit Java 21 und JavaFX, entwickelt im Viererteam. Spieler wählen eine Strecke, treten gegen andere Spieler oder CPU-Gegner an und sammeln Münzen für Fahrzeug-Skins.",
    featuresTitle: "Funktionen der Anwendung",
    features: [
      "Bewegungsstrategien für menschliche Spieler und CPU-Gegner",
      "Beschleunigung, Geschwindigkeit, Kollisionen und Zielerkennung",
      "Spielerkonten, Statistiken, Skin-Shop und Garage",
    ],
    contributions: [
      "Fahrzeug-Skins und Spielerstatistiken",
      "Integration von Fahrzeugen, Nutzern und Skins",
      "Streckenauswahl und Korrekturen der JavaFX-Oberfläche",
    ],
    detail: [
      "Bewegungsstrategien: Die gemeinsame Schnittstelle MoveStrategy trennt Spielereingaben von CPU-Entscheidungen. Die CPU sucht mit einer Breitensuche über Position und Geschwindigkeit nach einem Weg ins Ziel. Je nach Schwierigkeitsgrad werden Fehler in die gewählten Züge eingebaut.",
      "Spielablauf: Fahrzeuge beschleunigen und bewegen sich abwechselnd. Das Spiel prüft den zurückgelegten Weg auf Wände, andere Fahrzeuge und die Richtung beim Überqueren der Ziellinie. Spieler können Strecken auswählen und während des Rennens Münzen sammeln.",
      "Spielerfunktionen: Konten speichern Münzen, erworbene Skins und Statistiken in JSON-Dateien. Im Shop und in der Garage lassen sich Skins erwerben und auswählen. Münzkäufe verwenden einen simulierten Bezahlvorgang.",
      "Aufbau und Tests: MVC trennt Spielmodelle, FXML-Ansichten und JavaFX-Controller. Gradle übernimmt den Build. Das Repository enthält JUnit-Tests und manuelle Testszenarien.",
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
