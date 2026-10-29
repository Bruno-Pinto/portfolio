# Traffic sources

The portfolio optionally loads Umami on both language versions and their nested
pages. It records standard page views, referrers and UTM campaign parameters. No
custom click, section, download or time-spent tracking is added. Umami's standard
dashboard also provides basic visitor/device statistics without additional code.
Development (`npm run dev`) never loads the tracker. Production exports omit it
until both public settings in `.env.example` are configured. The script loads
after hydration; blocking or losing the analytics service does not block the site.

## Configure the portfolio

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

## Label the links you share

Use consistent, lowercase tags. These examples work on the English or German URL:

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
[metric definitions](https://docs.umami.is/docs/metric-definitions).
