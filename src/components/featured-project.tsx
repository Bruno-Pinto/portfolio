import { spinwheels } from "@/content/spinwheels";
import { content, type Locale } from "@/content/portfolio";

export function FeaturedProject({ locale }: { locale: Locale }) {
  const t = spinwheels[locale];
  const labels = content[locale];
  return (
    <article className="featured-project" aria-labelledby="spinwheels-title">
      <div className="project-top">
        <span className="project-number" aria-hidden="true">
          01
        </span>
        <p className="eyebrow">{t.label}</p>
      </div>
      <h3 id="spinwheels-title">{t.title}</h3>
      <p className="featured-subtitle">{t.subtitle}</p>
      <p className="muted">{t.description}</p>
      <ul className="tags">
        <li>Java 21</li>
        <li>JavaFX</li>
        <li>Gradle</li>
        <li>JUnit</li>
      </ul>
      <div className="contributions">
        <h4>{labels.contributionTitle}</h4>
        <ul>
          {t.contributions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <details className="featured-details">
        <summary>
          {labels.details}
          <span aria-hidden="true"> +</span>
        </summary>
        <p className="project-detail">{t.detail}</p>
      </details>
    </article>
  );
}
