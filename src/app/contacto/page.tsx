import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto — IntegracionInmobiliaria.com",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Contacto</h1>
      <p className="text-[var(--muted)]">
        ¿Tienes un lote o quieres participar en un proyecto? Escríbenos.
      </p>
      <a
        href="mailto:hola@integracioninmobiliaria.com"
        className="flex h-12 w-fit items-center justify-center rounded-full bg-[var(--brand)] px-6 text-sm font-medium text-[var(--brand-foreground)] hover:opacity-90"
      >
        hola@integracioninmobiliaria.com
      </a>

      <dl className="flex flex-col gap-4 border-t border-[var(--border)] pt-8 text-sm">
        <div>
          <dt className="text-[var(--muted)]">Teléfono</dt>
          <dd className="mt-1">
            <a href="tel:+573504080808" className="hover:text-[var(--brand)]">
              +57 350 4080808
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Dirección</dt>
          <dd className="mt-1">
            Calle 90 # 11-44, Oficina 407
            <br />
            Ed. Santorini — Bogotá, CO 110121
          </dd>
        </div>
      </dl>
    </div>
  );
}
