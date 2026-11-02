# Deployment

This Next.js App Router project uses React, TypeScript and Tailwind CSS. `npm ci`
installs the lockfile dependencies (including build tools); `npm run build` generates
the static `out/` directory. Docker builds with Node.js 24, then copies only the
export into Nginx. No database, production Node.js process, runtime application
environment variables or TLS configuration is required.

Optional traffic-source analytics adds a separate Umami/PostgreSQL stack. See
[docs/analytics.md](docs/analytics.md) for setup, tagged links, public build
arguments and database backups. The portfolio itself remains static; its default
build has analytics disabled. The data/volume guidance below applies to the
portfolio container; the optional analytics database must be backed up separately.

The existing Windows workflow (`npm run dev`, build, tests and preview) is unchanged.
The Docker image is built for the server's architecture automatically.

## Before deploying

On the Ubuntu VM, install Git, Docker Engine and the Docker Compose v2 plugin.
Verify `docker version` and `docker compose version`; use `sudo docker` below if
your account does not have Docker access. No local Docker installation is required
to continue developing, but one is needed to test the container locally.

The repository is `https://github.com/Bruno-Pinto/portfolio.git`; local `origin`
is already configured. Keep `dev` for development and open a pull request into
`main` for review. CI validates pushes to `dev`, pull requests targeting `main`
and manual dispatch with `npm run validate`; it does not deploy or use production
credentials. An explicit release request authorizes native auto-merge after checks pass.
The existing systemd timer on `services` detects the new commit within its
two-minute polling interval and runs the existing deployment script.
Never put credentials in committed files.

No server has been accessed while preparing these instructions. Initial setup
and troubleshooting commands below are for execution over SSH when needed;
normal deployments already run automatically.
Private VM and proxy addresses intentionally stay out of this public repository.

## Clone, build and start

Run on the target VM. Use an empty deployment directory; if a checkout already
exists there, use the update procedure instead.

```sh
sudo mkdir -p /opt/stacks/portfolio
sudo chown "$USER":"$(id -gn)" /opt/stacks/portfolio
git clone --branch main https://github.com/Bruno-Pinto/portfolio.git /opt/stacks/portfolio
cd /opt/stacks/portfolio

docker compose config --quiet
docker compose build --pull
docker compose up -d --wait
docker compose ps
curl -fsS http://127.0.0.1:3000/ >/dev/null
curl -fsS http://127.0.0.1:3000/de/ >/dev/null
```

Port `3000` on the VM forwards to HTTP port `8080` inside the container.
It binds all IPv4 interfaces so a proxy on another VM can reach it.
For a different bind address or port, create a server-only, Git-ignored `.env`:

```dotenv
PORTFOLIO_BIND_IP=0.0.0.0
PORTFOLIO_PORT=3000
```

You may bind the VM's actual LAN address instead. Do not use `127.0.0.1` when
Nginx Proxy Manager runs on a different VM. Apply changes with
`docker compose up -d --wait`. Permit the proxy to reach this port; do not forward
port 3000 from the internet. Account for Docker's published-port firewall rules
when restricting access.

## Nginx Proxy Manager and DNS

1. Point `brunopinto.net` and `www.brunopinto.net` DNS records at your public
   ingress address. Only publish an AAAA record if IPv6 ingress is working.
2. In NPM, create a Proxy Host for both names, using scheme **http**, the
   services VM's reachable LAN address and forward port **3000** (or your override).
3. Request/select a certificate covering both names and enable Force SSL in NPM.
   Existing public HTTP/HTTPS ingress must reach NPM. No certificate belongs in
   the portfolio container, and no WebSocket configuration is needed.
4. Check both domains, `/de/`, project interactions, portrait and CV downloads.
   Check `/de` redirects to `/de/` without switching to HTTP or adding an
   internal port. Unknown paths should return HTTP 404.

All application links use relative paths or explicit external URLs. The static
server does not need to interpret forwarded headers. Relative Nginx redirects
preserve the browser's public HTTPS origin. NPM can use its normal proxy headers.

## Stop and start

```sh
cd /opt/stacks/portfolio
docker compose stop
docker compose up -d --wait
```

`docker compose down` removes the container and Compose network; the checkout and
built image remain. `restart: unless-stopped` restarts after crashes and Docker
reboots, except when deliberately stopped. Health checks report failures but do
not automatically restart an otherwise running unhealthy container.

## Update

