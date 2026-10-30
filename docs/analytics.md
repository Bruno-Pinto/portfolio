# Traffic sources

The portfolio optionally loads Umami on both language versions and their nested
pages. It records standard page views, referrers and UTM campaign parameters. No
custom click, section, download or time-spent tracking is added. Umami's standard
dashboard also provides basic visitor/device statistics without additional code.
Development (`npm run dev`) never loads the tracker. Production exports omit it
until both public settings in `.env.example` are configured. The script loads
after hydration; blocking or losing the analytics service does not block the site.

## Configure the portfolio

Set up the self-hosted service below first, then configure the website export.

Create the website in Umami, then copy its script URL and website ID from the
tracking code into the portfolio's server-only `.env`:

```dotenv
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://stats.example.com/script.js
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
NEXT_PUBLIC_UMAMI_DOMAINS=brunopinto.net,www.brunopinto.net
```

These are public identifiers, not credentials. Never put the Umami password or
database credentials in `NEXT_PUBLIC_*` variables. Rebuild and recreate the
portfolio container to apply changes; a restart cannot change exported HTML.
For a local production build use `.env.local`; Next.js does not read `.env.example`.
The domain allowlist prevents local previews from recording visits by default.

## Self-host on the Docker VM

The optional `docker/compose.analytics.yml` runs Umami 3.4.1 and PostgreSQL in a
separate Compose project. It does not change the static portfolio's runtime.
Run these manual steps on the VM from the repository root after releasing the
reviewed changes. No server deployment is performed by the repository setup.

1. Add these settings to the root `.env` (keep it out of Git). Generate **three
   different** values by running `openssl rand -hex 32` three times. Hex avoids
   special characters in the PostgreSQL connection URL. Leave public tracker
   settings empty until the website exists in Umami.

   ```dotenv
   UMAMI_DB_PASSWORD=replace-with-first-random-hex-value
   UMAMI_APP_SECRET=replace-with-second-random-hex-value
   UMAMI_TWO_FACTOR_KEY=replace-with-third-random-hex-value
   UMAMI_BIND_IP=127.0.0.1
   UMAMI_PORT=3001
   ```

2. Validate and start the separate stack:

   ```sh
   docker compose --env-file .env -f docker/compose.analytics.yml config --quiet
   docker compose --env-file .env -f docker/compose.analytics.yml up -d --wait
   curl -fsS http://127.0.0.1:3001/api/heartbeat
   ```

3. Before publishing a proxy host, access port 3001 from the VM or an SSH tunnel.
   Log in using the upstream initial account (`admin` / `umami`) and **change the
   password immediately**. Enable two-factor authentication if desired.

4. Choose an analytics subdomain, for example `stats.YOUR_DOMAIN`, point DNS at
   Nginx Proxy Manager and configure an HTTPS Proxy Host forwarding to the VM's
   port 3001. If NPM runs on a different VM or in a separate container, loopback
   is not reachable: set `UMAMI_BIND_IP` to the Docker VM's reachable LAN address
   and recreate this stack first. Restrict port 3001 to the proxy/admin network;
   do not expose the raw port publicly. Forward the real visitor IP using NPM's
   normal proxy headers so Umami does not group all traffic under the proxy IP.
   The script and `/api/send` must be reachable by visitors; putting proxy-level
   login in front of the entire analytics host blocks collection. Umami itself
   protects the dashboard with login; leave website share URLs disabled.

5. In Umami, add the portfolio website for `brunopinto.net`. Copy the tracking
   script URL and website ID into the public settings above. Then rebuild:

   ```sh
   docker compose build --pull portfolio
   docker compose up -d --wait portfolio
   ```

6. Open a tagged portfolio link in a browser without tracking blockers or Do Not
   Track enabled. In browser Network tools confirm the analytics script loads
   and `/api/send` succeeds. Check the landing page/campaign appears in Umami.
   Test both languages and an untagged referral. This verifies the actual public
   DNS, HTTPS, proxy headers and database setup, which local tests cannot prove.

