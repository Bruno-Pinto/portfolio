"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  getProjects,
  scannerText,
  type ScannerProject,
} from "@/content/project-scanner";
import type { Locale } from "@/content/portfolio";

function CardFace({ project }: { project: ScannerProject }) {
  return (
    <>
      <span className="token-top">
        <span>{project.number}</span>
        <span>{project.category}</span>
      </span>
      <span className="token-title">{project.title}</span>
      <span className="token-summary">{project.summary}</span>
      <span className="token-tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </span>
      <span className="token-bottom" aria-hidden="true">
        <span>ID / {project.number}</span>
        <span>↗</span>
      </span>
    </>
  );
}

export function ProjectScanner({ locale }: { locale: Locale }) {
  const projects = getProjects(locale),
    t = scannerText[locale];
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "moving" | "scanning" | "ready">(
    "idle",
  );
  const frame = useRef<HTMLDivElement>(null);
  const dock = useRef<HTMLButtonElement>(null);
  const sources = useRef<(HTMLButtonElement | null)[]>([]);
  const pending = useRef<{ rect: DOMRect; index: number } | null>(null);
  const animation = useRef<Animation | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function choose(index: number) {
    if (timer.current) clearTimeout(timer.current);
    animation.current?.cancel();
    const returning = selected === index;
    if (!returning)
      frame.current?.scrollIntoView({ behavior: "instant", block: "start" });
    const source = returning ? dock.current : sources.current[index];
    pending.current = source
      ? { rect: source.getBoundingClientRect(), index }
      : null;
    setSelected(returning ? null : index);
    setPhase(
      returning
        ? "idle"
        : window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "ready"
          : "moving",
    );
  }
  useLayoutEffect(() => {
    const move = pending.current;
    pending.current = null;
    if (!move) return;
    const element =
      selected === null ? sources.current[move.index] : dock.current;
    element?.focus({ preventScroll: true });
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const to = element.getBoundingClientRect();
    const flight = element.animate(
      [
        {
          transform: `translate(${move.rect.left - to.left}px,${move.rect.top - to.top}px) scale(${move.rect.width / to.width},${move.rect.height / to.height})`,
        },
        { transform: "translate(0,0) scale(1,1)" },
      ],
      { duration: 480, easing: "cubic-bezier(.22,.8,.25,1)" },
    );
    animation.current = flight;
    flight.onfinish = () => {
      if (selected !== null) {
        setPhase("scanning");
        timer.current = setTimeout(() => setPhase("ready"), 600);
      }
    };
    return () => {
      flight.cancel();
      if (timer.current) clearTimeout(timer.current);
    };
  }, [selected]);

  const project = selected === null ? null : projects[selected];
  return (
    <div className="project-scanner">
      <div className="scanner-frame" ref={frame}>
        <div className="scanner-toolbar">
          <span className="eyebrow">{t.label}</span>
          <span className="scanner-status" role="status">
            {phase === "idle"
              ? t.idle
              : phase === "moving"
                ? t.moving
                : phase === "scanning"
                  ? t.scanning
                  : t.ready}
          </span>
        </div>
        <div className="scanner-layout">
          <div className="scanner-pad" data-phase={phase}>
            <div className="scanner-slot">
              {project ? (
                <button
                  key={project.id}
                  ref={dock}
                  className="project-token docked-token"
                  onClick={() => choose(selected!)}
                  aria-label={t.return + ": " + project.title}
                >
                  <CardFace project={project} />
                </button>
              ) : (
                <div className="scanner-empty">
                  <span aria-hidden="true">+</span>
                  <p>{t.empty}</p>
                  <span aria-hidden="true">01 — 03</span>
                </div>
              )}
            </div>
            <span className="scanner-beam" aria-hidden="true" />
            <p className="scanner-pad-caption">
              {project ? t.return : t.deck}
              <span aria-hidden="true">↓</span>
            </p>
          </div>
          <section
            className="scanner-details"
            id="scanner-details"
            tabIndex={0}
            aria-label={t.details}
          >
            {project ? (
              <div key={project.id}>
                <p className="eyebrow">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="muted">{project.description}</p>
                <h4>{project.overviewTitle}</h4>
                <ul>
                  {project.overview.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="scanner-long-details">
                  {project.details.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {project.contributions.length > 0 && (
                  <>
                    <h4>{t.contribution}</h4>
                    <ul>
                      {project.contributions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ) : (
              <div className="scanner-instructions">
                <span className="eyebrow">02 / {t.details}</span>
                <h3>{t.deck}</h3>
                <p className="muted">{t.instruction}</p>
              </div>
            )}
          </section>
        </div>
      </div>
      <p className="deck-label eyebrow">{t.deck}</p>
      <div className="project-deck">
        {projects.map((p, i) => (
          <div className="project-slot" key={p.id}>
            <button
              ref={(el) => {
                sources.current[i] = el;
              }}
              className={
                selected === i ? "project-placeholder" : "project-token"
              }
              onClick={() => choose(i)}
              aria-pressed={selected === i}
              aria-controls="scanner-details"
              aria-label={
                (selected === i ? t.return : t.select) + ": " + p.title
              }
            >
              {selected === i ? (
                <>
                  <span className="eyebrow">
                    {p.number} / {t.loaded}
                  </span>
                  <span>{p.title}</span>
                  <span className="muted">{t.return} ↓</span>
                </>
              ) : (
                <CardFace project={p} />
              )}
            </button>
          </div>
        ))}
      </div>
      <noscript>
        <div className="scanner-static">
          {projects.map((p) => (
            <article key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              {p.details.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </article>
          ))}
        </div>
      </noscript>
    </div>
  );
}
