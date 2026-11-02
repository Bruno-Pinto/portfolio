<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Portfolio workflow

- Preserve the interactive scanner, holographic deck, card-flight/scan/return animations and list view.
- Preserve English/German localization. Follow `docs/design-system.md`: dark design, cyan accents and sharp corners.
- Never invent project achievements or disclose private infrastructure or professional source code.
- Prefer focused edits and targeted tests; avoid repeatedly reading unrelated files.
- Run `npm run check` and relevant targeted Playwright tests during development. Leave comprehensive `npm run validate` regression validation primarily to CI; avoid repeated full-suite runs.
- Never commit, push or deploy without approval.
