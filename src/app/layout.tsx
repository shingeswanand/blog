import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog CMS",
  description: "WordPress-like CMS with Next.js + MongoDB"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
