import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Chat" },
  { href: "/leads", label: "Leads" },
  { href: "/settings", label: "Settings" },
  { href: "/health", label: "Health" },
];

export default function Nav() {
  return (
    <header className="border-b border-border bg-surface">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3">
        <Link href="/" className="mr-auto font-semibold tracking-tight">
          LeadChat
        </Link>
        {links.slice(1).map((l) => (
          <Link key={l.href} href={l.href} className="text-sm text-muted hover:text-foreground">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
