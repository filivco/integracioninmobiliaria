import { useState, useEffect } from "react";
import { Link } from "wouter";
import { createClient } from "@/lib/supabase/client";
import { MODALIDADES_NEGOCIACION, ROLES_ACTOR } from "@/lib/types";
import type { Actor, Documento, Lote, Oportunidad, Proyecto } from "@/lib/types";
import { ACTORES_MOCK, CAPACIDADES_INTERVENCION, INTERVENCIONES_MOCK, LOTES_MOCK, construirHistorico, type LoteMock } from "@/lib/mock-data";
import { EtapaTimeline } from "@/components/etapa-timeline";
import { EventoTimeline } from "@/components/evento-timeline";
import { VerificacionBadge } from "@/components/verificacion-badge";
import { formatCOP } from "@/lib/format";

type LoteDetalle = LoteMock & { propietario: Actor | null };

type LoteDetalleDB = Lote & {
  proyectos: (Proyecto & { oportunidades: Oportunidad[] })[];
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
    const supabase = createClient();
    const { data, error } = await supabase
      .from("lotes")
      .select("*, proyectos(*, oportunidades(*)), documentos(*), propietario:actores!propietario_id(*)")
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

export default function LoteDetallePage({ slug }: { slug: string }) {
  const [lote, setLote] = useState<LoteDetalle | null | undefined>(undefined);

  useEffect(() => {
    getLote(slug).then(setLote);
  }, [slug]);

  if (lote === undefined) {
    return (
      <div className="mx-auto flex w-full max-w-6xl px-6 py-20">
        <p className="text-[var(--muted)]">Cargando…</p>
      </div>
    );
  }

  if (!lote) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">Lote no encontrado</h1>
        <p className="text-[var(--muted)]">El lote que buscas no existe o fue eliminado.</p>
        <Link href="/lotes" className="w-fit text-sm font-medium text-[var(--brand)] hover:underline">
          ← Ver todos los lotes
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="grid gap-1 sm:h-[380px] sm:grid-cols-4 sm:grid-rows-2">
        {lote.imagenes.slice(0, 3).map((src, i) => (
          <div
            key={src}
            className={`relative h-56 sm:h-full overflow-hidden bg-black/5 ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
          >
            <img src={src} alt={lote.nombre} className="h-full w-full object-cover" />
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
                {proyecto.situacion === "siniestrado" && (
                  <div className="flex flex-col gap-1 rounded-xl border border-[var(--accent)] bg-[var(--accent)]/10 px-4 py-3">
                    <p className="text-sm font-medium text-[var(--accent)]">
                      Proyecto siniestrado — oportunidad de rescate
                    </p>
                    {proyecto.motivo_siniestro && (
                      <p className="text-sm text-[var(--muted)]">{proyecto.motivo_siniestro}</p>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
                    Etapa actual
                  </h2>
                  <EtapaTimeline etapaActual={proyecto.etapa} />
                </div>

                {modalidad && (
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-medium text-[var(--brand-foreground)]">
                      {modalidad.etiqueta}
                    </span>
                    {proyecto.valor_potencial_ventas != null && (
                      <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs">
                        Potencial: {formatCOP(proyecto.valor_potencial_ventas)}
                      </span>
                    )}
                  </div>
                )}

                {proyecto.oportunidades && proyecto.oportunidades.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-medium text-[var(--muted)]">
                      Oportunidades abiertas
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {proyecto.oportunidades.map((op) => {
                        const rol = ROLES_ACTOR.find((r) => r.valor === op.tipo);
                        return (
                          <li
                            key={op.id}
                            className="flex flex-col gap-1 rounded-xl border border-[var(--border)] px-4 py-3 text-sm"
                          >
                            <span className="rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-medium text-[var(--brand-foreground)] w-fit">
                              {rol?.etiqueta ?? op.tipo}
                            </span>
                            {op.descripcion && (
                              <p className="text-[var(--muted)]">{op.descripcion}</p>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {INTERVENCIONES_MOCK.filter((iv) => iv.proyecto_id === proyecto.id).length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-medium text-[var(--muted)]">
                      Intervención
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {INTERVENCIONES_MOCK.filter((iv) => iv.proyecto_id === proyecto.id).map((iv) => {
                        const integrador = ACTORES_MOCK.find((a) => a.id === iv.integrador_id);
                        const capacidad = CAPACIDADES_INTERVENCION.find((c) => c.valor === iv.capacidad);
                        return (
                          <li
                            key={iv.id}
                            className="flex flex-col gap-2 rounded-xl border border-[var(--brand)] bg-[var(--brand)]/5 px-4 py-3 text-sm"
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-medium text-[var(--brand-foreground)]">
                                {capacidad?.etiqueta ?? iv.capacidad}
                              </span>
                              {integrador && (
                                <Link
                                  href={`/actores/${integrador.id}`}
                                  className="font-medium text-[var(--brand)] hover:underline"
                                >
                                  {integrador.nombre}
                                </Link>
                              )}
                            </div>
                            {iv.terminos && (
                              <p className="text-[var(--muted)]">{iv.terminos}</p>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
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

          <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-8">
            <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
              Actividad
            </h2>
            <EventoTimeline eventos={construirHistorico(lote)} />
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
              {lote.proyectos.length === 0 && lote.valor_lote != null && (
                <div>
                  <dt className="text-[var(--muted)]">Valor del lote</dt>
                  <dd className="mt-1 text-base font-semibold">{formatCOP(lote.valor_lote)}</dd>
                </div>
              )}
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
            <div className="flex flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
                Propietario
              </h2>
              {lote.propietario.estado_verificacion === "confidencial" ? (
                <p className="mt-2 text-sm font-medium">Propietario confidencial</p>
              ) : (
                <Link
                  href={`/actores/${lote.propietario.id}`}
                  className="mt-2 text-sm font-medium text-[var(--brand)] hover:underline"
                >
                  {lote.propietario.nombre}
                </Link>
              )}
              <VerificacionBadge estado={lote.propietario.estado_verificacion} />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
