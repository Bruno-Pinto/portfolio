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
