import Image from "next/image";

const logos: Record<
  string,
  { file: string; mono?: boolean; wordmark?: boolean }
> = {
  PHP: { file: "php" },
  Java: { file: "java" },
  JUnit: { file: "junit" },
  TypeScript: { file: "typescript" },
  React: { file: "react" },
  "Next.js": { file: "nextjs" },
  "Tailwind CSS": { file: "tailwindcss" },
  Git: { file: "git" },
  "GitLab CI/CD": { file: "gitlab" },
  GitHub: { file: "github", mono: true },
  Gradle: { file: "gradle", mono: true },
  Docker: { file: "docker" },
  Nginx: { file: "nginx", wordmark: true },
  Linux: { file: "linux" },
  "Windows Server": { file: "windows8" },
  "Bubble.io": { file: "bubble", mono: true },
  XANO: { file: "xano", wordmark: true },
};

export function TechnologyIcon({ name }: { name: string }) {
  const logo = logos[name];
  if (logo)
    return (
      <Image
        className="technology-logo"
        data-mono={logo.mono || undefined}
        data-wordmark={logo.wordmark || undefined}
        src={"/images/technologies/" + logo.file + ".svg"}
        alt=""
        width={28}
        height={28}
      />
    );
  return (
    <svg
      className="technology-logo"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
    >
      {name === "SQL" ? (
        <>
          <ellipse cx="14" cy="6" rx="9" ry="3" />
          <path d="M5 6v15c0 4 18 4 18 0V6M5 13c0 4 18 4 18 0" />
        </>
      ) : name === "Active Directory" ? (
        <>
          <path d="M14 9v5M5 19v-5h18v5" />
          <path d="M10 3h8v6h-8zM2 19h7v6H2zM11 19h6v6h-6zM19 19h7v6h-7z" />
        </>
      ) : name === "ITSM" ? (
        <>
          <path d="M4 5h20v18H4zM9 10h10M9 15h10M9 20h6" />
        </>
      ) : (
        <>
          <path d="M3 4h22v17H3zM3 9h22M10 25h8M14 21v4M7 6.5h1M10 6.5h1" />
        </>
      )}
    </svg>
  );
}

export function CategoryIcon({ category }: { category: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
    >
      {category === "backend" ? (
        <path d="M4 3h16v7H4zM4 14h16v7H4zM7 6.5h1M7 17.5h1M11 6.5h6M11 17.5h6" />
      ) : category === "frontend" ? (
        <path d="M3 3h18v18H3zM3 8h18M9 8v13" />
      ) : category === "desktop" ? (
        <path d="M2 3h20v14H2zM12 17v4M7 21h10M6 8l3 3-3 3M12 13h5" />
      ) : category === "workflow" ? (
        <path d="M6 4v12M18 8v3c0 4-12 1-12 5M3 1h6v6H3zM15 3h6v6h-6zM3 16h6v6H3z" />
      ) : (
        <path d="M3 5h18v14H3zM7 2v6M17 2v6M7 12h4M7 16h10" />
      )}
    </svg>
  );
}
