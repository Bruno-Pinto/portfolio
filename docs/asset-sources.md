# Asset sources

Employer logos retrieved on 19 October 2026, stored locally for static hosting:

- University of Zurich: official white SVG from [UZH Corporate Design](https://www.cd.uzh.ch/en/elements.html). Used for the Institute of Medical Microbiology. The full seal, lettering and UZH acronym are preserved, with no cropping or recoloring.
- IKAMED Institute AG: public company logo from [LinkedIn](https://www.linkedin.com/company/ikamed-institute-ag).
- Rocketlaunch: public company logo from [LinkedIn](https://www.linkedin.com/company/rocketlaunch1).
- KORK: public company logo from [LinkedIn](https://www.linkedin.com/company/kork-app).

Company logos identify employers in the experience timeline. They remain the respective owners' trademarks. Visitors load the files from this site; there is no LinkedIn embed or runtime image request to LinkedIn.

The small LinkedIn link icon is inline SVG in `src/components/linkedin-icon.tsx`. Visible link text supplies the accessible name; the icon is decorative. Employer images likewise use empty alt text because the adjacent company headings identify them.

The GitHub mark comes from GitHub Primer Octicons (mark-github-16.svg), licensed under MIT. The license is preserved in public/licenses/octicons.txt. It is rendered as decorative inline SVG beside visible link text, with no external image request. Source: https://github.com/primer/octicons/blob/main/icons/mark-github-16.svg
