import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";

const links = [
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/rescate", label: "Rescate", destacado: true },
  { href: "/etapas", label: "Etapas" },
  { href: "/como-funciona", label: "Cómo funciona" },
];

const lotesSubmenu = [
  { href: "/lotes", label: "Lotes y proyectos" },
  { href: "/mapa", label: "Mapa de oportunidades" },
];

function LotesDropdown() {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickFuera(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    }
    document.addEventListener("mousedown", onClickFuera);
    return () => document.removeEventListener("mousedown", onClickFuera);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setAbierto(true)}
      onMouseLeave={() => setAbierto(false)}
    >
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        className="flex items-center gap-1 transition-colors hover:text-foreground"
        aria-expanded={abierto}
      >
        Lotes y proyectos
        <svg
          className={`h-3.5 w-3.5 transition-transform ${abierto ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {abierto && (
        <div className="absolute left-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] shadow-lg">
          {lotesSubmenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setAbierto(false)}
              className="flex px-4 py-3 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

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

        <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] lg:flex">
          <LotesDropdown />
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
