import { getProjects } from "@/content/project-scanner";
import type { Locale } from "@/content/portfolio";
import { ProjectSourceLink } from "@/components/project-source-link";

export function ProjectList({ locale }: { locale: Locale }) {
  const projects = getProjects(locale);
  const labels =
    locale === "en"
      ? {
          featured: "Featured projects",
          more: "More work",
          details: "Technical details",
        }
      : {
          featured: "Ausgewählte Projekte",
          more: "Weitere Arbeiten",
          details: "Technische Details",
        };
  return (
    <div className="project-list">
      {[true, false].map((featured) => (
        <section
          className="project-list-group"
          key={String(featured)}
          aria-labelledby={featured ? "featured-list-title" : "more-list-title"}
        >
          <h3 id={featured ? "featured-list-title" : "more-list-title"}>
            {featured ? labels.featured : labels.more}
          </h3>
          {projects
            .filter((p) => p.featured === featured)
            .map((project) => (
              <article
                className="project-list-item"
                key={project.id}
                data-list-project={project.id}
                tabIndex={-1}
              >
                <div className="project-list-heading">
                  <p className="eyebrow">{project.category}</p>
                  <h4>{project.title}</h4>
                  <ul
                    className="project-list-tags"
                    aria-label={
                      locale === "en" ? "Technologies" : "Technologien"
                    }
                  >
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-list-copy">
                  <p>{project.description}</p>
                  <ul>
                    {project.overview.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <details>
                    <summary>{labels.details}</summary>
                    {project.details.map((text) => (
                      <p key={text}>{text}</p>
                    ))}
                  </details>
                  <ProjectSourceLink
                    url={project.repositoryUrl}
                    title={project.title}
                    locale={locale}
                  />
                </div>
              </article>
            ))}
        </section>
      ))}
    </div>
  );
}
