import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";

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

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Dropdown de escritorio — hover + clic */
function LotesDropdown({ location }: { location: string }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = location.startsWith("/lotes") || location === "/mapa";

  // Cierre con timeout para que el mouse pueda cruzar el gap visual
  function onEnter() {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function onLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  // Cierre al hacer clic fuera
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 transition-colors hover:text-foreground ${
          isActive ? "font-medium text-[var(--brand)]" : ""
        }`}
        aria-expanded={open}
      >
        Lotes y proyectos
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-20 pt-2"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <div className="w-52 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] shadow-lg">
            {lotesSubmenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex px-4 py-3 text-sm transition-colors hover:bg-[var(--surface)] hover:text-foreground ${
                  location === item.href
                    ? "font-medium text-[var(--brand)]"
                    : "text-[var(--muted)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Drawer móvil */
function MobileDrawer({
  open,
  onClose,
  location,
}: {
  open: boolean;
  onClose: () => void;
  location: string;
}) {
  const [lotesOpen, setLotesOpen] = useState(false);
  const isLotesActive = location.startsWith("/lotes") || location === "/mapa";

  // Bloquear scroll del body mientras está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="absolute bottom-0 right-0 top-0 flex w-72 max-w-[85vw] flex-col bg-[var(--background)] shadow-2xl">
        {/* Cabecera del drawer */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <span className="text-sm font-semibold">Menú</span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-foreground"
            aria-label="Cerrar menú"
          >
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
              <path d="M1 1l12 12M13 1L1 13" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {/* Lotes submenu colapsable */}
          <div>
            <button
              type="button"
              onClick={() => setLotesOpen((v) => !v)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--surface)] ${
                isLotesActive
                  ? "text-[var(--brand)]"
                  : "text-[var(--muted)] hover:text-foreground"
              }`}
            >
              Lotes y proyectos
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${lotesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {lotesOpen && (
              <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-[var(--border)] pl-3">
                {lotesSubmenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[var(--surface)] ${
                      location === item.href
                        ? "font-medium text-[var(--brand)]"
                        : "text-[var(--muted)] hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Links principales */}
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--surface)] ${
                location === link.href
                  ? "text-[var(--brand)]"
                  : link.destacado
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="border-t border-[var(--border)] px-4 py-4">
          <Link
            href="/publicar-lote"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-full bg-[var(--brand)] px-4 py-2.5 text-sm font-medium text-[var(--brand-foreground)] transition-opacity hover:opacity-90"
          >
            Publicar lote o proyecto
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Nav() {
  const [location] = useLocation();
  const [drawerAbierto, setDrawerAbierto] = useState(false);

  // Cerrar drawer al cambiar de ruta
  useEffect(() => {
    setDrawerAbierto(false);
  }, [location]);

  return (
    <>
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

          {/* Nav desktop */}
          <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] lg:flex">
            <LotesDropdown location={location} />
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-foreground ${
                  location === link.href
                    ? "font-medium text-[var(--brand)]"
                    : link.destacado
                    ? "font-medium text-[var(--accent)]"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* CTA desktop */}
            <Link
              href="/publicar-lote"
              className="hidden whitespace-nowrap rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-medium text-[var(--brand-foreground)] transition-opacity hover:opacity-90 lg:block"
            >
              Publicar lote o proyecto
            </Link>

            {/* Botón hamburguesa móvil */}
            <button
              type="button"
              onClick={() => setDrawerAbierto(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-foreground lg:hidden"
              aria-label="Abrir menú"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path d="M2 4h12M2 8h12M2 12h12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={drawerAbierto}
        onClose={() => setDrawerAbierto(false)}
        location={location}
      />
    </>
  );
}
