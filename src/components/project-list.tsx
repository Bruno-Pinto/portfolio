"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { getProjects, scannerText } from "@/content/project-scanner";
import type { Locale } from "@/content/portfolio";
import { ProjectSourceLink } from "@/components/project-source-link";
import {
  isProjectTakeaway,
  projectAccent,
  ProjectDetailParagraph,
} from "@/components/project-presentation";
import { ProjectDisclosure } from "@/components/project-disclosure";

// These indices select shared bullets; preview copy is never duplicated.
const previewIndices: Record<string, number[]> = {
  php: [1, 2],
  spinwheels: [0, 2],
  products: [0, 3],
  itsm: [0, 1],
};

export function ProjectList({ locale }: { locale: Locale }) {
  const projects = useMemo(() => getProjects(locale), [locale]);
  const [showAll, setShowAll] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function revealRelated(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        root.current?.closest("[hidden]")
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-project-target]")
          : null;
      const index = projects.findIndex(
        (project) => project.id === link?.dataset.projectTarget,
      );
      if (index >= 3) flushSync(() => setShowAll(true));
    }
    document.addEventListener("click", revealRelated, true);
    return () => document.removeEventListener("click", revealRelated, true);
  }, [projects]);

  function toggleProjects() {
    if (!showAll) {
      setShowAll(true);
      return;
    }
    const control = toggle.current;
    if (!control) return;
    const before = control.getBoundingClientRect();
    const active =
      document.activeElement instanceof Element
        ? document.activeElement.closest<HTMLElement>("[data-list-project]")
        : null;
    const hidesFocus =
      projects.findIndex(
        (project) => project.id === active?.dataset.listProject,
      ) >= 3;
    const header =
      document.querySelector(".site-header")?.getBoundingClientRect().height ??
      80;
    const anchorY = Math.min(
      Math.max(before.top, header + 20),
      window.innerHeight - before.height - 20,
    );
    flushSync(() => setShowAll(false));
    if (hidesFocus) control.focus({ preventScroll: true });
    window.scrollBy({
      top: control.getBoundingClientRect().top - anchorY,
      behavior: "instant",
    });
  }
  const labels =
    locale === "en"
      ? {
          featured: "Featured projects",
          more: "More work",
          key: "Key contributions",
          highlights: "Highlights",
          remaining: "More contributions",
        }
      : {
          featured: "Ausgewählte Projekte",
          more: "Weitere Arbeiten",
          key: "Meine Beiträge",
          highlights: "Im Überblick",
          remaining: "Weitere Beiträge",
        };
  return (
    <div className="project-list" ref={root}>
      <div id="project-list-cards">
        {[true, false].map((featured) => (
          <section
            className="project-list-group"
            hidden={
              !showAll &&
              !projects.some(
                (project, index) => project.featured === featured && index < 3,
              )
            }
            key={String(featured)}
            aria-labelledby={
              featured ? "featured-list-title" : "more-list-title"
            }
          >
            <h3 id={featured ? "featured-list-title" : "more-list-title"}>
              {featured ? labels.featured : labels.more}
            </h3>
            {projects
              .filter((project) => project.featured === featured)
              .map((project) => {
                const professional =
                  project.overviewTitle === scannerText[locale].contribution;
                const contributions = professional
                  ? project.overview
                  : project.contributions;
                const previewSource = contributions.length
                  ? contributions
                  : project.overview;
                const indices = previewIndices[project.id] ?? [0, 1];
                const selected = indices.filter(
                  (index) => index < previewSource.length,
                );
                const remaining = previewSource.filter(
                  (_, index) => !selected.includes(index),
                );
                const hasFeatures = contributions.length > 0 && !professional;
                return (
                  <article
                    className="project-list-item"
                    key={project.id}
                    data-list-project={project.id}
                    data-project-kind={project.kind}
                    style={projectAccent(project)}
                    hidden={!showAll && projects.indexOf(project) >= 3}
                    tabIndex={-1}
                    aria-labelledby={"list-title-" + project.id}
                  >
                    <header className="project-list-heading">
                      <div>
                        <p className="eyebrow">{project.category}</p>
                        <h4 id={"list-title-" + project.id}>{project.title}</h4>
                      </div>
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
                    </header>
                    <div className="project-list-copy">
                      <p className="project-list-summary">{project.summary}</p>
                      <div className="project-key-contributions">
                        <h5>
                          {contributions.length
                            ? labels.key
                            : labels.highlights}
                        </h5>
                        <ul>
                          {selected.map((index) => (
                            <li key={index}>{previewSource[index]}</li>
                          ))}
                        </ul>
                      </div>
                      <ProjectSourceLink
                        url={project.repositoryUrl}
                        title={project.title}
                        locale={locale}
                      />
                      <ProjectDisclosure
                        title={project.title}
                        id={"project-expanded-" + project.id}
                        locale={locale}
                      >
                        <div className="project-detail-section project-context">
                          {project.details
                            .filter(isProjectTakeaway)
                            .map((text) => (
                              <ProjectDetailParagraph key={text} text={text} />
                            ))}
                          {project.description !== project.summary && (
                            <p className="project-description">
                              {project.description}
                            </p>
                          )}
                          {project.details
                            .filter((text) => !isProjectTakeaway(text))
                            .map((text) => (
                              <ProjectDetailParagraph key={text} text={text} />
                            ))}
                        </div>
                        {remaining.length > 0 && (
                          <section className="project-detail-section">
                            <h5>
                              {contributions.length
                                ? labels.remaining
                                : project.overviewTitle}
                            </h5>
                            <ul>
                              {remaining.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </section>
                        )}
                        {hasFeatures && (
                          <section className="project-detail-section">
                            <h5>{project.overviewTitle}</h5>
                            <ul>
                              {project.overview.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </section>
                        )}
                      </ProjectDisclosure>
                    </div>
                  </article>
                );
              })}
          </section>
        ))}
      </div>
      <div className="project-list-toggle">
        <button
          type="button"
          className="button"
          ref={toggle}
          onClick={toggleProjects}
          aria-expanded={showAll}
          aria-controls="project-list-cards"
        >
          {locale === "en"
            ? showAll
              ? "Show fewer projects"
              : "Show all " + projects.length + " projects"
            : showAll
              ? "Weniger Projekte anzeigen"
              : "Alle " + projects.length + " Projekte anzeigen"}
        </button>
      </div>
    </div>
  );
}
