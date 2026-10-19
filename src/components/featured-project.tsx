import Image from "next/image";
import { spinwheels } from "@/content/spinwheels";
import type { Locale } from "@/content/portfolio";

export function FeaturedProject({ locale }: { locale: Locale }) {
  const t = spinwheels[locale];
  return (
    <article className="featured-project" aria-labelledby="spinwheels-title">
      <div className="featured-copy">
        <p className="eyebrow">{t.label}</p>
        <h3 id="spinwheels-title">
          {t.title}
          <span aria-hidden="true">01</span>
        </h3>
        <p className="featured-subtitle">{t.subtitle}</p>
        <p className="muted">{t.description}</p>
        <ul className="tags">
          <li>Java 21</li>
          <li>JavaFX</li>
          <li>Gradle</li>
          <li>JUnit</li>
        </ul>
        <div className="contributions">
          <h4>{t.contributionTitle}</h4>
          <ul>
            {t.contributions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <details className="featured-details">
          <summary>
            {t.detailLabel}
            <span aria-hidden="true"> +</span>
          </summary>
          <p className="project-detail">{t.detail}</p>
        </details>
      </div>
      <figure className="featured-visual">
        <div className="visual-heading" aria-hidden="true">
          <span>SPINWHEELS</span>
          <span>JAVA / JAVAFX</span>
        </div>
        <Image
          src="/images/spinwheels-track.svg"
          alt={t.visualAlt}
          width={600}
          height={525}
        />
        <figcaption>
          <span>{t.caption}</span>
          <span>{t.source}</span>
        </figcaption>
      </figure>
    </article>
  );
}
