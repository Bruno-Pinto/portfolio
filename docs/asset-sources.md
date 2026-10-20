# Asset sources

Employer logos retrieved on 19 October 2026, stored locally for static hosting:

- University of Zurich: official white SVG from [UZH Corporate Design](https://www.cd.uzh.ch/en/elements.html). Used for the Institute of Medical Microbiology. The full seal, lettering and UZH acronym are preserved, with no cropping or recoloring.
- IKAMED Institute AG: public company logo from [LinkedIn](https://www.linkedin.com/company/ikamed-institute-ag).
- Rocketlaunch: public company logo from [LinkedIn](https://www.linkedin.com/company/rocketlaunch1).
- KORK: public company logo from [LinkedIn](https://www.linkedin.com/company/kork-app).

Company logos identify employers in the experience timeline. They remain the respective owners' trademarks. Visitors load the files from this site; there is no LinkedIn embed or runtime image request to LinkedIn.

The small LinkedIn link icon is inline SVG in `src/components/linkedin-icon.tsx`. Visible link text supplies the accessible name; the icon is decorative. Employer images likewise use empty alt text because the adjacent company headings identify them.

The GitHub mark comes from GitHub Primer Octicons (mark-github-16.svg), licensed under MIT. The license is preserved in public/licenses/octicons.txt. It is rendered as decorative inline SVG beside visible link text, with no external image request. Source: https://github.com/primer/octicons/blob/main/icons/mark-github-16.svg

## Technology logos

Local SVG logos for PHP, Java, JUnit, TypeScript, React, Next.js, Tailwind CSS, Git, GitLab, GitHub, Gradle, Docker, Nginx, Linux and Windows were downloaded from Devicon at revision 6a37858047b0e8d9c9c0e68f4a071fc410652e89. Source: https://github.com/devicons/devicon. Its MIT license is included in public/licenses/devicon.txt. Brand marks remain the respective owners’ trademarks.

Bubble’s mark is from https://bubble.io/brand/logo and Xano’s white logo from https://www.xano.com/presskit/. Logos are stored locally and displayed alongside technology names. Generic SQL, JavaFX/Swing desktop, directory and ticket icons represent capabilities without pretending to be product logos. The Windows mark labels Windows Server experience; no desktop Windows version is claimed. Monochrome marks use a white presentation for dark-background contrast.

The Nginx SVG viewBox is trimmed to remove empty vertical padding, without changing its paths or colors. The Next.js mark keeps its original black/white contrast rather than applying a monochrome filter.

- Hero Zurich graphic: original local SVG in src/components/zurich-graphic.tsx, inspired by the lake and river and explicitly labelled as a schematic. No map tiles, external service, geographic dataset or third-party screenshot is used.

- The Zurich schematic was removed from the hero. Its replacement background is drawn entirely in CSS with geometric planes and a drafting grid.
