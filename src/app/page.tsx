import Image from "next/image";
import Link from "next/link";
import { ETAPAS } from "@/lib/types";
import { ACTORES_MOCK, LOTES_MOCK, OPORTUNIDADES_MOCK } from "@/lib/mock-data";
import { LoteCard } from "@/components/lote-card";
import { OportunidadCard } from "@/components/oportunidad-card";
import { EtapaIcon } from "@/components/etapa-icon";
import { formatCOP } from "@/lib/format";

export default function Home() {
  const destacados = LOTES_MOCK.slice(0, 3);
  const oportunidadesDestacadas = OPORTUNIDADES_MOCK.slice(0, 3);

  const valorCartera = LOTES_MOCK.reduce((suma, l) => {
    const valor = l.proyectos.length > 0 ? l.proyectos[0].valor_potencial_ventas : l.valor_lote;
    return suma + (valor ?? 0);
  }, 0);
  const stats = [
    { valor: LOTES_MOCK.length.toLocaleString("es-CO"), etiqueta: "Lotes activos" },
    { valor: formatCOP(valorCartera), etiqueta: "Valor en cartera" },
    { valor: OPORTUNIDADES_MOCK.length.toLocaleString("es-CO"), etiqueta: "Oportunidades abiertas" },
    { valor: ACTORES_MOCK.length.toLocaleString("es-CO"), etiqueta: "Actores en la red" },
  ];

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
              href="/oportunidades"
              className="flex h-12 items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Soy arquitecto, constructor, fiduciaria…
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.etiqueta}>
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{stat.valor}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{stat.etiqueta}</p>
            </div>
          ))}
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
                Oportunidades abiertas
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
                El otro lado del marketplace: lo que los proyectos están
                buscando ahora mismo.
              </p>
            </div>
            <Link
              href="/oportunidades"
              className="shrink-0 text-sm font-medium text-[var(--brand)] hover:underline"
            >
              Ver todas →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {oportunidadesDestacadas.map((op) => (
              <OportunidadCard key={op.id} oportunidad={op} />
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
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
            Te acompañamos del lote a la operación
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            No te dejamos solo en ninguna etapa. Desde que postulas el lote
            hasta que el proyecto entra en operación, hay soporte en cada
            paso — con la plataforma, o con el equipo interviniendo
            directamente cuando el proyecto lo amerita.
          </p>
          <div
            className="-mx-6 mt-10 overflow-x-auto px-6 pb-3"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
            }}
          >
            <ol className="relative flex w-max items-center gap-7">
              <div
                aria-hidden
                className="linea-recorrido pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
              />

              <li className="relative z-10 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand)]" />
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-[var(--brand)] px-3 py-1 text-sm font-medium text-[var(--brand-foreground)]">
                  <EtapaIcon id="lote" />
                  Lote
                </span>
              </li>

              {ETAPAS.map((etapa, i) => {
                const esUltima = i === ETAPAS.length - 1;
                return (
                  <li key={etapa.valor} className="relative z-10 flex items-center gap-2">
                    {esUltima && (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand)] opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand)]" />
                      </span>
                    )}
                    <span
                      className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-sm ${
                        esUltima
                          ? "bg-[var(--brand)] font-medium text-[var(--brand-foreground)]"
                          : "border border-[var(--border)] bg-[var(--background)]"
                      }`}
                    >
                      <EtapaIcon id={etapa.valor} />
                      {etapa.etiqueta}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
