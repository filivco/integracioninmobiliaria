import Link from "next/link";

const links = [
  { href: "/lotes", label: "Lotes" },
  { href: "/etapas", label: "Etapas" },
  { href: "/actores", label: "Actores" },
  { href: "/como-funciona", label: "Cómo funciona" },
];

export function Nav() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          IntegracionInmobiliaria<span className="text-zinc-400">.com</span>
        </Link>
        <nav className="hidden gap-8 text-sm text-zinc-600 dark:text-zinc-400 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/publicar-lote"
          className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Publicar lote
        </Link>
      </div>
    </header>
  );
}
