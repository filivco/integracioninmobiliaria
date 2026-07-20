import Link from "next/link";
import { ETAPAS } from "@/lib/types";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start gap-8 px-6 py-32">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Donde los lotes se convierten en proyectos inmobiliarios.
        </h1>
        <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          IntegracionInmobiliaria.com conecta lotes con las etapas y los
          actores que necesita un proyecto para avanzar: viabilidad, diseño,
          financiamiento, constructores, fiduciarias, legal y
          comercialización.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/publicar-lote"
            className="flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Publicar un lote
          </Link>
          <Link
            href="/lotes"
            className="flex h-12 items-center justify-center rounded-full border border-black/10 px-6 text-sm font-medium transition-colors hover:bg-black/[.03] dark:border-white/15 dark:hover:bg-white/[.06]"
          >
            Ver lotes y proyectos
          </Link>
        </div>
      </section>

      <section className="border-t border-black/10 py-20 dark:border-white/10">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Qué es (y qué no es)
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-medium">Una plataforma tecnológica</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Organiza información, colaboración y seguimiento del
                proyecto. Escala, bajo margen por transacción.
              </p>
            </div>
            <div>
              <p className="font-medium">Y un negocio de estructuración</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                El equipo interviene directamente en proyectos de alto valor:
                consecución de aliados, capital y comercialización. Calidad
                sobre cantidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 py-20 dark:border-white/10">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Ciclo de vida de un proyecto
          </h2>
          <ol className="mt-6 flex flex-wrap gap-2 text-sm">
            {ETAPAS.map((etapa, i) => (
              <li key={etapa.valor} className="flex items-center gap-2">
                <span className="rounded-full border border-black/10 px-3 py-1 dark:border-white/15">
                  {etapa.etiqueta}
                </span>
                {i < ETAPAS.length - 1 && (
                  <span className="text-zinc-400">→</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
