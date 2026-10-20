import type { Metadata } from "next";
import "../globals.css";
import "../portfolio.css";
export const metadata: Metadata = {
  title: "Bruno Pinto da Silva | Softwareentwickler",
  description:
    "Softwareentwickler und Informatikstudent an der ZHAW in Zürich. PHP, Java und digitale Produktentwicklung.",
  alternates: { languages: { en: "/", de: "/de/" } },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
