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

## Releases

- Develop on the long-lived `dev` branch; keep `dev` unrestricted and never delete it after a release.
- An explicit request to release authorizes creating a PR from `dev` into `main` and enabling GitHub native auto-merge with the regular merge commit method (`gh pr merge --auto --merge`). Do not ask for separate PR approval. Commit or push local changes only when authorized by the release request or other explicit instructions.
- `main` requires a PR and the GitHub Actions `validate` check (app ID `15368`), with zero required approving reviews. The branch must be up to date before merging. Force pushes and branch deletion are blocked, with no bypass actors. The prepared configuration is `.github/main-ruleset.json`.
- Use merge commits, never squash or rebase merges. Keep automatic head-branch deletion disabled to preserve `dev`. If a release PR is behind `main`, merge `main` into `dev` and rerun validation; do not rewrite branch history.
- Use native GitHub auto-merge; do not add a merging workflow. GitHub merges once required checks pass, and the existing services VM systemd timer deploys new `main` commits. Do not change the VM or timer as part of releases unless explicitly requested.
- Repository configuration work alone does not authorize a release, merge, or deployment.
