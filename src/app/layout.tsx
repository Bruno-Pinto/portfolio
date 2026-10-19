import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Bruno Pinto | Software Developer",
  description: "Software Developer and Computer Science student at ZHAW in Zurich, Switzerland.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
