import Image from "next/image";
import Link from "next/link";
import { ETAPAS } from "@/lib/types";
import type { LoteMock } from "@/lib/mock-data";
import { formatCOP } from "@/lib/format";
import { SiniestradoBadge } from "@/components/siniestrado-badge";

export function RescateCard({ lote }: { lote: LoteMock }) {
  const proyecto = lote.proyectos[0];
  const etapa = ETAPAS.find((e) => e.valor === proyecto?.etapa);

  return (
    <Link
      href={`/lotes/${lote.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-shadow hover:shadow-lg hover:shadow-black/5"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
        <Image
          src={lote.imagenes[0]}
          alt={lote.nombre}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3">
          <SiniestradoBadge />
        </span>
        {etapa && (
          <span className="absolute right-3 top-3 rounded-full bg-[var(--surface)]/90 px-3 py-1 text-xs font-medium backdrop-blur">
            Detenido en {etapa.etiqueta}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="font-medium leading-snug">{lote.nombre}</p>
          {lote.ubicacion && (
            <p className="text-sm text-[var(--muted)]">{lote.ubicacion}</p>
          )}
        </div>

        {proyecto?.motivo_siniestro && (
          <p className="text-sm leading-6 text-[var(--muted)]">
            {proyecto.motivo_siniestro}
          </p>
        )}

        {proyecto?.valor_potencial_ventas != null && (
          <div className="mt-auto pt-2">
            <p className="text-xs text-[var(--muted)]">Potencial de ventas</p>
            <p className="text-lg font-semibold text-[var(--brand)]">
              {formatCOP(proyecto.valor_potencial_ventas)}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
