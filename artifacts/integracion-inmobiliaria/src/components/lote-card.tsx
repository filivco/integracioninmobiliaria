import { Link } from "wouter";
import { ETAPAS, MODALIDADES_NEGOCIACION } from "@/lib/types";
import type { LoteMock } from "@/lib/mock-data";
import { formatCOP } from "@/lib/format";
import { SiniestradoBadge } from "@/components/siniestrado-badge";

export function LoteCard({ lote }: { lote: LoteMock }) {
  const proyecto = lote.proyectos[0];
  const tieneProyecto = lote.proyectos.length > 0;
  const siniestrado = proyecto?.situacion === "siniestrado";
  const etapa = ETAPAS.find((e) => e.valor === proyecto?.etapa);
  const modalidad = MODALIDADES_NEGOCIACION.find(
    (m) => m.valor === proyecto?.modalidad_negociacion,
  );

  return (
    <Link
      href={`/lotes/${lote.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-shadow hover:shadow-lg hover:shadow-black/5"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
        <img
          src={lote.imagenes[0]}
          alt={lote.nombre}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {etapa && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--surface)]/90 px-3 py-1 text-xs font-medium backdrop-blur">
            {etapa.etiqueta}
          </span>
        )}
        {siniestrado && (
          <span className="absolute right-3 top-3">
            <SiniestradoBadge />
          </span>
        )}
        {!tieneProyecto && (
          <span className="absolute right-3 top-3 rounded-full bg-[var(--surface)]/90 px-3 py-1 text-xs font-medium backdrop-blur">
            En venta
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="font-medium leading-snug">{lote.nombre}</p>
        {lote.ubicacion && (
          <p className="text-sm text-[var(--muted)]">{lote.ubicacion}</p>
        )}
        <div className="flex items-end gap-4">
          {!tieneProyecto && lote.valor_lote != null && (
            <div>
              <p className="text-xs text-[var(--muted)]">Valor del lote</p>
              <p className="text-lg font-semibold">{formatCOP(lote.valor_lote)}</p>
            </div>
          )}
          {tieneProyecto && proyecto?.valor_potencial_ventas != null && (
            <div>
              <p className="text-xs text-[var(--muted)]">Potencial de ventas</p>
              <p className="text-lg font-semibold text-[var(--brand)]">
                {formatCOP(proyecto.valor_potencial_ventas)}
              </p>
            </div>
          )}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-3 text-xs">
          {lote.area_m2 != null && (
            <span className="rounded-full border border-[var(--border)] px-3 py-1">
              {lote.area_m2.toLocaleString("es-CO")} m²
            </span>
          )}
          {modalidad && (
            <span className="rounded-full bg-[var(--brand)] px-3 py-1 font-medium text-[var(--brand-foreground)]">
              {modalidad.etiqueta}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
