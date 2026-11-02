import { parseArgs } from "node:util";
import { pathToFileURL } from "node:url";

export function campaignLink({
  url = "https://brunopinto.net/",
  source,
  medium,
  campaign,
  content,
  term,
}) {
  const link = new URL(url);
  if (link.protocol !== "https:" || link.username || link.password) {
    throw new Error("Use an HTTPS destination without credentials.");
  }
  for (const [name, value] of Object.entries({ source, medium, campaign })) {
    if (!value?.trim()) throw new Error(`--${name} is required.`);
  }
  // Replace existing campaign tags, preserving unrelated query parameters/hash.
  for (const name of ["source", "medium", "campaign", "content", "term"]) {
    link.searchParams.delete(`utm_${name}`);
  }
  for (const [name, value] of Object.entries({
    source,
    medium,
    campaign,
    content,
    term,
  })) {
    if (value?.trim()) link.searchParams.set(`utm_${name}`, value.trim());
  }
  return link.href;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    const { values } = parseArgs({
      options: {
        url: { type: "string" },
        source: { type: "string" },
        medium: { type: "string" },
        campaign: { type: "string" },
        content: { type: "string" },
        term: { type: "string" },
        help: { type: "boolean" },
      },
    });
    console.log(
      values.help
        ? "npm run campaign -- --source linkedin --medium social --campaign post-01 [--url https://brunopinto.net/de/] [--content text-link] [--term keyword]"
        : campaignLink(values),
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
