import type { Locale } from "@/content/portfolio";

// An original diagram inspired by the lake and river, not a geographic map.
export function ZurichGraphic({ locale }: { locale: Locale }) {
  return (
    <figure className="zurich-graphic">
      <svg
        viewBox="0 0 440 230"
        role="img"
        aria-label={
          locale === "en"
            ? "Abstract Zurich lake and river illustration"
            : "Abstrakte Illustration von See und Fluss in Zürich"
        }
      >
        <g fill="none" stroke="#426383" strokeWidth="1" opacity="0.5">
          <path d="M18 50h125l42 35h82l58-45h96M0 110h110l55 36h95l88-28h92M30 190h95l68-30h140l72 35M98 0v58l35 38v76l-25 58M350 0l-30 64v80l35 86" />
          <path d="M25 75h82l58 45h112l65-40h80M46 215l96-41h117l78 25M200 0l-26 44v65M400 0l-43 58v50" />
        </g>
        <path
          d="M217 8l-15 33 8 31-13 27 17 23 22 10 23 28 25 37 33 25 27-5-13-31-30-32-23-30-31-23-25-9-10-21 10-29-8-19 15-24"
          fill="#142f46"
          stroke="#6599c1"
          strokeWidth="1.5"
        />
        <path
          d="m237 137 31 37 28 26"
          fill="none"
          stroke="#89bfd7"
          strokeWidth="1"
          opacity="0.5"
        />
        <g transform="translate(214 111)">
          <circle r="10" fill="#101b26" stroke="#82d9e2" />
          <circle r="3" fill="#82d9e2" />
          <path d="M-26 0h-11M26 0h11M0-26v-11M0 26v11" stroke="#82d9e2" />
        </g>
        <path d="M202 109h-61l-22-22H40" fill="none" stroke="#82d9e2" />
        <text
          x="39"
          y="76"
          fill="#d4e8f1"
          fontFamily="Consolas, monospace"
          fontSize="12"
          letterSpacing="2"
        >
          ZURICH / CH
        </text>
      </svg>
      <figcaption>
        {locale === "en" ? "Zurich, Switzerland" : "Zürich, Schweiz"}
        <span>
          {locale === "en"
            ? "Lake & river / schematic"
            : "See & Fluss / schematisch"}
        </span>
      </figcaption>
    </figure>
  );
}
