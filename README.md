# Bruno Pinto — Developer Portfolio

Personal portfolio built with Next.js App Router, React, TypeScript and Tailwind CSS. English and German content are planned.

## Development

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

The development server is a local preview only. Production will serve the static `out/` directory from the owner's Linux Docker VM behind Nginx Proxy Manager. No production Node.js server is required.

## Branches

- `main`: stable, verified versions.
- `dev`: ongoing development. Merge into `main` after checks pass.

Keep commits small. Short-lived feature branches are optional when useful; no additional branching framework is required.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

The build generates static files in `out/`. Browser journey tests will accompany localization and interactive features.

## Content and privacy

`_private/` contains local source material and is excluded from Git. Do not copy original CVs into public assets without reviewing them for publication. Everything in `public/` becomes publicly accessible when deployed.

Use verified project facts only. Do not commit secrets, personal addresses, internal infrastructure details or service configurations. Server access and production deployment require separate approval.

## Current implementation

- English at `/` and German at `/de/`, with separate HTML language attributes and localized metadata.
- `src/content/portfolio.ts`: CV-grounded content and translations. Verified SpinWheels facts and contributions are in src/content/spinwheels.ts; evidence is documented in docs/content-sources.md.
- `src/components/portfolio.tsx`: shared page structure. The project scanner moves selected cards into a slot and displays their details beside it; static project descriptions are also provided without JavaScript.
- `src/app/globals.css`: design tokens, responsive layouts, focus styles and reduced-motion support.
- Route groups `(english)` and `(german)` organize different root layouts without appearing in URLs. Language links load complete documents intentionally.

Approved English and German CV copies are in public/cv and linked for download in the introduction and contact section. Original source files remain in the ignored _private folder. The hero uses the portrait extracted from the supplied CV; replace the low-resolution JPEG with the original photo when available. No project metrics or technology claims have been invented.

## Browser tests and preview

```sh
npx playwright install chromium
npm run build
npm test
npm run preview
```

The local static preview is available at `http://127.0.0.1:4173`. It is a development/testing tool, not the production server. Browser tests start and stop it automatically and check desktop/mobile language navigation, scanner interactions, keyboard navigation, reduced motion and real PDF downloads.

`npm run format` formats source files; `npm run format:check` checks formatting. The current dependency audit reports five high-severity findings in the development lint dependency chain; `npm audit --omit=dev` reports none in production dependencies. Do not blindly apply the suggested major tooling downgrade.

## Visual hierarchy

The header stays visible while scrolling. Projects use bordered cards, with SpinWheels highlighted. Experience is listed most recent first. Skills include the tools and concrete examples of where they were used.

The page order is introduction, work experience, projects, education/skills and contact. Navigation uses normal anchors; a small client component marks the current section while scrolling. The applied review principles are recorded in docs/design-decisions.md.

## Project scanner

Project data is assembled in src/content/project-scanner.ts and displayed by src/components/project-scanner.tsx. Selecting a card moves it into the scanner using the browser Web Animations API, followed by a red scan line sweeping down and back up over 800 ms. A small progress indicator follows the scan; details appear on the animation-completion event, without an additional timer. Selecting the loaded card returns it to its original slot. A placeholder preserves the lower row layout. Keyboard controls use ordinary buttons, and reduced-motion preferences skip both movement and scanning and reveal details immediately. The mobile layout places details below the selected card. No animation package or backend is required.

The scanner now contains six projects, including Mission-Life and Mission-Chess. When switching projects, the outgoing card animates back to its original slot while the incoming card moves to the scanner with a short stagger. Scanner and deck cards share the same width, height, padding and typography. The empty and loaded scanner use the same taller details-panel height.

Project cards now sit in a tray attached to the scanner. Each card includes a decorative SVG graphic drawn in src/components/project-graphic.tsx: a racing track, a code window, application panels, a cell pattern or a chessboard. These are illustrations, not application screenshots or internal architecture diagrams. Card descriptions remain in the scanner details panel, while the card faces emphasize title, graphic and technologies.

Project order emphasizes development roles: PHP intranet, client applications and marketplace, SpinWheels, central ticketing system, Mission-Life and Mission-Chess. Work experience stays most recent first. Experience entries show role areas and relevant tools; skills lead with PHP and Java and show the context in which each was used.
