/* eslint-disable @next/next/no-html-link-for-pages -- Language routes use separate root layouts and intentionally load complete localized documents. */
import { content, type Locale } from "@/content/portfolio";
import { SearchLab } from "@/components/search-lab";
const anchors = ["work", "experience", "about", "contact"];
export function Portfolio({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="site-header" id="top">
        <div className="header-inner">
          <a className="wordmark" href="#top" aria-label="Bruno Pinto da Silva">
            <span>[</span> BP<span> / ]</span>
          </a>
          <nav
            aria-label={locale === "en" ? "Main navigation" : "Hauptnavigation"}
          >
            {t.nav.map((label, i) => (
              <a key={label} href={"#" + anchors[i]}>
                {label}
              </a>
            ))}
          </nav>
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
      </header>
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div>
            <p className="eyebrow">
              <span className="status-dot" />
              {t.location}
            </p>
            <p className="hero-name">Bruno Pinto da Silva</p>
            <h1 id="hero-title">
              {t.role}
              <span className="accent">.</span>
            </h1>
            <p className="student">{t.student}</p>
            <p className="hero-intro">{t.intro}</p>
            <p className="muted hero-description">{t.description}</p>
            <div className="actions">
              <a className="button primary" href="#work">
                {t.explore} ↗
              </a>
              <a className="button" href="#contact">
                {t.contact}
              </a>
            </div>
          </div>
          <div className="portrait-wrap">
            <div className="portrait" role="img" aria-label={t.portrait}>
              <span className="portrait-cross top-left" aria-hidden="true">
                +
              </span>
              <span className="portrait-initials" aria-hidden="true">
                BP<span>DS</span>
              </span>
              <span className="portrait-cross bottom-right" aria-hidden="true">
                +
              </span>
              <p>{t.portrait}</p>
            </div>
            <div className="portrait-caption">
              <span>BRUNO_PINTO</span>
              <span aria-hidden="true">FIG. 01 / CH</span>
            </div>
          </div>
        </section>
        <div className="tech-strip">
          <div className="container">
            {["Java", "PHP", "SQL", "Bubble.io", "XANO", "Git"].map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
        <section
          className="container section"
          id="work"
          aria-labelledby="work-title"
        >
          <p className="eyebrow">01 / {t.work}</p>
          <h2 id="work-title">{t.workTitle}</h2>
          <p className="section-intro muted">{t.workIntro}</p>
          <div className="projects">
            {t.projects.map((p, i) => (
              <article className="project" key={p.title}>
                <div className="project-top">
                  <span className="project-number" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <p className="eyebrow">{p.category}</p>
                </div>
                <h3>{p.title}</h3>
                <p className="muted">{p.text}</p>
                <ul className="tags">
                  {p.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <details>
                  <summary>
                    {t.details}
                    <span aria-hidden="true"> +</span>
                  </summary>
                  <p className="project-detail">{p.detail}</p>
                </details>
              </article>
            ))}
          </div>
          <p className="project-note muted">{t.spin}</p>
        </section>
        <section
          className="section experience-section"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="container">
            <p className="eyebrow">02 / {t.experience}</p>
            <h2 id="experience-title">{t.experienceTitle}</h2>
            <div className="timeline">
              {t.jobs.map((j) => (
                <article className="job" key={j.company}>
                  <p className="job-date">{j.date}</p>
                  <div>
                    <h3>{j.company}</h3>
                    <p className="job-role">{j.role}</p>
                    <p className="muted">{j.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
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
            <div className="skills">
              {t.skills.map((s) => (
                <div key={s.title}>
                  <h3>{s.title}</h3>
                  <p className="muted">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="languages muted">{t.languages}</p>
        </section>
        <section
          className="container section lab-section"
          aria-labelledby="lab-title"
        >
          <p className="eyebrow">04 / {t.lab}</p>
          <h2 id="lab-title">{t.labTitle}</h2>
          <p className="section-intro muted">{t.labText}</p>
          <SearchLab text={t} />
        </section>
        <section
          className="contact-section section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="container">
            <p className="eyebrow">05 / {t.nav[3]}</p>
            <h2 id="contact-title">{t.contactTitle}</h2>
            <p className="section-intro muted">{t.contactText}</p>
            <a className="contact-email" href="mailto:bpintodasilva@gmail.com">
              bpintodasilva@gmail.com ↗
            </a>
            <div className="cv-note">
              <a
                href={
                  "mailto:bpintodasilva@gmail.com?subject=" +
                  encodeURIComponent(
                    locale === "en" ? "CV request" : "Anfrage Lebenslauf",
                  )
                }
              >
                {t.cv} ↗
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