The database has no published port and lives in the named volume
`portfolio-analytics_umami-db-data`. Ordinary container recreation or `down`
preserves it. **Do not use `down -v`** unless deliberately deleting analytics.
Keep the DB password and app secret stable; editing a password in `.env` does not
change the password inside an existing PostgreSQL volume. `PRIVATE_MODE=1`
disables Umami's external lookups; the browser still sends data to your instance.
No session replay, heatmap, performance or error-capture features are enabled.

Back up the database before updating Umami, since startup can migrate its schema:

```sh
docker compose --env-file .env -f docker/compose.analytics.yml exec -T db pg_dump -U umami -d umami -Fc > umami-backup.dump
```

Store backups outside the public repository/website and include them in the VM's
backup process. To update, review the upstream release notes, change the pinned
Umami version in the Compose file, then pull and recreate this separate stack.
Do not change the PostgreSQL major version without a database upgrade plan.
An older app image alone may not undo schema migrations; retain the matching
database backup. Choose data retention and update any site privacy information
for the actual deployment; cookie-free analytics still processes request data.

## Label the links you share

Use consistent, lowercase tags. These examples work on the English or German URL:

Generate a correctly encoded link locally (no account or running service needed):

```sh
npm run campaign -- --source linkedin --medium social --campaign post-01
npm run campaign -- --source application --medium email --campaign role-01 --url https://brunopinto.net/de/
```

Use `--content` to distinguish two links in the same post or email; quote values
containing spaces. `--help` lists all options. Copy the final URL from the output.

| Purpose | Example link |
| --- | --- |
| LinkedIn post | `https://brunopinto.net/?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio-launch&utm_content=post-01` |
| LinkedIn profile | `https://brunopinto.net/?utm_source=linkedin&utm_medium=social&utm_campaign=profile` |
| Application email | `https://brunopinto.net/de/?utm_source=application&utm_medium=email&utm_campaign=role-01` |
| CV link | `https://brunopinto.net/?utm_source=cv&utm_medium=pdf&utm_campaign=general` |

In Umami, open the website, select a date range, and inspect **Referrers** for
untagged traffic and **UTM** for tagged sources, media and campaigns. Filter by a
campaign to compare individual applications or posts. UTM views are page views,
not a guarantee of distinct people. The initial landing page records the tags;
internal navigation does not copy tags onto other links.

Email apps, redirects and privacy settings can omit referrers. An untagged visit
may therefore appear direct/unknown; it cannot reliably be inferred as an email
visit. Tags identify the shared link, not the visitor or their employer, and a
forwarded link keeps its original tags. Use neutral campaign codes, with your
private mapping kept outside the repository; avoid recipient names or emails in
URLs. Blockers, Do Not Track, disabled JavaScript and link-preview bots mean
counts are approximate. No visitor identity or persistent custom ID is added.

References: [Umami tracking configuration](https://docs.umami.is/docs/tracker-configuration),
[UTM insight](https://docs.umami.is/docs/utm),
[metric definitions](https://docs.umami.is/docs/metric-definitions),
[official Compose example](https://github.com/umami-software/umami/blob/v3.4.1/docker-compose.yml),
[published image](https://github.com/umami-software/umami/pkgs/container/umami).

## Local verification

`npm run test:campaign` checks link encoding/validation. The Playwright analytics
tests run against the exported site, with the same public settings as its build.
Run once with settings unset to verify tracking is absent, then with test-only
values to verify loading on all English/German pages and usability when blocked.
For example, in PowerShell:

```powershell
$env:NEXT_PUBLIC_UMAMI_SCRIPT_URL = 'https://analytics.example.test/script.js'
$env:NEXT_PUBLIC_UMAMI_WEBSITE_ID = '11111111-1111-4111-8111-111111111111'
$env:NEXT_PUBLIC_UMAMI_DOMAINS = '127.0.0.1'
npm run build
npx playwright test tests/traffic-analytics.spec.ts
Remove-Item Env:NEXT_PUBLIC_UMAMI_SCRIPT_URL, Env:NEXT_PUBLIC_UMAMI_WEBSITE_ID, Env:NEXT_PUBLIC_UMAMI_DOMAINS
```

These tests intercept the script request and submit no real analytics. The public
smoke check above is still required to verify ingestion by the deployed Umami.
