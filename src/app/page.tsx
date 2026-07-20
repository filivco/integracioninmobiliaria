import Image from "next/image";
import Link from "next/link";
import { ETAPAS } from "@/lib/types";
import { LOTES_MOCK, NECESIDADES_MOCK } from "@/lib/mock-data";
import { LoteCard } from "@/components/lote-card";
import { NecesidadCard } from "@/components/necesidad-card";

export default function Home() {
  const destacados = LOTES_MOCK.slice(0, 3);
  const necesidadesDestacadas = NECESIDADES_MOCK.slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/mock/hero-caribe.svg"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-32 text-white sm:py-40">
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Donde los lotes se convierten en proyectos inmobiliarios.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-white/85">
            Conectamos lotes en Colombia y el Caribe con las etapas y los
            actores que necesita un proyecto para avanzar: viabilidad,
            diseño, financiamiento, constructores, fiduciarias y
            comercialización.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/publicar-lote"
              className="flex h-12 items-center justify-center rounded-full bg-[var(--brand)] px-6 text-sm font-medium text-[var(--brand-foreground)] transition-opacity hover:opacity-90"
            >
              Tengo un lote
            </Link>
            <Link
              href="/necesidades"
              className="flex h-12 items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Soy arquitecto, constructor, fiduciaria…
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
              Lotes destacados
            </h2>
            <Link
              href="/lotes"
              className="text-sm font-medium text-[var(--brand)] hover:underline"
            >
              Ver todos →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destacados.map((lote) => (
              <LoteCard key={lote.id} lote={lote} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
                Necesidades abiertas
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
                El otro lado del marketplace: lo que los proyectos están
                buscando ahora mismo.
              </p>
            </div>
            <Link
              href="/necesidades"
              className="shrink-0 text-sm font-medium text-[var(--brand)] hover:underline"
            >
              Ver todas →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {necesidadesDestacadas.map((n) => (
              <NecesidadCard key={n.id} necesidad={n} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
            Qué es (y qué no es)
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-medium">Una plataforma tecnológica</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Organiza información, colaboración y seguimiento del
                proyecto. Escala, bajo margen por transacción.
              </p>
            </div>
            <div>
              <p className="font-medium">Y un negocio de estructuración</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                El equipo interviene directamente en proyectos de alto valor:
                consecución de aliados, capital y comercialización. Calidad
                sobre cantidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
            Ciclo de vida de un proyecto
          </h2>
          <ol className="mt-6 flex flex-wrap gap-2 text-sm">
            {ETAPAS.map((etapa, i) => (
              <li key={etapa.valor} className="flex items-center gap-2">
                <span className="rounded-full border border-[var(--border)] px-3 py-1">
                  {etapa.etiqueta}
                </span>
                {i < ETAPAS.length - 1 && (
                  <span className="text-[var(--muted)]">→</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
