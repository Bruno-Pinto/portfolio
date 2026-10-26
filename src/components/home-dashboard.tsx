import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/content/portfolio";
import { dashboardContent } from "@/content/home-dashboard";
import { LanguageFlag } from "./language-flag";
import styles from "./home-dashboard.module.css";

export function dashboardMetadata(locale: Locale, privacy = false): Metadata {
  const t = dashboardContent[locale];
  const suffix = privacy ? "privacy/" : "";
  const path = `/home-dashboard/${suffix}`;
  return {
    title: `${privacy ? t.privacy + " | " : ""}Home Dashboard | Bruno Pinto da Silva`,
    description: privacy ? t.privacyDescription : t.description,
    alternates: {
      canonical: locale === "de" ? `/de${path}` : path,
      languages: { en: path, de: `/de${path}` },
    },
  };
}

export function HomeDashboard({
  locale,
  privacy = false,
}: {
  locale: Locale;
  privacy?: boolean;
}) {
  const t = dashboardContent[locale];
  const base = locale === "de" ? "/de/home-dashboard/" : "/home-dashboard/";
  const suffix = privacy ? "privacy/" : "";
  return (
    <div className={`container ${styles.page}`}>
      <a className="skip-link" href="#content">
        {t.skip}
      </a>
      <header className={styles.header}>
        <Link href={locale === "de" ? "/de/" : "/"} className="wordmark">
          BP<span>.</span>
        </Link>
        <nav className="language-switch" aria-label={t.language}>
          {(["en", "de"] as const).map((language) => (
            <Link
              key={language}
              href={`${language === "de" ? "/de" : ""}/home-dashboard/${suffix}`}
              hrefLang={language}
              lang={language}
              aria-current={locale === language ? "page" : undefined}
              aria-label={language === "en" ? "English" : "Deutsch"}
            >
              <LanguageFlag language={language} /> {language.toUpperCase()}
            </Link>
          ))}
        </nav>
      </header>
      <main id="content">
        <p className={`eyebrow ${styles.footer}`}>
          Home Dashboard / {privacy ? t.privacy : t.application}
        </p>
        <h1 className={styles.title}>
          {privacy ? t.privacy : "Home Dashboard"}
        </h1>
        <p className={styles.intro}>
          {privacy ? t.privacyDescription : t.description}
        </p>
        {privacy ? (
          <>
            {t.sections.map((section) => (
              <section className={styles.section} key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </section>
            ))}
            <section className={styles.section}>
              <h2>{t.revokeTitle}</h2>
              <p>{t.revoke}</p>
              <p>
                <a
                  className={styles.link}
                  href="https://myaccount.google.com/connections"
                >
                  {t.connections}
                </a>
              </p>
              <p>{t.deletion}</p>
            </section>
            <section className={styles.section}>
              <h2>{t.limitedTitle}</h2>
              <p>{t.limited}</p>
              <p>
                <a
                  className={styles.link}
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                >
                  {t.policyLink}
                </a>
              </p>
            </section>
            <section className={styles.section}>
              <h2>{t.contactTitle}</h2>
              <p>{t.contact}</p>
              <p>
                <a
                  className={styles.link}
                  href="mailto:bpintodasilva@gmail.com"
                >
                  bpintodasilva@gmail.com
                </a>
              </p>
            </section>
          </>
        ) : (
          <>
            <section className={styles.section}>
              <h2>{t.accessTitle}</h2>
              <p>{t.access}</p>
            </section>
            <section className={styles.section}>
              <h2>{t.plannedTitle}</h2>
              <p>{t.planned}</p>
            </section>
          </>
        )}
        <p className={styles.footer}>
          <Link
            className={styles.link}
            href={privacy ? base : `${base}privacy/`}
          >
            {privacy ? t.application : t.privacy}
          </Link>
        </p>
      </main>
      <footer className={styles.footer}>
        <Link className="muted" href={locale === "de" ? "/de/" : "/"}>
          {t.back}
        </Link>
      </footer>
    </div>
  );
}
