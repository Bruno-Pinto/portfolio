export const personalProjects = {
  en: [
    {
      id: "mission-life",
      number: "04",
      title: "Mission-Life",
      category: "Personal / Simulation",
      summary: "Conway’s Game of Life in JavaFX.",
      description:
        "A desktop simulation of Conway’s Game of Life. A grid evolves generation by generation from patterns loaded from text files.",
      tags: ["Java 24", "JavaFX", "Canvas", "Gradle"],
      overviewTitle: "Application features",
      overview: [
        "Generation updates based on neighbouring cells",
        "Pattern loading and a zoomable grid",
        "Canvas updates for changed cells",
      ],
      contributions: [],
      details: [
        "The simulation keeps separate grids for the current and next generation, counts neighbouring cells and notifies the interface when a generation changes.",
        "The JavaFX controller handles zooming and a viewport overview. Canvas rendering separates full redraws from updates to cells that changed. Pattern files are grouped by type and parsed into cell grids.",
      ],
    },
    {
      id: "mission-chess",
      number: "05",
      title: "Mission-Chess",
      category: "Personal / Board game",
      summary: "A local chess prototype in Java and Swing.",
      description:
        "A desktop chess prototype with an interactive board, piece-specific movement and alternating local turns. A project for practising Java, object-oriented modelling and mouse-driven interfaces.",
      tags: ["Java", "Swing", "Java2D"],
      overviewTitle: "Application features",
      overview: [
        "Click to select pieces and highlight moves",
        "Separate classes for the six piece types",
        "Local turns, movement and captures",
      ],
      contributions: [],
      details: [
        "A shared Piece class provides common behaviour, while subclasses define movement for pawns, rooks, knights, bishops, queens and kings.",
        "Java2D draws the board in a Swing panel. Mouse clicks select a piece or a destination; the interface highlights calculated moves and tracks whose turn it is.",
      ],
    },
  ],
  de: [
    {
      id: "mission-life",
      number: "04",
      title: "Mission-Life",
      category: "Privat / Simulation",
      summary: "Conways Game of Life mit JavaFX.",
      description:
        "Eine Desktop-Simulation von Conways Game of Life. Das Raster entwickelt sich Generation für Generation aus Mustern, die aus Textdateien geladen werden.",
      tags: ["Java 24", "JavaFX", "Canvas", "Gradle"],
      overviewTitle: "Funktionen der Anwendung",
      overview: [
        "Generationsberechnung anhand benachbarter Zellen",
        "Musterdateien und zoombares Raster",
        "Canvas-Aktualisierung geänderter Zellen",
      ],
      contributions: [],
      details: [
        "Die Simulation verwendet getrennte Raster für die aktuelle und die nächste Generation, zählt benachbarte Zellen und benachrichtigt die Oberfläche bei einer neuen Generation.",
        "Der JavaFX-Controller steuert Zoom und eine Übersicht des sichtbaren Ausschnitts. Die Canvas-Darstellung unterscheidet zwischen vollständigem Neuzeichnen und der Aktualisierung geänderter Zellen. Musterdateien sind nach Typ gruppiert und werden in Zellraster eingelesen.",
      ],
    },
    {
      id: "mission-chess",
      number: "05",
      title: "Mission-Chess",
      category: "Privat / Brettspiel",
      summary: "Ein lokaler Schach-Prototyp mit Java und Swing.",
      description:
        "Ein Desktop-Schachprototyp mit interaktivem Brett, figurenspezifischen Zügen und abwechselnden lokalen Spielzügen. Zum Üben von Java, objektorientierter Modellierung und Mausinteraktionen.",
      tags: ["Java", "Swing", "Java2D"],
      overviewTitle: "Funktionen der Anwendung",
      overview: [
        "Figuren per Klick auswählen und Züge hervorheben",
        "Eigene Klassen für die sechs Figurentypen",
        "Lokale Spielzüge, Bewegung und Schlagen von Figuren",
      ],
      contributions: [],
      details: [
        "Eine gemeinsame Piece-Klasse stellt Grundverhalten bereit. Unterklassen definieren die Bewegungen von Bauern, Türmen, Springern, Läufern, Damen und Königen.",
        "Java2D zeichnet das Brett in einem Swing-Panel. Mausklicks wählen eine Figur oder ein Zielfeld. Die Oberfläche hebt berechnete Züge hervor und verfolgt, welche Seite am Zug ist.",
      ],
    },
  ],
};
