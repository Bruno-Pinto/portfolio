import Script from "next/script";

// Static exports bake these public settings into the build, including Docker builds.
export function TrafficAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  const src = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL?.trim();
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();
  if (!src && !websiteId) return null;
  if (!src || !websiteId) {
    throw new Error(
      "Set both NEXT_PUBLIC_UMAMI_SCRIPT_URL and NEXT_PUBLIC_UMAMI_WEBSITE_ID, or leave both empty.",
    );
  }
  const url = new URL(src);
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error(
      "NEXT_PUBLIC_UMAMI_SCRIPT_URL must be a public HTTPS URL without credentials.",
    );
  }

  return (
    <Script
      id="portfolio-traffic-analytics"
      src={src}
      strategy="afterInteractive"
      data-website-id={websiteId}
      data-domains={
        process.env.NEXT_PUBLIC_UMAMI_DOMAINS?.trim() ||
        "brunopinto.net,www.brunopinto.net"
      }
      data-exclude-hash="true"
      data-do-not-track="true"
    />
  );
}
