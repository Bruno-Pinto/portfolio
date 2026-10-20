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

import {
  isProjectTakeaway,
  projectAccent,
  ProjectDetailParagraph,
} from "@/components/project-presentation";

const SCAN_DURATION_MS = 800;

function CardFace({ project }: { project: ScannerProject }) {
  return (
    <>
      <span className="token-top">
        <span>{project.number}</span>
        <span>{project.category}</span>
      </span>
      <span className="token-title">{project.title}</span>
      <ProjectGraphic id={project.id} />
      <span className="token-summary">{project.summary}</span>
      <span className="token-tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
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
  const deck = useRef<HTMLDivElement>(null);
  const [railEdges, setRailEdges] = useState({ start: true, end: false });
  const dock = useRef<HTMLButtonElement>(null);
  const details = useRef<HTMLElement>(null);
  const picker = useRef<HTMLDetailsElement>(null);
  const sources = useRef<(HTMLButtonElement | null)[]>([]);
  const pending = useRef<{
    rect: DOMRect;
    index: number;
    outgoing?: { rect: DOMRect; index: number };
  } | null>(null);
  const animation = useRef<Animation | null>(null);
  const outgoingAnimation = useRef<Animation | null>(null);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        element.dataset.ambientVisible = String(entries[0].isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const rail = deck.current;
    if (!rail) return;
    function measure() {
      const start = rail!.scrollLeft <= 2;
      const end = rail!.scrollLeft + rail!.clientWidth >= rail!.scrollWidth - 2;
      setRailEdges((previous) =>
        previous.start === start && previous.end === end
          ? previous
          : { start, end },
      );
    }
    const resize = new ResizeObserver(measure);
    resize.observe(rail);
    rail.addEventListener("scroll", measure, { passive: true });
    measure();
    return () => {
      resize.disconnect();
      rail.removeEventListener("scroll", measure);
    };
  }, [view]);
  useEffect(() => {
    const rail = deck.current;
    if (!rail) return;
    let gesture: {
      id: number;
      x: number;
      scroll: number;
      dragging: boolean;
    } | null = null;
    let suppressClick = false;
    function start(event: PointerEvent) {
      // Touch keeps native scrolling; only a primary mouse button starts a grab.
      if (
        event.pointerType !== "mouse" ||
        event.button !== 0 ||
        !event.isPrimary
      )
        return;
      suppressClick = false;
      gesture = {
        id: event.pointerId,
        x: event.clientX,
        scroll: rail!.scrollLeft,
        dragging: false,
      };
    }
    function move(event: PointerEvent) {
      if (!gesture || event.pointerId !== gesture.id) return;
      if (event.buttons !== 1) {
        finish();
        return;
      }
      const distance = event.clientX - gesture.x;
      if (!gesture.dragging && Math.abs(distance) < 8) return;
      if (!gesture.dragging) {
        gesture.dragging = true;
        suppressClick = true;
        rail!.dataset.dragging = "true";
        rail!.setPointerCapture(event.pointerId);
      }
      event.preventDefault();
      rail!.scrollLeft = gesture.scroll - distance;
    }
    function finish() {
      const id = gesture?.id;
      gesture = null;
      rail!.removeAttribute("data-dragging");
      if (id !== undefined && rail!.hasPointerCapture(id))
        rail!.releasePointerCapture(id);
    }
    function click(event: MouseEvent) {
      // Keyboard activation has detail=0 and must always remain available.
      if (suppressClick && event.detail !== 0) {
        event.preventDefault();
        event.stopPropagation();
        suppressClick = false;
      }
    }
    function preventNativeDrag(event: DragEvent) {
      event.preventDefault();
    }
    rail.addEventListener("pointerdown", start);
    rail.addEventListener("pointermove", move);
    rail.addEventListener("pointerup", finish);
    rail.addEventListener("pointercancel", finish);
    rail.addEventListener("lostpointercapture", finish);
    rail.addEventListener("click", click, true);
    rail.addEventListener("dragstart", preventNativeDrag);
    window.addEventListener("blur", finish);
    return () => {
      finish();
      rail.removeEventListener("pointerdown", start);
      rail.removeEventListener("pointermove", move);
      rail.removeEventListener("pointerup", finish);
      rail.removeEventListener("pointercancel", finish);
      rail.removeEventListener("lostpointercapture", finish);
      rail.removeEventListener("click", click, true);
      rail.removeEventListener("dragstart", preventNativeDrag);
      window.removeEventListener("blur", finish);
    };
  }, [view]);

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (
        picker.current?.open &&
        event.target instanceof Node &&
        !picker.current.contains(event.target)
      )
        picker.current.open = false;
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);

  function scrollDeck(direction: number) {
    const rail = deck.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * (rail.clientWidth * 0.8),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  const choose = useCallback(
    (index: number, open = false) => {
      if (picker.current) picker.current.open = false;
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
    ) {
      if (selected === null)
        element?.scrollIntoView({
          behavior: "instant",
          block: "nearest",
          inline: "nearest",
        });
      return;
    }
    // Return snapshots escape the scroll rail, preserving the full card flight.
    const restores: (() => void)[] = [];
    function returnSurface(source: HTMLElement, destination: DOMRect) {
      const layer = document.createElement("div");
      layer.className = "project-scanner tray-flight-layer";
      layer.setAttribute("aria-hidden", "true");
      layer.inert = true;
      const snapshot = source.cloneNode(true) as HTMLElement;
      Object.assign(snapshot.style, {
        position: "absolute",
        left: destination.left + "px",
        top: destination.top + "px",
        width: destination.width + "px",
        height: destination.height + "px",
        margin: "0",
        translate: "none",
        scale: "none",
        transform: "none",
        opacity: "1",
      });
      layer.append(snapshot);
      document.body.append(layer);
      source.setAttribute("data-tray-flight", "true");
      let restored = false;
      function restore() {
        if (restored) return;
        restored = true;
        source.removeAttribute("data-tray-flight");
        layer.remove();
      }
      restores.push(restore);
      return { snapshot, restore };
    }
    const outgoing = move.outgoing
      ? sources.current[move.outgoing.index]
      : null;
    if (outgoing && move.outgoing) {
      const origin = move.outgoing.rect,
        destination = outgoing.getBoundingClientRect();
      const surface = returnSurface(outgoing, destination);
      outgoingAnimation.current = surface.snapshot.animate(
        [
          {
            transform:
              "translate(" +
              (origin.left - destination.left) +
              "px," +
              (origin.top - destination.top) +
              "px)",
            scale: `${origin.width / destination.width} ${origin.height / destination.height}`,
            zIndex: 30,
          },
          { transform: "translate(0,0)", scale: "1 1", zIndex: 30 },
        ],
        { duration: 480, easing: "cubic-bezier(.22,.8,.25,1)" },
      );
    }
    if (outgoingAnimation.current)
      outgoingAnimation.current.onfinish = () => restores[0]?.();
    if (outgoingAnimation.current)
      outgoingAnimation.current.oncancel = () => restores[0]?.();
    // Later user intent owns the viewport, even while the return flight continues.
    let interrupted = false;
    const interrupt = () => {
      interrupted = true;
    };
    const intentEvents = [
      "pointerdown",
      "keydown",
      "click",
      "wheel",
      "touchstart",
      "hashchange",
      "popstate",
    ] as const;
    if (selected === null)
      intentEvents.forEach((event) =>
        window.addEventListener(event, interrupt, true),
      );
    const to = element.getBoundingClientRect();
    const returning = selected === null ? returnSurface(element, to) : null;
    const flight = (returning?.snapshot ?? element).animate(
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
    flight.oncancel = () => returning?.restore();
    flight.onfinish = () => {
      returning?.restore();
      if (
        selected === null &&
        !interrupted &&
        document.activeElement === element
      )
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      if (selected !== null) {
        setPhase("scanning");
      }
    };
    return () => {
      intentEvents.forEach((event) =>
        window.removeEventListener(event, interrupt, true),
      );
      flight.onfinish = null;
      flight.oncancel = null;
      flight.cancel();
      outgoingAnimation.current?.cancel();
      restores.forEach((restore) => restore());
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
    let cancelled = false;
    const request = requestAnimationFrame(() => {
      const slot = frame.current?.querySelector(".scanner-slot");
      slot?.getBoundingClientRect(); // Flush the ready-state height transition.
      const transitions = slot?.getAnimations() ?? [];
      Promise.allSettled(
        transitions.map((transition) => transition.finished),
      ).then(() => {
        if (cancelled || !window.matchMedia("(max-width: 850px)").matches)
          return;
        frame.current?.querySelector(".scanner-pad")?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
          block: "start",
        });
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(request);
    };
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
            if (picker.current) picker.current.open = false;
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
        <div className="scanner-frame" ref={frame} data-phase={phase}>
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
              <svg
                className="scanner-ambient"
                viewBox="0 0 300 480"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M14 14H286V466H14Z" pathLength="1" />
              </svg>
              <div className="scanner-slot">
                {project ? (
                  <button
                    key={project.id}
                    ref={dock}
                    className="project-token docked-token"
                    data-project-id={project.id}
                    data-featured={project.featured}
                    data-project-kind={project.kind}
                    style={projectAccent(project)}
                    onClick={() => choose(selected!)}
                    aria-label={t.return + ": " + project.title}
                  >
                    <CardFace project={project} />
                    <span className="compact-return" aria-hidden="true">
                      {t.return} <span>{"\u2199"}</span>
                    </span>
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
              <p className="scanner-pad-caption" id="scanner-card-guidance">
                {project
                  ? t.return
                  : locale === "en"
                    ? "Select a card below to scan"
                    : "Karte unten zum Scannen auswählen"}
                <span aria-hidden="true">↓</span>
              </p>
            </div>
            <section
              className="scanner-details"
              data-project-kind={project?.kind}
              style={project ? projectAccent(project) : undefined}
              id="scanner-details"
              ref={details}
              tabIndex={0}
              aria-label={t.details}
              aria-busy={project !== null && phase !== "ready"}
            >
              <details
                className="scanner-project-picker"
                ref={picker}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    event.currentTarget.open = false;
                    event.currentTarget.querySelector("summary")?.focus();
                  }
                }}
              >
                <summary aria-controls="scanner-project-options">
                  {project ? t.chooseAnother : t.deck}
                  <span aria-hidden="true">+</span>
                </summary>
                <ul
                  id="scanner-project-options"
                  className="scanner-project-options"
                >
                  {projects.map((option, index) => (
                    <li key={option.id}>
                      <button
                        type="button"
                        aria-current={selected === index ? "true" : undefined}
                        onClick={() => choose(index, true)}
                      >
                        <span aria-hidden="true">{option.number}</span>
                        <span>{option.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
              {project && phase === "ready" ? (
                <div key={project.id} className="scanner-reveal">
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <ProjectSourceLink
                    url={project.repositoryUrl}
                    title={project.title}
                    locale={locale}
                  />
                  <div className="scanner-highlights">
                    {project.details
                      .filter(isProjectTakeaway)
                      .map((paragraph) => (
                        <ProjectDetailParagraph
                          key={paragraph}
                          text={paragraph}
                        />
                      ))}
                  </div>
                  <h4>{project.overviewTitle}</h4>
                  <ul>
                    {project.overview.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
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
                  <div className="scanner-long-details">
                    {project.details
                      .filter((paragraph) => !isProjectTakeaway(paragraph))
                      .map((paragraph) => (
                        <ProjectDetailParagraph
                          key={paragraph}
                          text={paragraph}
                        />
                      ))}
                  </div>
                </div>
              ) : (
                <div className="scanner-instructions">
                  <span className="eyebrow">02 / {t.details}</span>
                  {project && <h3>{project.title}</h3>}
                  <p className="muted">{project ? t.pending : t.instruction}</p>
                </div>
              )}
            </section>
          </div>
        </div>
        <div
          className="project-deck"
          id="project-deck"
          ref={deck}
          role="group"
          aria-label={t.deck}
          aria-describedby="scanner-card-guidance"
        >
          {projects.map((p, i) => (
            <div
              className="project-slot"
              key={p.id}
              data-featured={p.featured}
              style={{ "--card-layer": i + 1 } as CSSProperties}
            >
              <button
                ref={(el) => {
                  sources.current[i] = el;
                }}
                className={
                  selected === i ? "project-placeholder" : "project-token"
                }
                data-project-id={p.id}
                data-featured={p.featured}
                data-project-kind={p.kind}
                style={projectAccent(p)}
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
        <div className="deck-navigation">
          <button
            type="button"
            aria-label={
              locale === "en" ? "Previous projects" : "Vorherige Projekte"
            }
            aria-controls="project-deck"
            disabled={railEdges.start}
            onClick={() => scrollDeck(-1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label={locale === "en" ? "Next projects" : "Nächste Projekte"}
            aria-controls="project-deck"
            disabled={railEdges.end}
            onClick={() => scrollDeck(1)}
          >
            <span aria-hidden="true">→</span>
          </button>
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
              <h4>{p.overviewTitle}</h4>
              <ul>
                {p.overview.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {p.contributions.length > 0 && (
                <>
                  <h4>{t.contribution}</h4>
                  <ul>
                    {p.contributions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
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