Run `npm run check` and targeted Playwright tests during development (see
[README.md](README.md#browser-tests-and-preview)). Let CI run comprehensive
validation; an explicit release request authorizes auto-merge into `main`.
`portfolio-deploy.timer` is already enabled on `services` and polls every two
minutes. `portfolio-deploy.service` invokes the root-owned, untracked
`/opt/stacks/portfolio/deploy.sh`, which fetches `main`, detects changes, uses
flock and fast-forwards before rebuilding Docker Compose. Preserve this setup.

To verify an automatic deployment over SSH:

```sh
cd /opt/stacks/portfolio
git rev-parse HEAD
git rev-parse origin/main
sudo systemctl list-timers portfolio-deploy.timer
sudo systemctl show portfolio-deploy.service -p Result -p ExecMainStatus -p ExecMainExitTimestamp
sudo journalctl -u portfolio-deploy.service -n 100 --no-pager
sudo docker compose ps
sudo docker compose logs --tail=100 portfolio
```

Compare the checkout hash with the merged GitHub `main` revision. The cached
`origin/main` is refreshed by the script. Confirm the corresponding deployment
succeeded in the journal and the container is healthy; a checkout hash alone
cannot identify the running image after a failed rebuild. The current image has
no embedded Git revision label.

Build failure leaves the running container untouched. Successful updates replace
the container and can briefly interrupt service. A restart alone does not rebuild
the site. A failed build after the checkout advances may not retry automatically
when the script sees no newer commit. After resolving the cause, inspect the
script's retry behavior; if necessary, rebuild the checked-out revision manually
with `sudo docker compose build --pull` followed by
`sudo docker compose up -d --wait --wait-timeout 120` and verify health.
For an intentional rollback, stop the timer and wait for any active deployment
to finish before checking out a verified commit and rebuilding. Restore `main`
and re-enable the timer when ready to resume automatic updates.
No volumes or application data need migration. `--pull` refreshes base image
security updates; base tags intentionally track Node 24 and stable Nginx Alpine.
For exactly reproducible releases, record the source revision and image digest.

## Deployment health verification

The only recommended script change is to add health waiting to its existing
Compose startup command. The image already has an HTTP health check (30-second
interval, 10-second start period, three retries); a 120-second wait allows for it.
Docker documents [`--wait` and `--wait-timeout`](https://docs.docker.com/reference/cli/docker/compose/up/).

Execute over SSH on `services`:

```sh
sudo docker compose up --help | grep -E -- '--wait|--wait-timeout'
sudo cp -an /opt/stacks/portfolio/deploy.sh /opt/stacks/portfolio/deploy.sh.before-health-wait
sudoedit /opt/stacks/portfolio/deploy.sh
```

In the existing `docker compose up` command, preserve its current build options,
Compose arguments and service selection, and add `--wait --wait-timeout 120`.
For example, `docker compose up -d --build` becomes
`docker compose up -d --build --wait --wait-timeout 120`.
Ensure a failed Compose command propagates a nonzero script exit (existing
`set -e` or explicit error handling), rather than being masked by a later log
command. Do not replace the script, its locking or commit detection.

```sh
sudo bash -n /opt/stacks/portfolio/deploy.sh
sudo diff -u /opt/stacks/portfolio/deploy.sh.before-health-wait /opt/stacks/portfolio/deploy.sh
sudo systemctl is-enabled portfolio-deploy.timer
sudo systemctl list-timers portfolio-deploy.timer
cd /opt/stacks/portfolio
sudo docker compose ps
sudo docker inspect --format '{{json .State.Health}}' "$(sudo docker compose ps -q portfolio)"
sudo journalctl -u portfolio-deploy.service -n 100 --no-pager
```

`diff` returning 1 means the intended change is present. No daemon reload is
needed for a script-only edit. The next merged commit exercises the health wait;
check the service result, journal and health again after that deployment.
These commands do not force a deployment or add the VM script to Git.

## GitHub branch rules

The active **Protect main** ruleset is recorded in
[.github/main-ruleset.json](.github/main-ruleset.json). It targets only `main`,
requires a PR and the GitHub Actions `validate` check, requires the PR branch to
be up to date, blocks force pushes and deletion, and has no bypass actors.
Required approving reviews are zero. `dev` remains unrestricted.

Native GitHub Auto-merge is enabled. Only regular merge commits are allowed;
squash and rebase merging are disabled, and automatic branch deletion is off.
On an explicit release request, commit and push authorized changes to `dev`,
create a `dev`-to-`main` PR, and enable auto-merge with `gh pr merge --auto --merge`.
No separate manual PR approval is required. After CI passes and GitHub merges,
fast-forward `dev` to the updated `main` and push `dev` without deleting it.
If `dev` is behind `main` before release, merge `main` into `dev` first.
The existing timer handles deployment; no merging workflow or server change is needed.

## Troubleshoot and verify

```sh
docker compose config --quiet
docker compose ps
docker compose logs --tail=100 portfolio
docker compose exec portfolio nginx -t
docker inspect --format '{{json .State.Health}}' "$(docker compose ps -q portfolio)"
curl -I http://127.0.0.1:3000/
curl -I http://127.0.0.1:3000/de
curl -I http://127.0.0.1:3000/de/
curl -I http://127.0.0.1:3000/cv/bruno-pinto-cv-en.pdf
curl -I http://127.0.0.1:3000/does-not-exist
```

- **Build fails:** check registry/npm connectivity, free disk space and VM memory.
  Linux dependencies are installed in the image; local Windows `node_modules`
  and `out/` are excluded.
- **Port in use:** check `sudo ss -ltnp` and change `PORTFOLIO_PORT` if necessary;
  update NPM's forward port too.
- **Unhealthy or restarting:** inspect logs and health output; test `nginx -t`.
  Nginx runs as an unprivileged user with a read-only filesystem and temporary
  runtime files in `/tmp`.
- **NPM 502:** verify the container is healthy and test VM HTTP reachability from
  the proxy VM. Check its forward address, port, scheme and network filtering.
- **Old content:** confirm the expected Git revision, rebuild and recreate.
  HTML and unversioned assets revalidate; only hashed Next.js assets are immutable.

The local production build and browser tests can be checked without Docker:

```sh
npm ci
npx playwright install chromium
npm run validate
```

Container build/start, Nginx routing and the health check still require a
Docker-enabled smoke test. Run the checks above before exposing the site.

References: [Next.js static export Docker example](https://github.com/vercel/next.js/tree/canary/examples/with-docker-export-output),
[Compose service configuration](https://docs.docker.com/reference/compose-file/services/),
[Nginx relative redirects](https://nginx.org/en/docs/http/ngx_http_core_module.html#absolute_redirect).
