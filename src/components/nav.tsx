import Link from "next/link";

const links = [
  { href: "/lotes", label: "Lotes" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/rescate", label: "Rescate", destacado: true },
  { href: "/etapas", label: "Etapas" },
  { href: "/actores", label: "Actores" },
  { href: "/como-funciona", label: "Cómo funciona" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand)] text-sm font-bold text-[var(--brand-foreground)]">
            II
          </span>
          <span className="text-sm font-semibold tracking-tight">
            IntegracionInmobiliaria<span className="text-[var(--muted)]">.com</span>
          </span>
        </Link>
        <nav className="hidden gap-6 text-sm text-[var(--muted)] lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-foreground ${
                link.destacado ? "font-medium text-[var(--accent)]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/publicar-lote"
          className="whitespace-nowrap rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-medium text-[var(--brand-foreground)] transition-opacity hover:opacity-90"
        >
          Publicar lote o proyecto
        </Link>
      </div>
    </header>
  );
}
