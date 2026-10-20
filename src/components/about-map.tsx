import Image from "next/image";
import { content, type Locale } from "@/content/portfolio";
import { aboutContent } from "@/content/about";
import { AboutMotion } from "@/components/about-motion";
import styles from "./about-map.module.css";

export function AboutMap({ locale }: { locale: Locale }) {
  const t = aboutContent[locale];
  return (
    <section
      id="about"
      className={"section " + styles.section}
      aria-labelledby="about-title"
    >
      <div className="container">
        <p className="eyebrow">
          04 / {locale === "en" ? "About me" : "Über mich"}
        </p>
        <h2 id="about-title">{t.title}</h2>
        <p className={styles.intro}>{t.intro}</p>
        <AboutMotion className={"about-map " + styles.map}>
          <svg
            className={"about-connections " + styles.connections}
            aria-hidden="true"
            focusable="false"
          >
            {t.panels.map((panel) => (
              <path
                key={panel.id}
                data-connect-to={panel.id}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
            ))}
          </svg>
          <figure className={styles.portrait} data-about-portrait>
            <div className={styles.photoFrame}>
              <Image
                src="/images/portrait.jpg"
                width={203}
                height={203}
                alt={t.portraitAlt}
                className={styles.photo}
              />
            </div>
            <figcaption>{t.portraitCaption}</figcaption>
          </figure>
          {t.panels.map((panel, index) => (
            <article
              className={"about-panel " + styles.panel}
              data-panel={panel.id}
              key={panel.id}
            >
              <p className={styles.index} aria-hidden="true">
                0{index + 1}
              </p>
              <h3 className={styles.themeHeading}>
                <ThemeIcon theme={panel.id} />
                {panel.title}
              </h3>
              <p>{panel.text}</p>
            </article>
          ))}
        </AboutMotion>
        <div className={styles.background}>
          <div>
            <h3>{t.educationTitle}</h3>
            <p>{t.education}</p>
            <p className={styles.secondary}>{t.previousEducation}</p>
          </div>
          <div>
            <h3>{t.languagesTitle}</h3>
            <ul>
              {content[locale].languages.split(" · ").map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThemeIcon({ theme }: { theme: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      {theme === "background" ? (
        <>
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18M5 6h14M5 18h14" />
        </>
      ) : theme === "motivation" ? (
        <>
          <path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18" />
        </>
      ) : theme === "hobbies" ? (
        <>
          <path d="M6 5v14M3 8v8m15-11v14m3-11v8M6 12h12" />
        </>
      ) : (
        <>
          <path d="M9 17V5l11-2v12M9 8l11-2" />
          <ellipse cx="6" cy="18" rx="3" ry="2" />
          <ellipse cx="17" cy="16" rx="3" ry="2" />
        </>
      )}
    </svg>
  );
}
