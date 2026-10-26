import type { Locale } from "./portfolio";

export const dashboardContent = {
  en: {
    back: "Back to portfolio",
    skip: "Skip to content",
    language: "Language",
    application: "Application information",
    privacy: "Privacy policy",
    description:
      "Home Dashboard is a private, self-hosted Glance dashboard for personal use, maintained by Bruno Pinto da Silva.",
    accessTitle: "Google Tasks access",
    access:
      "The Google OAuth application currently requests read-only Google Tasks access to display task lists and tasks in the personal dashboard. This includes list names, task titles, notes, due dates and completion status. It cannot create, edit or delete tasks.",
    plannedTitle: "Planned integrations",
    planned:
      "Google Calendar, weather, public transport and home infrastructure monitoring are planned integrations. The current Google permission is limited to Tasks read-only access.",
    privacyDescription:
      "How Home Dashboard accesses, uses, stores and deletes Google Tasks data for a private personal dashboard.",
    sections: [
      {
        title: "Data accessed and purpose",
        text: "Home Dashboard requests the Google Tasks read-only permission (https://www.googleapis.com/auth/tasks.readonly). It reads task lists, list names, task titles, notes, due dates and completion status solely to display them within the personal dashboard. It does not create, modify or delete Google Tasks. Google Calendar access is not currently requested.",
      },
      {
        title: "Storage and temporary caching",
        text: "OAuth credentials, including access and refresh tokens, are stored on a private, self-hosted server. Task data is temporarily cached there to reduce Google API calls. Credentials are retained while the integration is connected, until locally deleted; cached data is temporary and can also be deleted. These public information pages do not connect to Google or display private credentials or task data.",
      },
      {
        title: "Use and sharing",
        text: "Google user data is used only within the personal dashboard. It is not used for advertising, sold, or shared with third parties. It is not used to train AI or machine learning models.",
      },
    ],
    revokeTitle: "Revoke access and delete local data",
    revoke:
      "Open your Google Account's third-party connections, select Home Dashboard, and remove its access to your Google Account. This prevents further Google API access but does not delete existing local copies.",
    connections: "Manage Google Account connections",
    deletion:
      "To delete local data, stop the Google Tasks integration on the self-hosted server and remove its stored OAuth credentials (including access and refresh tokens) and cached Google Tasks data from the integration's storage. The server administrator can do this directly; you can also request deletion using the contact email below. Removing local data does not delete tasks from your Google Account.",
    limitedTitle: "Google API Services - Limited Use",
    limited:
      "Home Dashboard's use of information received from Google APIs adheres to the Google API Services User Data Policy, including its Limited Use requirements. Google Tasks data is used only to provide the personal dashboard functionality described above.",
    policyLink: "Google API Services User Data Policy",
    contactTitle: "Contact",
    contact:
      "For privacy questions or requests to delete locally stored credentials and cached data, contact Bruno Pinto da Silva:",
  },
  de: {
    back: "Zurück zum Portfolio",
    skip: "Zum Inhalt springen",
    language: "Sprache",
    application: "Informationen zur Anwendung",
    privacy: "Datenschutzerklärung",
    description:
      "Home Dashboard ist ein privates, selbst gehostetes Glance-Dashboard für den persönlichen Gebrauch, betrieben von Bruno Pinto da Silva.",
    accessTitle: "Zugriff auf Google Tasks",
    access:
      "Die Google-OAuth-Anwendung fordert derzeit ausschliesslich Lesezugriff auf Google Tasks an, um Aufgabenlisten und Aufgaben im persönlichen Dashboard anzuzeigen. Dazu gehören Listennamen, Aufgabentitel, Notizen, Fälligkeitsdaten und Erledigungsstatus. Sie kann keine Aufgaben erstellen, ändern oder löschen.",
    plannedTitle: "Geplante Integrationen",
    planned:
      "Google Calendar, Wetter, öffentlicher Verkehr und die Überwachung der Heiminfrastruktur sind geplante Integrationen. Die aktuelle Google-Berechtigung beschränkt sich auf den Lesezugriff auf Tasks.",
    privacyDescription:
      "Wie Home Dashboard Google-Tasks-Daten für ein privates persönliches Dashboard abruft, nutzt, speichert und löscht.",
    sections: [
      {
        title: "Abgerufene Daten und Zweck",
        text: "Home Dashboard fordert die Google-Tasks-Leseberechtigung an (https://www.googleapis.com/auth/tasks.readonly). Aufgabenlisten, Listennamen, Aufgabentitel, Notizen, Fälligkeitsdaten und Erledigungsstatus werden ausschliesslich zur Anzeige im persönlichen Dashboard gelesen. Google-Tasks-Aufgaben werden weder erstellt noch geändert oder gelöscht. Ein Zugriff auf Google Calendar wird derzeit nicht angefordert.",
      },
      {
        title: "Speicherung und temporärer Cache",
        text: "OAuth-Zugangsdaten einschliesslich Zugriffs- und Aktualisierungstokens werden auf einem privaten, selbst gehosteten Server gespeichert. Aufgabendaten werden dort vorübergehend zwischengespeichert, um Google-API-Aufrufe zu reduzieren. Zugangsdaten bleiben während der Verbindung gespeichert, bis sie lokal gelöscht werden; zwischengespeicherte Daten sind temporär und können ebenfalls gelöscht werden. Diese öffentlichen Informationsseiten stellen keine Verbindung zu Google her und zeigen keine privaten Zugangsdaten oder Aufgabendaten an.",
      },
      {
        title: "Nutzung und Weitergabe",
        text: "Google-Nutzerdaten werden ausschliesslich im persönlichen Dashboard verwendet. Sie werden nicht für Werbung genutzt, verkauft oder an Dritte weitergegeben. Sie werden nicht zum Trainieren von KI- oder Machine-Learning-Modellen verwendet.",
      },
    ],
    revokeTitle: "Zugriff widerrufen und lokale Daten löschen",
    revoke:
      "Öffnen Sie die Drittanbieterverbindungen Ihres Google-Kontos, wählen Sie Home Dashboard und entfernen Sie dessen Zugriff auf Ihr Google-Konto. Dies verhindert weitere Google-API-Zugriffe, löscht jedoch keine bestehenden lokalen Kopien.",
    connections: "Google-Kontoverbindungen verwalten",
    deletion:
      "Um lokale Daten zu löschen, stoppen Sie die Google-Tasks-Integration auf dem selbst gehosteten Server und entfernen Sie die gespeicherten OAuth-Zugangsdaten (einschliesslich Zugriffs- und Aktualisierungstokens) sowie zwischengespeicherte Google-Tasks-Daten aus dem Speicher der Integration. Der Serveradministrator kann dies direkt durchführen; Sie können die Löschung auch über die unten genannte Kontaktadresse anfordern. Das Entfernen lokaler Daten löscht keine Aufgaben aus Ihrem Google-Konto.",
    limitedTitle: "Google API Services - Limited Use",
    limited:
      "Die Nutzung von Informationen aus Google APIs durch Home Dashboard entspricht der Google API Services User Data Policy einschliesslich ihrer Limited-Use-Anforderungen. Google-Tasks-Daten werden ausschliesslich für die oben beschriebene Funktion des persönlichen Dashboards verwendet.",
    policyLink: "Google API Services User Data Policy",
    contactTitle: "Kontakt",
    contact:
      "Bei Datenschutzfragen oder Anfragen zur Löschung lokal gespeicherter Zugangsdaten und zwischengespeicherter Daten kontaktieren Sie Bruno Pinto da Silva:",
  },
} satisfies Record<Locale, unknown>;
