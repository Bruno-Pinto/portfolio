# Portfolio content sources

The public summaries are based on CVs supplied by the owner and a read-only inspection of the local SpinWheels repository.

## SpinWheels

Source repository: `team02-jetstillbrains-projekt2-spinwheels` in the owner's ZHAW collection. No private repository URL or source files are exposed through the portfolio.

- README: four-person team, development and quality-control roles.
- Build configuration: Java 21, JavaFX, Gradle and JUnit Jupiter.
- Architecture documentation and source: MVC, FXML views, JSON persistence and CPU pathfinding.
- Commit `1e88441`: skin model.
- Commit `3f406c9`: statistics model and user integration.
- Commit `eb6b41c`: car/user/skin integration.
- Further commits: track selection, JavaFX styling and controller fixes.

These commits support contribution summaries, not exclusive ownership of final team code. CPU pathfinding is presented as a team feature.

The portfolio presents SpinWheels as a text card with its verified features and contributions; no game screenshot is currently shown.

## Portrait

The supplied CV contains the same portrait provided in chat. Its embedded JPEG was extracted unchanged and copied to the public portrait asset. This is a temporary 203 × 203 source; replace it with the higher-resolution original when available.

Original CVs and extraction files remain excluded from Git.

## Employment references

The owner supplied two private employment references to refine English and German descriptions. The PDFs are not copied into the repository or public assets.

- University of Zurich, final reference dated 14 October 2026: confirms the student-assistant title, employment from 15 October 2025 to 14 October 2026, intranet architecture/migration/development, GitLab integration for version control and CI/CD/deployments, central ticketing-system implementation and technical documentation.
- Rocketlaunch, interim reference from 2024: confirms technical-team coordination, software development, technical-project planning and delivery, budget/schedule responsibility, technology evaluation and development-process improvements. Because this is an interim reference, the CV remains the source for the 2022–2024 employment range. Bubble.io, XANO and co-founder status are retained from the CV.

PHP, SQL and LDAP details remain grounded in the CV; the final Zurich reference adds responsibilities rather than replacing those technical details. Employer praise and promotional company descriptions are not reproduced. Birth dates, signatures, contact details of reference authors and infrastructure configurations are omitted.

## Mission-Life and Mission-Chess

Both repositories were inspected read-only. Their code was not changed or executed as part of the portfolio work.

- Mission-Life: build.gradle.kts configures Java 24 and JavaFX. Life.java contains generation updates using separate grids and neighbour counts; PatternLoader.java parses text patterns; GameController.java handles zooming and viewport tracking; LifeCanvas.java renders the grid and changed cells. The build configuration is used for the Java version because the README lists an older minimum.
- Mission-Chess: Chess.java manages local turns, selection and movement; GamePanel.java draws the board and highlights moves with Swing/Java2D; the pieces package contains the shared Piece class and six piece subclasses. Presented as a prototype, without claiming a complete rules engine, AI opponent or online play.

English and German summaries live in src/content/personal-projects.ts. No metrics or test results for these applications are claimed.

## Card graphics

The project-card SVGs are decorative illustrations created for the portfolio, not screenshots or depictions of private system architecture. They share one visual style and remain identical in the scanner and deck.

The PHP intranet and central ticketing system are separate project cards. Their scope follows the University of Zurich reference: intranet architecture/migration/development and GitLab workflows belong to the PHP card; ticketing-system design, implementation, continued development and documentation belong to ITSM. No ticketing product or programming language is assumed.

## Approved public CV downloads

The owner approved publishing both CVs after reviewing their contents. The PDFs were checked again: no postal address or phone number was found in the extracted content, and document metadata was reviewed. Identical copies of the supplied English and German files are tracked in public/cv; originals remain in the ignored _private folder. Employment-reference PDFs remain private. The PDFs have not been rewritten to match later website copy changes.

## Owner clarification, 19 October 2026

The owner confirmed reorganizing the PHP intranet from scattered folders and files into a unified project, migrating PHP 7 to PHP 8 and centralizing database access. No impact metrics, internal layouts or reasons for particular implementation choices are inferred. Availability and workload are intentionally omitted at the owner’s request.

Public repository links were verified against the owner's GitHub account. SpinWheels and professional projects have no public source link in this portfolio. The portfolio itself is included as a web project; its features are grounded in this repository.

## Personal About content, 20 October 2026

The owner confirmed being born in Portugal and having lived in Zurich for 20 years; an interest in building and learning new things, with computers familiar through gaming; gym, running, paintball, gaming, reading, listening to music and playing guitar. No specific achievements, genres, books or personal dates are inferred. The owner later supplied the desk portrait and the five-topic identity-map brief, including wording about growing up between cultures and working style. About now uses bruno-at-desk.png, copied unchanged from the supplied photo; portrait.jpg is preserved and the hero portrait-new.jpg is unchanged. The updated EN/DE copy follows that brief.

## Approved Stage 1 project content (20 October 2026)

The owner supplied and approved bilingual copy for the PHP portal, SpinWheels, Rocketlaunch, Kork Tech and GLPI. This is the source for production use and maintainability/access-control outcomes; PHP 5-era to PHP 8 migration; page-level LDAP/AD authorization; reusable utilities, logging and error handling; SpinWheels individual AI and UI contributions; Rocketlaunch website/CMS, Xano APIs and leadership; Kork Tech service listings, requests and user acquisition; and GLPI Docker, HTTPS/TLS, LDAPS and SMTP integration. The PHP 5-era wording supersedes the earlier PHP 7 description above. No metrics or confidential configurations are inferred.

Project IDs, ordering, public repository links, employment dates and company metadata remain unchanged. Professional detail paragraphs are now arrays to keep Rocketlaunch and Kork Tech distinct in the same card. Existing features and verified technical details remain alongside individual contributions; scanner, list and no-JavaScript fallback render the shared content.

The earlier orange technical-term highlighting and its authoring markers have been removed from project interfaces. Project facts, URLs, IDs and ordering remain unchanged. List previews reference selected existing contribution bullets; expanding an individual project exposes the remaining shared content. The first-three/show-all list state is independent of individual project details and does not limit scanner projects.
