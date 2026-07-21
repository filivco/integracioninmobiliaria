import { ETAPAS, type EtapaProyecto } from "@/lib/types";

export function EtapaTimeline({ etapaActual }: { etapaActual: EtapaProyecto }) {
  const indiceActual = ETAPAS.findIndex((e) => e.valor === etapaActual);

  return (
    <ol className="flex flex-wrap gap-x-1 gap-y-3">
      {ETAPAS.map((etapa, i) => {
        const estado =
          i < indiceActual ? "completada" : i === indiceActual ? "activa" : "pendiente";
        return (
          <li key={etapa.valor} className="flex items-center gap-1">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                estado === "activa"
                  ? "bg-[var(--brand)] text-[var(--brand-foreground)]"
                  : estado === "completada"
                    ? "border border-[var(--brand)] text-[var(--brand)]"
                    : "border border-[var(--border)] text-[var(--muted)]"
              }`}
            >
              {etapa.etiqueta}
            </span>
            {i < ETAPAS.length - 1 && (
              <span className="text-[var(--border)]">—</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
