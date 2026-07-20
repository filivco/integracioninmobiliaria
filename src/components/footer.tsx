import Link from "next/link";

const links = [
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-10 text-sm text-zinc-500 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} IntegracionInmobiliaria.com</p>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
