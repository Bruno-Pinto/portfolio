/* eslint-disable @next/next/no-html-link-for-pages -- Language routes use separate root layouts and intentionally load complete localized documents. */
import { content, type Locale } from "@/content/portfolio";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { LinkedInIcon } from "@/components/linkedin-icon";
import { GitHubIcon } from "@/components/github-icon";
import { EmailIcon, DownloadIcon } from "@/components/link-icons";
import { getProjects } from "@/content/project-scanner";
import { ProjectScanner } from "@/components/project-scanner";
import { SectionNav } from "@/components/section-nav";
import { TechnicalSkills } from "@/components/technical-skills";
import { AboutMap } from "@/components/about-map";
import { LanguageFlag } from "@/components/language-flag";
import { PageMotion } from "@/components/page-motion";
export function Portfolio({ locale }: { locale: Locale }) {
  const t = content[locale];
  const projects = getProjects(locale);
  return (
    <>
      <PageMotion />
      <div id="top" aria-hidden="true" />
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <SiteHeader>
        <div className="header-inner">
          <a className="wordmark" href="#top" aria-label="Bruno Pinto da Silva">
            Bruno Pinto<span>.</span>
          </a>
          <SectionNav
            labels={t.nav}
            label={locale === "en" ? "Main navigation" : "Hauptnavigation"}
          />
          <div
            className="language-switch"
            aria-label={locale === "en" ? "Language" : "Sprache"}
          >
            <a
              href="/"
              lang="en"
              aria-label="EN"
              title="English"
              hrefLang="en"
              aria-current={locale === "en" ? "page" : undefined}
            >
              <LanguageFlag language="en" /> EN
            </a>
            <span aria-hidden="true">/</span>
            <a
              href="/de/"
              lang="de"
              aria-label="DE"
              title="Deutsch"
              hrefLang="de"
              aria-current={locale === "de" ? "page" : undefined}
            >
              <LanguageFlag language="de" /> DE
            </a>
          </div>
        </div>
      </SiteHeader>
      <main id="main">
        <div className="hero-surface">
          <section className="hero container" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow">
                <svg
                  className="swiss-flag"
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path fill="#d9363e" d="M0 0h32v32H0z" />
                  <path fill="#fff" d="M13 6h6v7h7v6h-7v7h-6v-7H6v-6h7z" />
                </svg>
                {t.location}
              </p>
              <h1 id="hero-title">
                <span className="hero-firstname">
                  Bruno Pinto<span className="accent">.</span>
                </span>
                <span className="hero-role">{t.role}</span>
              </h1>
              <p className="student">{t.student}</p>
              <p className="muted hero-description">{t.description}</p>
              <p className="opportunity">{t.opportunity}</p>
              <div className="actions">
                <a className="button primary" href="#work">
                  {t.explore} ↗
                </a>
                <a className="button" href="#contact">
                  {t.contact}
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="portrait-wrap">
                <div className="portrait">
                  <Image
                    src="/images/portrait-new.jpg"
                    alt="Bruno Pinto da Silva"
                    width={720}
                    height={720}
                    priority
                    className="portrait-image"
                  />
                  <svg
                    className="portrait-border"
                    viewBox="0 0 400 400"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M1 1H399V399" pathLength="1" />
                    <path d="M1 1V399H399" pathLength="1" />
                  </svg>
                </div>
                <div className="portrait-caption">
                  <span>BRUNO PINTO DA SILVA</span>
                  <span>ZHAW / CH</span>
                </div>
              </div>
            </div>
            <div className="hero-links">
              <a className="social-link" href="mailto:bpintodasilva@gmail.com">
                <EmailIcon /> {t.emailLabel}
              </a>
              <a
                href="https://www.linkedin.com/in/bruno-pinto-da-silva/"
                rel="me"
                className="social-link"
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <a
                href="https://github.com/Bruno-Pinto"
                rel="me"
                className="social-link"
              >
                <GitHubIcon /> GitHub
              </a>
              <a className="social-link" href={t.cvHref} download>
                <DownloadIcon /> {t.cv}
              </a>
            </div>
          </section>
        </div>
        <section
          className="section experience-section"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="container">
            <p className="eyebrow">01 / {t.experience}</p>
            <h2 id="experience-title">{t.experienceTitle}</h2>
            <div className="timeline">
              {t.jobs.map((j) => (
                <article className="job" key={j.company}>
                  <div className="job-meta">
                    <div className="job-logo" aria-hidden="true">
                      <Image
                        src={j.logo.src}
                        width={j.logo.width}
                        height={j.logo.height}
                        alt=""
                      />
                    </div>
                    <p className="job-area">{j.area}</p>
                    <p className="job-date">{j.date}</p>
                  </div>
                  <div>
                    <h3>{j.company}</h3>
                    <p className="job-role">{j.role}</p>
                    <ul className="job-points">
                      {j.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <ul className="job-tags">
                      {j.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    {j.projectIds.length > 0 && (
                      <nav
                        className="job-projects"
                        aria-label={t.relatedProjects}
                      >
                        <span>{t.relatedProjects}</span>
                        {j.projectIds.map((id) => {
                          const project = projects.find((p) => p.id === id);
                          return project ? (
                            <a key={id} href="#work" data-project-target={id}>
                              {project.title} <span aria-hidden="true">↗</span>
                            </a>
                          ) : null;
                        })}
                      </nav>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          className="container section"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / {t.work}</p>
              <h2 id="work-title">{t.workTitle}</h2>
            </div>
            <p className="section-intro muted">{t.workIntro}</p>
          </div>
          <ProjectScanner locale={locale} />
        </section>
        <TechnicalSkills locale={locale} />
        <AboutMap locale={locale} />
        <section
          className="contact-section section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="container">
            <p className="eyebrow">05 / {t.nav[4]}</p>
            <h2 id="contact-title">{t.contactTitle}</h2>
            <p className="section-intro muted">{t.contactText}</p>
            <a
              className="contact-email social-link"
              href="mailto:bpintodasilva@gmail.com"
            >
              <EmailIcon />
              <span>bpintodasilva@gmail.com ↗</span>
            </a>
            <div className="cv-note">
              <a
                href="https://www.linkedin.com/in/bruno-pinto-da-silva/"
                rel="me"
                className="social-link"
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <a
                href="https://github.com/Bruno-Pinto"
                rel="me"
                className="social-link"
              >
                <GitHubIcon /> GitHub
              </a>
              <a
                className="social-link"
                href="/cv/bruno-pinto-cv-en.pdf"
                download
                hrefLang="en"
              >
                <DownloadIcon /> {t.cvEnglish}
              </a>
              <a
                className="social-link"
                href="/cv/bruno-pinto-cv-de.pdf"
                download
                hrefLang="de"
              >
                <DownloadIcon /> {t.cvGerman}
              </a>
              <span className="muted">{t.cvNote}</span>
            </div>
          </div>
        </section>
      </main>
      <footer className="container site-footer">
        <p>© {new Date().getFullYear()} Bruno Pinto da Silva</p>
        <p>{t.footer}</p>
        <a href="#top">{t.top} ↑</a>
      </footer>
    </>
  );
}
