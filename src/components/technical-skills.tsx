import { content, type Locale } from "@/content/portfolio";
import { getProjects } from "@/content/project-scanner";
import { CategoryIcon, TechnologyIcon } from "@/components/technology-icon";
import styles from "./technical-skills.module.css";

export function TechnicalSkills({ locale }: { locale: Locale }) {
  const t = content[locale];
  const projects = getProjects(locale);
  return (
    <section
      className={"container section " + styles.section}
      id="skills"
      aria-labelledby="skills-title"
    >
      <p className="eyebrow">03 / {t.skillsTitle}</p>
      <h2 id="skills-title">{t.skillsTitle}</h2>
      <p className={styles.intro}>{t.skillsIntro}</p>
      <div className={styles.groups}>
        {t.skills.map((group) => (
          <article
            key={group.id}
            className={"skill-card skill-" + group.id + " " + styles.category}
            data-category={group.id}
          >
            <div className="skill-body" style={{ gridColumn: "1 / -1" }}>
              <div className={styles.heading}>
                <span className={styles.symbol}>
                  <CategoryIcon category={group.id} />
                </span>
                <div>
                  <p className={"skill-context " + styles.context}>
                    {group.context}
                  </p>
                  <h3>{group.title}</h3>
                </div>
              </div>
              <ul
                className={styles.tools}
                aria-label={locale === "en" ? "Technologies" : "Technologien"}
              >
                {group.tools.map((tool) => (
                  <li key={tool}>
                    <TechnologyIcon name={tool} />
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
              <div className={"skill-evidence " + styles.evidence}>
                {group.evidence.map((item) => {
                  const project = projects.find((p) => p.id === item.projectId);
                  return (
                    <div key={item.projectId}>
                      <p>{item.text}</p>
                      {project && (
                        <a href="#work" data-project-target={project.id}>
                          {project.title} <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
