import type { Metadata } from "next";
import "../globals.css";
export const metadata: Metadata = {
  title: "Bruno Pinto da Silva | Software Developer",
  description:
    "Software Developer and Computer Science student at ZHAW in Zurich. PHP, Java and digital product development.",
  alternates: { languages: { en: "/", de: "/de/" } },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
