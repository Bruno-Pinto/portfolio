/* eslint-disable @next/next/no-html-link-for-pages -- Language routes use separate root layouts and intentionally load complete localized documents. */
import { content, type Locale } from "@/content/portfolio";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { LinkedInIcon } from "@/components/linkedin-icon";
import { getProjects } from "@/content/project-scanner";
import { ProjectScanner } from "@/components/project-scanner";
import { SectionNav } from "@/components/section-nav";
export function Portfolio({ locale }: { locale: Locale }) {
  const t = content[locale];
  const projects = getProjects(locale);
  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <SiteHeader>
        <div className="header-inner">
          <a className="wordmark" href="#top" aria-label="Bruno Pinto da Silva">
            <span>[</span> BP<span> / ]</span>
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
              hrefLang="en"
              aria-current={locale === "en" ? "page" : undefined}
            >
              EN
            </a>
            <span aria-hidden="true">/</span>
            <a
              href="/de/"
              lang="de"
              hrefLang="de"
              aria-current={locale === "de" ? "page" : undefined}
            >
              DE
            </a>
          </div>
        </div>
      </SiteHeader>
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />
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
            <div className="actions">
              <a className="button primary" href="#work">
                {t.explore} ↗
              </a>
              <a className="button" href="#contact">
                {t.contact}
              </a>
            </div>
            <div className="hero-links">
              <a href="mailto:bpintodasilva@gmail.com">{t.emailLabel}</a>
              <span aria-hidden="true">/</span>
              <a
                href="https://www.linkedin.com/in/bruno-pinto-da-silva/"
                rel="me"
                className="social-link"
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <span aria-hidden="true">/</span>
              <a href={t.cvHref} download>
                {t.cv}
              </a>
            </div>
          </div>
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
              <span className="portrait-marker" aria-hidden="true">
                +
              </span>
            </div>
            <div className="portrait-caption">
              <span>BRUNO PINTO DA SILVA</span>
              <span>ZHAW / CH</span>
            </div>
          </div>
        </section>
        <div className="hero-wayfinding container">
          <a href="#experience">
            <span>01</span>
            {t.experience}
            <span aria-hidden="true">↓</span>
          </a>
          <p>
            {t.student} / {t.location}
          </p>
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
        <section
          className="container section"
          id="about"
          aria-labelledby="about-title"
        >
          <p className="eyebrow">03 / {t.about}</p>
          <div className="about-grid">
            <div>
              <h2 id="about-title">{t.aboutTitle}</h2>
              <p className="about-copy muted">{t.aboutText}</p>
            </div>
          </div>
          <div className="skills-section">
            <h3 className="skills-heading">{t.skillsTitle}</h3>
            <div className="skills">
              {t.skills.map((s) => (
                <article className={"skill-card skill-" + s.id} key={s.id}>
                  <span className="skill-icon" aria-hidden="true">
                    {s.symbol}
                  </span>
                  <div className="skill-body">
                    <p className="skill-context">{s.context}</p>
                    <h4>{s.title}</h4>
                    <ul className="skill-tags">
                      {s.text.split(" · ").map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="muted">{s.evidence}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <p className="languages muted">{t.languages}</p>
        </section>
        <section
          className="contact-section section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="container">
            <p className="eyebrow">04 / {t.nav[3]}</p>
            <h2 id="contact-title">{t.contactTitle}</h2>
            <p className="section-intro muted">{t.contactText}</p>
            <a className="contact-email" href="mailto:bpintodasilva@gmail.com">
              bpintodasilva@gmail.com ↗
            </a>
            <div className="cv-note">
              <a
                href="https://www.linkedin.com/in/bruno-pinto-da-silva/"
                rel="me"
                className="social-link"
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <a href="/cv/bruno-pinto-cv-en.pdf" download hrefLang="en">
                {t.cvEnglish} ↓
              </a>
              <a href="/cv/bruno-pinto-cv-de.pdf" download hrefLang="de">
                {t.cvGerman} ↓
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
