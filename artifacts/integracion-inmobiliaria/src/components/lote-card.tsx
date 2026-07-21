import { useState } from "react";
import { Link } from "wouter";
import { ETAPAS, MODALIDADES_NEGOCIACION } from "@/lib/types";
import type { LoteMock } from "@/lib/mock-data";
import { formatCOP } from "@/lib/format";
import { SiniestradoBadge } from "@/components/siniestrado-badge";

// Paleta de gradientes para lotes sin foto
const GRADIENTS = [
  "linear-gradient(135deg, #0a3d30 0%, #0e6e5d 100%)",
  "linear-gradient(135deg, #0e2a3d 0%, #1a5a7a 100%)",
  "linear-gradient(135deg, #2d1b00 0%, #6b4300 100%)",
  "linear-gradient(135deg, #1a0e2a 0%, #4a2a7a 100%)",
  "linear-gradient(135deg, #1a2a0e 0%, #3a5a1a 100%)",
];

function gradiente(id: string) {
  let n = 0;
  for (let i = 0; i < id.length; i++) n += id.charCodeAt(i);
  return GRADIENTS[n % GRADIENTS.length];
}

/** Días transcurridos desde una fecha ISO */
function diasDesde(isoDate: string): number {
  const hoy = new Date();
  const fecha = new Date(isoDate);
  return Math.floor((hoy.getTime() - fecha.getTime()) / 86_400_000);
}

export function LoteCard({ lote }: { lote: LoteMock }) {
  const [imgError, setImgError] = useState(false);
  const proyecto = lote.proyectos[0];
  const tieneProyecto = lote.proyectos.length > 0;
  const siniestrado = proyecto?.situacion === "siniestrado";
  const etapa = ETAPAS.find((e) => e.valor === proyecto?.etapa);
  const modalidad = MODALIDADES_NEGOCIACION.find(
    (m) => m.valor === proyecto?.modalidad_negociacion,
  );
  const esNuevo = diasDesde(lote.created_at) <= 30;
  const oportunidadesAbiertas = lote.proyectos.flatMap((p) =>
    p.oportunidades.filter((o) => o.estado === "abierta"),
  ).length;

  const usaPlaceholder = imgError || !lote.imagenes[0];

  return (
    <Link
      href={`/lotes/${lote.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-shadow hover:shadow-lg hover:shadow-black/5"
    >
      {/* Imagen o degradado */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden"
        style={usaPlaceholder ? { background: gradiente(lote.id) } : undefined}
      >
        {!usaPlaceholder && (
          <img
            src={lote.imagenes[0]}
            alt={lote.nombre}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {usaPlaceholder && (
          <div className="absolute inset-0 flex items-end p-4">
            <span className="text-xs font-medium text-white/60">
              {lote.ubicacion}
            </span>
          </div>
        )}

        {/* Badges superiores izquierda */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {etapa && (
            <span className="rounded-full bg-[var(--surface)]/90 px-3 py-1 text-xs font-medium backdrop-blur">
              {etapa.etiqueta}
            </span>
          )}
          {esNuevo && (
            <span className="rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-medium text-[var(--brand-foreground)]">
              Nuevo
            </span>
          )}
        </div>

        {/* Badges superiores derecha */}
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          {siniestrado && <SiniestradoBadge />}
          {!tieneProyecto && (
            <span className="rounded-full bg-[var(--surface)]/90 px-3 py-1 text-xs font-medium backdrop-blur">
              En venta
            </span>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="font-medium leading-snug">{lote.nombre}</p>
        {lote.ubicacion && (
          <p className="text-sm text-[var(--muted)]">{lote.ubicacion}</p>
        )}

        {/* Valor principal */}
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

        {/* Chips */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-3 text-xs">
          {lote.area_m2 != null && (
            <span className="rounded-full border border-[var(--border)] px-3 py-1">
              {lote.area_m2.toLocaleString("es-CO")} m²
            </span>
          )}
          {modalidad && (
            <span className="rounded-full bg-[var(--brand)]/10 px-3 py-1 font-medium text-[var(--brand)]">
              {modalidad.etiqueta}
            </span>
          )}
          {oportunidadesAbiertas > 0 && (
            <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[var(--muted)]">
              {oportunidadesAbiertas}{" "}
              {oportunidadesAbiertas === 1 ? "oportunidad" : "oportunidades"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
