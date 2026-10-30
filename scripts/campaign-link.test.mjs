import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { campaignLink } from "./campaign-link.mjs";

const tags = { source: "application", medium: "email", campaign: "role-01" };

test("generates a shareable portfolio URL", () => {
  assert.equal(
    campaignLink(tags),
    "https://brunopinto.net/?utm_source=application&utm_medium=email&utm_campaign=role-01",
  );
});

test("replaces old tags, encodes values and preserves German path, other queries and anchor", () => {
  const url = new URL(
    campaignLink({
      ...tags,
      url: "https://brunopinto.net/de/?view=list&utm_source=old&utm_source=duplicate&utm_content=stale#work",
      campaign: " Zürich & Java / 01 ",
      content: "CV link",
    }),
  );
  assert.equal(url.pathname, "/de/");
  assert.equal(url.hash, "#work");
  assert.equal(url.searchParams.get("view"), "list");
  assert.deepEqual(url.searchParams.getAll("utm_source"), ["application"]);
  assert.equal(url.searchParams.get("utm_campaign"), "Zürich & Java / 01");
  assert.equal(url.searchParams.get("utm_content"), "CV link");
  assert.equal(url.searchParams.has("utm_term"), false);
});

test("rejects missing tags, invalid destinations and unknown command options", () => {
  for (const name of ["source", "medium", "campaign"]) {
    assert.throws(() => campaignLink({ ...tags, [name]: " " }), /is required/);
  }
  for (const url of [
    "not a URL",
    "javascript:alert(1)",
    "http://brunopinto.net",
    "https://user:password@example.com/",
  ]) {
    assert.throws(() => campaignLink({ ...tags, url }));
  }
  const result = spawnSync(
    process.execPath,
    ["scripts/campaign-link.mjs", "--sorce", "linkedin"],
    { encoding: "utf8" },
  );
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unknown option/);
  assert.equal(result.stdout, "");
});
