import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "LeadChat", template: "%s · LeadChat" },
  description: "An AI chat widget that talks to website visitors and qualifies them as leads.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border px-4 py-4 text-center text-xs text-muted">
          LeadChat · FlyRank Frontend AI Engineering capstone
        </footer>
      </body>
    </html>
  );
}
