import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { MODALIDADES_NEGOCIACION, ROLES_ACTOR } from "@/lib/types";
import type { Actor, Documento, Lote, Necesidad, Proyecto } from "@/lib/types";
import { ACTORES_MOCK, LOTES_MOCK, type LoteMock } from "@/lib/mock-data";
import { EtapaTimeline } from "@/components/etapa-timeline";

type LoteDetalle = LoteMock & { propietario: Actor | null };

type LoteDetalleDB = Lote & {
  proyectos: (Proyecto & { necesidades: Necesidad[] })[];
  documentos: Documento[];
  propietario: Actor | null;
};

async function getLote(slug: string): Promise<LoteDetalle | null> {
  const mock = LOTES_MOCK.find((l) => l.slug === slug);
  if (mock) {
    return {
      ...mock,
      propietario: ACTORES_MOCK.find((a) => a.id === mock.propietario_id) ?? null,
    };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("lotes")
      .select("*, proyectos(*, necesidades(*)), documentos(*), propietario:actores!propietario_id(*)")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    const lote = data as LoteDetalleDB;
    return {
      ...lote,
      imagenes: ["/mock/generico.svg"],
      documentos: lote.documentos ?? [],
      propietario: lote.propietario,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lote = await getLote(slug);
  return { title: lote ? `${lote.nombre} — IntegracionInmobiliaria.com` : "Lote no encontrado" };
}

export default async function LoteDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lote = await getLote(slug);

  if (!lote) notFound();

  return (
    <div className="flex flex-col">
      <div className="grid gap-1 sm:h-[380px] sm:grid-cols-4 sm:grid-rows-2">
        {lote.imagenes.slice(0, 3).map((src, i) => (
          <div
            key={src}
            className={`relative h-56 sm:h-full ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
          >
            <Image src={src} alt={lote.nombre} fill sizes="50vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-14 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">{lote.nombre}</h1>
            {lote.ubicacion && <p className="text-[var(--muted)]">{lote.ubicacion}</p>}
          </div>

          {lote.proyectos.map((proyecto) => {
            const modalidad = MODALIDADES_NEGOCIACION.find(
              (m) => m.valor === proyecto.modalidad_negociacion,
            );
            return (
              <div key={proyecto.id} className="flex flex-col gap-6 border-t border-[var(--border)] pt-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
                    {lote.proyectos.length > 1 ? `Proyecto — ${proyecto.id}` : "Proyecto"}
                  </h2>
                  {modalidad && (
                    <span className="rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-medium text-[var(--brand-foreground)]">
                      {modalidad.etiqueta}
                    </span>
                  )}
                </div>

                <EtapaTimeline etapaActual={proyecto.etapa} />

                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-medium text-[var(--muted)]">
                    Necesidades abiertas
                  </h3>
                  {proyecto.necesidades?.length ? (
                    <ul className="flex flex-col gap-3">
                      {proyecto.necesidades.map((n) => (
                        <li
                          key={n.id}
                          className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm"
                        >
                          <span className="font-medium">
                            {ROLES_ACTOR.find((r) => r.valor === n.tipo)?.etiqueta ?? n.tipo}
                          </span>
                          {n.descripcion && (
                            <span className="text-[var(--muted)]"> — {n.descripcion}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-[var(--muted)]">
                      No hay necesidades abiertas por ahora.
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-8">
            <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
              Documentos
            </h2>
            {lote.documentos.length ? (
              <ul className="flex flex-col gap-2">
                {lote.documentos.map((doc) => (
                  <li key={doc.id}>
                    <a
                      href={doc.url}
                      className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm hover:border-[var(--brand)]"
                    >
                      <span aria-hidden>📄</span>
                      {doc.nombre ?? "Documento"}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-[var(--border)] px-6 py-8">
                <p className="text-sm text-[var(--muted)]">
                  Aún no hay documentos cargados para este lote.
                </p>
                <button
                  type="button"
                  disabled
                  className="flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)]"
                >
                  Subir documento (próximamente)
                </button>
              </div>
            )}
          </div>

          <Link
            href="/lotes"
            className="text-sm font-medium text-[var(--brand)] hover:underline"
          >
            ← Ver todos los lotes
          </Link>
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
              Resumen
            </h2>
            <dl className="flex flex-col gap-4 text-sm">
              {lote.area_m2 != null && (
                <div>
                  <dt className="text-[var(--muted)]">Área</dt>
                  <dd className="mt-1">{lote.area_m2.toLocaleString("es-CO")} m²</dd>
                </div>
              )}
              {lote.estado_juridico && (
                <div>
                  <dt className="text-[var(--muted)]">Estado jurídico</dt>
                  <dd className="mt-1">{lote.estado_juridico}</dd>
                </div>
              )}
              {lote.restricciones && (
                <div>
                  <dt className="text-[var(--muted)]">Restricciones</dt>
                  <dd className="mt-1">{lote.restricciones}</dd>
                </div>
              )}
            </dl>
          </div>

          {lote.propietario && (
            <div className="flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
                Propietario
              </h2>
              <p className="mt-2 text-sm font-medium">{lote.propietario.nombre}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
