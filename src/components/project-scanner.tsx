"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import {
  getProjects,
  scannerText,
  type ScannerProject,
} from "@/content/project-scanner";
import type { Locale } from "@/content/portfolio";

import { ProjectGraphic } from "@/components/project-graphic";
import { ProjectList } from "@/components/project-list";
import { ProjectSourceLink } from "@/components/project-source-link";

const SCAN_DURATION_MS = 800;

function CardFace({ project }: { project: ScannerProject }) {
  return (
    <>
      <span className="token-top">
        <span>{project.number}</span>
        <span>{project.category}</span>
      </span>
      <ProjectGraphic id={project.id} />
      <span className="token-title">{project.title}</span>
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
  const [view, setView] = useState<"scanner" | "list">("scanner");
  const listView = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "moving" | "scanning" | "ready">(
    "idle",
  );
  const frame = useRef<HTMLDivElement>(null);
  const dock = useRef<HTMLButtonElement>(null);
  const details = useRef<HTMLElement>(null);
  const sources = useRef<(HTMLButtonElement | null)[]>([]);
  const pending = useRef<{
    rect: DOMRect;
    index: number;
    outgoing?: { rect: DOMRect; index: number };
  } | null>(null);
  const animation = useRef<Animation | null>(null);
  const outgoingAnimation = useRef<Animation | null>(null);

  const choose = useCallback(
    (index: number, open = false) => {
      if (open && selected === index) {
        frame.current?.scrollIntoView({ behavior: "instant", block: "start" });
        dock.current?.focus({ preventScroll: true });
        return;
      }
      const returning = !open && selected === index;
      if (!returning)
        frame.current?.scrollIntoView({ behavior: "instant", block: "start" });
      const source = returning ? dock.current : sources.current[index];
      const rect = source?.getBoundingClientRect();
      const outgoing =
        !returning && selected !== null && dock.current
          ? { rect: dock.current.getBoundingClientRect(), index: selected }
          : undefined;
      animation.current?.cancel();
      outgoingAnimation.current?.cancel();
      pending.current = rect ? { rect, index, outgoing } : null;
      setSelected(returning ? null : index);
      setPhase(
        returning
          ? "idle"
          : window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "ready"
            : "moving",
      );
    },
    [selected],
  );
  useEffect(() => {
    // Real section links still work without JavaScript.
    function openRelatedProject(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[data-project-target]")
          : null;
      if (!link) return;
      const index = getProjects(locale).findIndex(
        (project) => project.id === link.dataset.projectTarget,
      );
      if (index < 0) return;
      event.preventDefault();
      if (window.location.hash !== "#work")
        window.history.pushState(null, "", "#work");
      if (view === "list") {
        const item = listView.current?.querySelector<HTMLElement>(
          '[data-list-project="' + getProjects(locale)[index].id + '"]',
        );
        const detail = item?.querySelector("details");
        if (detail) detail.open = true;
        item?.focus({ preventScroll: true });
        item?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
          block: "start",
        });
      } else {
        choose(index, true);
      }
    }
    document.addEventListener("click", openRelatedProject);
    return () => document.removeEventListener("click", openRelatedProject);
  }, [choose, locale, view]);
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
    const outgoing = move.outgoing
      ? sources.current[move.outgoing.index]
      : null;
    if (outgoing && move.outgoing) {
      const origin = move.outgoing.rect,
        destination = outgoing.getBoundingClientRect();
      outgoingAnimation.current = outgoing.animate(
        [
          {
            transform:
              "translate(" +
              (origin.left - destination.left) +
              "px," +
              (origin.top - destination.top) +
              "px)",
            zIndex: 30,
          },
          { transform: "translate(0,0)", zIndex: 30 },
        ],
        { duration: 480, easing: "cubic-bezier(.22,.8,.25,1)" },
      );
    }
    const to = element.getBoundingClientRect();
    const flight = element.animate(
      [
        {
          transform: `translate(${move.rect.left - to.left}px,${move.rect.top - to.top}px) scale(${move.rect.width / to.width},${move.rect.height / to.height})`,
        },
        { transform: "translate(0,0) scale(1,1)" },
      ],
      {
        duration: 480,
        delay: move.outgoing ? 120 : 0,
        fill: "backwards",
        easing: "cubic-bezier(.22,.8,.25,1)",
      },
    );
    animation.current = flight;
    flight.onfinish = () => {
      if (selected !== null) {
        setPhase("scanning");
      }
    };
    return () => {
      flight.cancel();
      outgoingAnimation.current?.cancel();
    };
  }, [selected]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function finishIfReduced() {
      if (preference.matches) {
        animation.current?.cancel();
        outgoingAnimation.current?.cancel();
        setPhase(selected === null ? "idle" : "ready");
      }
    }
    preference.addEventListener("change", finishIfReduced);
    return () => preference.removeEventListener("change", finishIfReduced);
  }, [selected]);

  useEffect(() => {
    if (
      view !== "scanner" ||
      phase !== "ready" ||
      selected === null ||
      !window.matchMedia("(max-width: 850px)").matches
    )
      return;
    details.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  }, [phase, selected, view]);

  const project = selected === null ? null : projects[selected];
  return (
    <div
      className="project-scanner"
      style={{ "--scan-duration": SCAN_DURATION_MS + "ms" } as CSSProperties}
    >
      <div
        className="project-view-controls"
        role="group"
        aria-label={locale === "en" ? "Project view" : "Projektansicht"}
      >
        <button
          type="button"
          aria-pressed={view === "scanner"}
          aria-controls="project-scanner-view"
          onClick={() => setView("scanner")}
        >
          {locale === "en" ? "Scanner view" : "Scanner-Ansicht"}
        </button>
        <button
          type="button"
          aria-pressed={view === "list"}
          aria-controls="project-list-view"
          onClick={() => {
            animation.current?.cancel();
            outgoingAnimation.current?.cancel();
            if (selected !== null) setPhase("ready");
            setView("list");
          }}
        >
          {locale === "en" ? "List view" : "Listenansicht"}
        </button>
        <p>
          {locale === "en"
            ? "Browse directly in list view, or explore with the scanner."
            : "Direkt in der Liste lesen oder mit dem Scanner entdecken."}
        </p>
      </div>
      <div id="project-scanner-view" hidden={view !== "scanner"}>
        <div className="scanner-frame" ref={frame}>
          <div className="scanner-toolbar">
            <span className="eyebrow">{t.label}</span>
            <div className="scanner-feedback" data-phase={phase}>
              <span className="scanner-status" role="status">
                {phase === "idle"
                  ? t.idle
                  : phase === "moving"
                    ? t.moving
                    : phase === "scanning"
                      ? t.scanning
                      : t.ready}
              </span>
              {project && (
                <span
                  className="scanner-progress"
                  role="progressbar"
                  aria-label={t.scanning}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={
                    phase === "ready" ? 100 : phase === "moving" ? 0 : undefined
                  }
                  aria-valuetext={phase === "scanning" ? t.scanning : undefined}
                >
                  <span />
                </span>
              )}
            </div>
          </div>
          <div className="scanner-layout">
            <div className="scanner-pad" data-phase={phase}>
              <div className="scanner-slot">
                {project ? (
                  <button
                    key={project.id}
                    ref={dock}
                    className="project-token docked-token"
                    data-project-id={project.id}
                    onClick={() => choose(selected!)}
                    aria-label={t.return + ": " + project.title}
                  >
                    <CardFace project={project} />
                  </button>
                ) : (
                  <div className="scanner-empty">
                    <span aria-hidden="true">+</span>
                    <p>{t.empty}</p>
                    <span aria-hidden="true">
                      01 — {String(projects.length).padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>
              <span
                className="scanner-beam"
                aria-hidden="true"
                onAnimationEnd={(event) => {
                  if (
                    event.animationName === "scan-pass" &&
                    phase === "scanning"
                  )
                    setPhase("ready");
                }}
              />
              <p className="scanner-pad-caption">
                {project ? t.return : t.deck}
                <span aria-hidden="true">↓</span>
              </p>
            </div>
            <section
              className="scanner-details"
              id="scanner-details"
              ref={details}
              tabIndex={0}
              aria-label={t.details}
              aria-busy={project !== null && phase !== "ready"}
            >
              {project && phase === "ready" ? (
                <div key={project.id} className="scanner-reveal">
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="muted">{project.description}</p>
                  <ProjectSourceLink
                    url={project.repositoryUrl}
                    title={project.title}
                    locale={locale}
                  />
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
                  <h3>{project ? project.title : t.deck}</h3>
                  <p className="muted">{project ? t.pending : t.instruction}</p>
                </div>
              )}
            </section>
          </div>
        </div>
        <p className="deck-label eyebrow">{t.deck}</p>
        <div className="project-deck">
          {projects.map((p, i) => (
            <div className="project-slot" key={p.id} data-featured={p.featured}>
              <button
                ref={(el) => {
                  sources.current[i] = el;
                }}
                className={
                  selected === i ? "project-placeholder" : "project-token"
                }
                data-project-id={p.id}
                onClick={() => choose(i)}
                aria-pressed={selected === i}
                aria-describedby={"project-summary-" + p.id}
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
              <p className="project-caption" id={"project-summary-" + p.id}>
                {p.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div id="project-list-view" hidden={view !== "list"} ref={listView}>
        <ProjectList locale={locale} />
      </div>
      <noscript>
        <div className="scanner-static">
          {projects.map((p) => (
            <article key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <ProjectSourceLink
                url={p.repositoryUrl}
                title={p.title}
                locale={locale}
              />
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
