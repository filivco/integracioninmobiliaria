import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CAPACIDADES_INTERVENCION, ORGANIZACIONES_MOCK, ACTORES_MOCK, INTERVENCIONES_MOCK, LOTES_MOCK } from "@/lib/mock-data";
import { ROLES_ACTOR } from "@/lib/types";
import { LoteCard } from "@/components/lote-card";

function getActor(id: string) {
  return ACTORES_MOCK.find((a) => a.id === id) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const actor = getActor(id);
  return { title: actor ? `${actor.nombre} — IntegracionInmobiliaria.com` : "Actor no encontrado" };
}

export default async function ActorPerfilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const actor = getActor(id);

  if (!actor) notFound();

  const rol = ROLES_ACTOR.find((r) => r.valor === actor.rol);
  const organizacion = ORGANIZACIONES_MOCK.find((o) => o.id === actor.organizacion_id);
  const lotesPublicados = LOTES_MOCK.filter((l) => l.propietario_id === actor.id);
  const intervenciones = INTERVENCIONES_MOCK.filter((i) => i.integrador_id === actor.id);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{actor.nombre}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          {rol && (
            <span className="rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-medium text-[var(--brand-foreground)]">
              {rol.etiqueta}
            </span>
          )}
          {organizacion && <span>{organizacion.nombre}</span>}
        </div>
      </div>

      {intervenciones.length > 0 && (
        <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
            Intervenciones activas
          </h2>
          <ul className="flex flex-col gap-3">
            {intervenciones.map((iv) => {
              const lote = LOTES_MOCK.find((l) =>
                l.proyectos.some((p) => p.id === iv.proyecto_id),
              );
              const capacidad = CAPACIDADES_INTERVENCION.find((c) => c.valor === iv.capacidad);
              return (
                <li
                  key={iv.id}
                  className="flex flex-col gap-2 rounded-xl border border-[var(--border)] px-4 py-4 text-sm"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-medium text-[var(--brand-foreground)]">
                      {capacidad?.etiqueta ?? iv.capacidad}
                    </span>
                    {lote && (
                      <Link
                        href={`/lotes/${lote.slug}`}
                        className="font-medium text-[var(--brand)] hover:underline"
                      >
                        {lote.nombre}
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

      {lotesPublicados.length > 0 && (
        <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
            Lotes publicados
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lotesPublicados.map((lote) => (
              <li key={lote.id}>
                <LoteCard lote={lote} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href="/actores"
        className="text-sm font-medium text-[var(--brand)] hover:underline"
      >
        ← Ver todos los actores
      </Link>
    </div>
  );
}
