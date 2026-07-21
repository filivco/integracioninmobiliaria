import Link from "next/link";

const columnas = [
  {
    titulo: "Plataforma",
    links: [
      { href: "/lotes", label: "Lotes" },
      { href: "/oportunidades", label: "Oportunidades" },
      { href: "/etapas", label: "Etapas" },
      { href: "/actores", label: "Actores" },
    ],
  },
  {
    titulo: "Empresa",
    links: [
      { href: "/como-funciona", label: "Cómo funciona" },
      { href: "/sobre-nosotros", label: "Sobre nosotros" },
      { href: "/contacto", label: "Contacto" },
      { href: "/publicar-lote", label: "Publicar lote" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0d1512] text-[#c9d3cf]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand)] text-sm font-bold text-[var(--brand-foreground)]">
              II
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">
              IntegracionInmobiliaria<span className="text-[#c9d3cf]">.com</span>
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-6 text-[#8fa39c]">
            La infraestructura digital donde los lotes se convierten en
            proyectos inmobiliarios. Colombia y el Caribe.
          </p>
        </div>

        {columnas.map((columna) => (
          <div key={columna.titulo} className="flex flex-col gap-3">
            <h3 className="text-xs font-medium uppercase tracking-wide text-[#8fa39c]">
              {columna.titulo}
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              {columna.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-medium uppercase tracking-wide text-[#8fa39c]">
            Contacto
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a
                href="mailto:hola@integracioninmobiliaria.com"
                className="transition-colors hover:text-white"
              >
                hola@integracioninmobiliaria.com
              </a>
            </li>
            <li className="text-[#8fa39c]">Cartagena, Colombia</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-6 text-xs text-[#8fa39c] sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} IntegracionInmobiliaria.com — Todos los derechos reservados.</p>
          <p>Hecho para conectar lotes con quienes los convierten en proyectos.</p>
        </div>
      </div>
    </footer>
  );
}
