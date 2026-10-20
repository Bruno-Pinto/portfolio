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
      className={"container section " + styles.section}
      aria-labelledby="about-title"
    >
      <p className="eyebrow">
        04 / {locale === "en" ? "About me" : "Über mich"}
      </p>
      <h2 id="about-title">{t.title}</h2>
      <p className={styles.intro}>{t.intro}</p>
      <AboutMotion className={"about-map " + styles.map}>
        <svg
          className={"about-connections " + styles.connections}
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <g
            fill="none"
            stroke="#41545d"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          >
            <path d="M430 300H375V140H300M570 300H625V140H700M430 300H375V460H300M570 300H625V460H700" />
          </g>
          <path
            className={styles.flow}
            d="M430 300H375V140H300M570 300H625V140H700M430 300H375V460H300M570 300H625V460H700"
            fill="none"
            stroke="#9db5be"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <figure className={styles.portrait}>
          <div className={styles.photoFrame}>
            <Image
              src="/images/portrait.jpg"
              width={203}
              height={203}
              alt={t.portraitAlt}
              className={styles.photo}
            />
            <span className={styles.corners} aria-hidden="true" />
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
            <h3>{panel.title}</h3>
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
    </section>
  );
}
