# Deployment

This Next.js App Router project uses React, TypeScript and Tailwind CSS. `npm ci`
installs the lockfile dependencies (including build tools); `npm run build` generates
the static `out/` directory. Docker builds with Node.js 24, then copies only the
export into Nginx. No database, production Node.js process, runtime application
environment variables or TLS configuration is required.

The existing Windows workflow (`npm run dev`, build, tests and preview) is unchanged.
The Docker image is built for the server's architecture automatically.

## Before deploying

On the Ubuntu VM, install Git, Docker Engine and the Docker Compose v2 plugin.
Verify `docker version` and `docker compose version`; use `sudo docker` below if
your account does not have Docker access. No local Docker installation is required
to continue developing, but one is needed to test the container locally.

Publish the reviewed code to your Git repository first: no Git remote is currently
configured. Replace `YOUR_REPOSITORY_URL` below with its clone URL. Keep `main`
stable and `dev` for development; merge the verified deployment changes into
`main` and push before deploying. Never put credentials in committed files.

These instructions are manual steps only; no server has been accessed.
Private VM and proxy addresses intentionally stay out of this public repository.

## Clone, build and start

Run on the target VM. Use an empty deployment directory; if a checkout already
exists there, use the update procedure instead.

```sh
sudo mkdir -p /opt/stacks/portfolio
sudo chown "$USER":"$(id -gn)" /opt/stacks/portfolio
git clone --branch main YOUR_REPOSITORY_URL /opt/stacks/portfolio
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

Run the usual checks locally, merge reviewed changes into `main` and push.
Then, in a clean server checkout:

```sh
cd /opt/stacks/portfolio
git rev-parse HEAD  # Save this revision if rollback may be needed.
git pull --ff-only origin main
docker compose build --pull
docker compose up -d --wait
docker compose ps
```

Build failure leaves the running container untouched. Successful updates replace
the container and can briefly interrupt service. A restart alone does not rebuild
the site. To roll back, check out a previously verified commit, rebuild and run
`docker compose up -d --wait`; switch back to `main` before the next normal update.
No volumes or application data need migration. `--pull` refreshes base image
security updates; base tags intentionally track Node 24 and stable Nginx Alpine.
For exactly reproducible releases, record the source revision and image digest.

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
npm run lint
npm run build
npm test
```

Container build/start, Nginx routing and the health check still require a
Docker-enabled smoke test. Run the checks above before exposing the site.

References: [Next.js static export Docker example](https://github.com/vercel/next.js/tree/canary/examples/with-docker-export-output),
[Compose service configuration](https://docs.docker.com/reference/compose-file/services/),
[Nginx relative redirects](https://nginx.org/en/docs/http/ngx_http_core_module.html#absolute_redirect).
