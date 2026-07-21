import { ETAPAS, type EtapaProyecto } from "@/lib/types";

export function EtapaTimeline({ etapaActual }: { etapaActual: EtapaProyecto }) {
  const indiceActual = ETAPAS.findIndex((e) => e.valor === etapaActual);
  const etiquetaActual = ETAPAS[indiceActual]?.etiqueta ?? etapaActual;
  const progreso = ((indiceActual + 1) / ETAPAS.length) * 100;

  return (
    <div className="flex flex-col gap-2.5">
      {/* Label + posición */}
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-[var(--brand)]">
          {etiquetaActual}
        </span>
        <span className="text-xs text-[var(--muted)]">
          Etapa {indiceActual + 1} de {ETAPAS.length}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
        <div
          className="h-full rounded-full bg-[var(--brand)] transition-all duration-500"
          style={{ width: `${progreso}%` }}
        />
      </div>

      {/* Puntos con tooltip */}
      <div className="flex justify-between">
        {ETAPAS.map((etapa, i) => {
          const completada = i < indiceActual;
          const activa = i === indiceActual;
          return (
            <div key={etapa.valor} className="group relative flex flex-col items-center">
              <div
                className={`h-2 w-2 rounded-full transition-colors ${
                  activa
                    ? "bg-[var(--brand)] ring-2 ring-[var(--brand)] ring-offset-1 ring-offset-[var(--background)]"
                    : completada
                    ? "bg-[var(--brand)]"
                    : "bg-[var(--border)]"
                }`}
              />
              {/* Tooltip */}
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-xs text-[var(--background)] opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                {etapa.etiqueta}
                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-foreground" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
