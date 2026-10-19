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
- `src/components/portfolio.tsx`: shared page structure. Native disclosure elements expose project summaries without JavaScript.
- `src/components/search-lab.tsx`: the client-side binary-search demonstration. React state tracks the search interval and midpoint.
- `src/app/globals.css`: design tokens, responsive layouts, focus styles and reduced-motion support.
- Route groups `(english)` and `(german)` organize different root layouts without appearing in URLs. Language links load complete documents intentionally.

CV source files stay private; the contact section offers CVs on request until public-download versions are approved. The hero uses the portrait extracted from the supplied CV; replace the low-resolution JPEG with the original photo when available. No project metrics or technology claims have been invented.

## Browser tests and preview

```sh
npx playwright install chromium
npm run build
npm test
npm run preview
```

The local static preview is available at `http://127.0.0.1:4173`. It is a development/testing tool, not the production server. Browser tests start and stop it automatically and check desktop/mobile language navigation, project disclosures, keyboard navigation, and all 16 binary-search targets.

`npm run format` formats source files; `npm run format:check` checks formatting. The current dependency audit reports five high-severity findings in the development lint dependency chain; `npm audit --omit=dev` reports none in production dependencies. Do not blindly apply the suggested major tooling downgrade.

## Visual hierarchy

The header stays visible while scrolling. Projects use bordered cards, with SpinWheels highlighted. Experience is listed most recent first. Skills include the tools and concrete examples of where they were used. The interactive lab is collapsed by default.
