import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ETAPAS, MODALIDADES_NEGOCIACION, type Lote, type Necesidad, type Proyecto } from "@/lib/types";
import { ROLES_ACTOR } from "@/lib/types";

type LoteDetalle = Lote & {
  proyectos: (Proyecto & { necesidades: Necesidad[] })[];
};

async function getLote(slug: string): Promise<LoteDetalle | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("lotes")
      .select("*, proyectos(*, necesidades(*))")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data as LoteDetalle;
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

  const proyecto = lote.proyectos?.[0];
  const etapa = ETAPAS.find((e) => e.valor === proyecto?.etapa);
  const modalidad = MODALIDADES_NEGOCIACION.find(
    (m) => m.valor === proyecto?.modalidad_negociacion,
  );

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{lote.nombre}</h1>
        {lote.ubicacion && (
          <p className="text-zinc-600 dark:text-zinc-400">{lote.ubicacion}</p>
        )}
        <div className="flex flex-wrap gap-2 pt-2 text-xs">
          {etapa && (
            <span className="rounded-full border border-black/10 px-3 py-1 dark:border-white/15">
              {etapa.etiqueta}
            </span>
          )}
          {modalidad && (
            <span className="rounded-full border border-black/10 px-3 py-1 dark:border-white/15">
              {modalidad.etiqueta}
            </span>
          )}
        </div>
      </div>

      <dl className="grid gap-6 border-t border-black/10 pt-8 sm:grid-cols-2 dark:border-white/10">
        {lote.area_m2 != null && (
          <div>
            <dt className="text-sm text-zinc-500">Área</dt>
            <dd className="mt-1">{lote.area_m2} m²</dd>
          </div>
        )}
        {lote.estado_juridico && (
          <div>
            <dt className="text-sm text-zinc-500">Estado jurídico</dt>
            <dd className="mt-1">{lote.estado_juridico}</dd>
          </div>
        )}
      </dl>

      <div className="flex flex-col gap-4 border-t border-black/10 pt-8 dark:border-white/10">
        <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          Necesidades abiertas
        </h2>
        {proyecto?.necesidades?.length ? (
          <ul className="flex flex-col gap-3">
            {proyecto.necesidades.map((n) => (
              <li
                key={n.id}
                className="rounded-xl border border-black/10 px-4 py-3 text-sm dark:border-white/15"
              >
                <span className="font-medium">
                  {ROLES_ACTOR.find((r) => r.valor === n.tipo)?.etiqueta ?? n.tipo}
                </span>
                {n.descripcion && (
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {" "}
                    — {n.descripcion}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500">No hay necesidades abiertas por ahora.</p>
        )}
      </div>
    </div>
  );
}
