import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ETAPAS, MODALIDADES_NEGOCIACION, ROLES_ACTOR } from "@/lib/types";
import type { Lote, Necesidad, Proyecto } from "@/lib/types";
import { LOTES_MOCK, type LoteMock } from "@/lib/mock-data";

type LoteDetalleDB = Lote & {
  proyectos: (Proyecto & { necesidades: Necesidad[] })[];
};

async function getLote(slug: string): Promise<LoteMock | null> {
  const mock = LOTES_MOCK.find((l) => l.slug === slug);
  if (mock) return mock;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("lotes")
      .select("*, proyectos(*, necesidades(*))")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    const lote = data as LoteDetalleDB;
    return {
      ...lote,
      imagenes: ["/mock/generico.svg"],
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

  const proyecto = lote.proyectos?.[0];
  const etapa = ETAPAS.find((e) => e.valor === proyecto?.etapa);
  const modalidad = MODALIDADES_NEGOCIACION.find(
    (m) => m.valor === proyecto?.modalidad_negociacion,
  );

  return (
    <div className="flex flex-col">
      <div className="grid gap-1 sm:h-[420px] sm:grid-cols-4 sm:grid-rows-2">
        {lote.imagenes.slice(0, 3).map((src, i) => (
          <div
            key={src}
            className={`relative h-56 sm:h-full ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
          >
            <Image src={src} alt={lote.nombre} fill sizes="50vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-14">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{lote.nombre}</h1>
          {lote.ubicacion && (
            <p className="text-[var(--muted)]">{lote.ubicacion}</p>
          )}
          <div className="flex flex-wrap gap-2 pt-2 text-xs">
            {etapa && (
              <span className="rounded-full border border-[var(--border)] px-3 py-1">
                {etapa.etiqueta}
              </span>
            )}
            {modalidad && (
              <span className="rounded-full bg-[var(--brand)] px-3 py-1 font-medium text-[var(--brand-foreground)]">
                {modalidad.etiqueta}
              </span>
            )}
          </div>
        </div>

        <dl className="grid gap-6 border-t border-[var(--border)] pt-8 sm:grid-cols-2">
          {lote.area_m2 != null && (
            <div>
              <dt className="text-sm text-[var(--muted)]">Área</dt>
              <dd className="mt-1">{lote.area_m2.toLocaleString("es-CO")} m²</dd>
            </div>
          )}
          {lote.estado_juridico && (
            <div>
              <dt className="text-sm text-[var(--muted)]">Estado jurídico</dt>
              <dd className="mt-1">{lote.estado_juridico}</dd>
            </div>
          )}
          {lote.restricciones && (
            <div className="sm:col-span-2">
              <dt className="text-sm text-[var(--muted)]">Restricciones</dt>
              <dd className="mt-1">{lote.restricciones}</dd>
            </div>
          )}
        </dl>

        <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-8">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
            Necesidades abiertas
          </h2>
          {proyecto?.necesidades?.length ? (
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

        <Link
          href="/lotes"
          className="text-sm font-medium text-[var(--brand)] hover:underline"
        >
          ← Ver todos los lotes
        </Link>
      </div>
    </div>
  );
}
