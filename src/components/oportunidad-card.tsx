import Link from "next/link";
import { ETAPAS, ROLES_ACTOR } from "@/lib/types";
import type { OportunidadConLote } from "@/lib/mock-data";

export function OportunidadCard({ oportunidad }: { oportunidad: OportunidadConLote }) {
  const rol = ROLES_ACTOR.find((r) => r.valor === oportunidad.tipo);
  const etapa = ETAPAS.find((e) => e.valor === oportunidad.etapa);

  return (
    <Link
      href={`/lotes/${oportunidad.lote.slug}`}
      className="flex h-full flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-shadow hover:shadow-lg hover:shadow-black/5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-medium text-[var(--brand-foreground)]">
          {rol?.etiqueta ?? oportunidad.tipo}
        </span>
        {etapa && (
          <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs">
            {etapa.etiqueta}
          </span>
        )}
      </div>
      {oportunidad.descripcion && (
        <p className="text-sm leading-6">{oportunidad.descripcion}</p>
      )}
      <div className="mt-auto pt-2 text-sm text-[var(--muted)]">
        {oportunidad.lote.nombre}
        {oportunidad.lote.ubicacion && ` — ${oportunidad.lote.ubicacion}`}
      </div>
    </Link>
  );
}
