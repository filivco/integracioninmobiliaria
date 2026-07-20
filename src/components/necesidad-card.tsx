import Link from "next/link";
import { ETAPAS, ROLES_ACTOR } from "@/lib/types";
import type { NecesidadConLote } from "@/lib/mock-data";

export function NecesidadCard({ necesidad }: { necesidad: NecesidadConLote }) {
  const rol = ROLES_ACTOR.find((r) => r.valor === necesidad.tipo);
  const etapa = ETAPAS.find((e) => e.valor === necesidad.etapa);

  return (
    <Link
      href={`/lotes/${necesidad.lote.slug}`}
      className="flex h-full flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-shadow hover:shadow-lg hover:shadow-black/5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-medium text-[var(--brand-foreground)]">
          {rol?.etiqueta ?? necesidad.tipo}
        </span>
        {etapa && (
          <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs">
            {etapa.etiqueta}
          </span>
        )}
      </div>
      {necesidad.descripcion && (
        <p className="text-sm leading-6">{necesidad.descripcion}</p>
      )}
      <div className="mt-auto pt-2 text-sm text-[var(--muted)]">
        {necesidad.lote.nombre}
        {necesidad.lote.ubicacion && ` — ${necesidad.lote.ubicacion}`}
      </div>
    </Link>
  );
}
