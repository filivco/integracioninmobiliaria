import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto — IntegracionInmobiliaria.com",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Contacto</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        ¿Tienes un lote o quieres participar en un proyecto? Escríbenos.
      </p>
      <a
        href="mailto:hola@integracioninmobiliaria.com"
        className="flex h-12 w-fit items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background hover:opacity-90"
      >
        hola@integracioninmobiliaria.com
      </a>
    </div>
  );
}
