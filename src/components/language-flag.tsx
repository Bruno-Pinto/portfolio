export function LanguageFlag({ language }: { language: "en" | "de" }) {
  return (
    <svg
      width="22"
      height="15"
      viewBox="0 0 60 40"
      aria-hidden="true"
      focusable="false"
    >
      {language === "de" ? (
        <>
          <path fill="#161616" d="M0 0h60v14H0z" />
          <path fill="#dc4248" d="M0 14h60v13H0z" />
          <path fill="#efc44d" d="M0 27h60v13H0z" />
        </>
      ) : (
        <>
          <path fill="#234777" d="M0 0h60v40H0z" />
          <path stroke="#fff" strokeWidth="9" d="m0 0 60 40M60 0 0 40" />
          <path stroke="#d94c5c" strokeWidth="3" d="m0 0 60 40M60 0 0 40" />
          <path stroke="#fff" strokeWidth="14" d="M30 0v40M0 20h60" />
          <path stroke="#d94c5c" strokeWidth="8" d="M30 0v40M0 20h60" />
        </>
      )}
    </svg>
  );
}
