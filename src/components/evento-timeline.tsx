import type { Evento } from "@/lib/types";

function formatFecha(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function EventoTimeline({ eventos }: { eventos: Evento[] }) {
  const publicos = eventos.filter((e) => e.visibilidad === "publica");
  const privados = eventos.length - publicos.length;

  if (publicos.length === 0) {
    return (
      <p className="text-sm text-[var(--muted)]">
        Aún no hay actividad registrada para este lote.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ol className="flex flex-col gap-4">
        {publicos.map((evento) => (
          <li key={evento.id} className="flex gap-3 text-sm">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
            <div className="flex flex-col gap-0.5">
              <p>{evento.descripcion}</p>
              <p className="text-xs text-[var(--muted)]">{formatFecha(evento.created_at)}</p>
            </div>
          </li>
        ))}
      </ol>
      {privados > 0 && (
        <p className="text-xs text-[var(--muted)]">
          + {privados} {privados === 1 ? "actualización privada" : "actualizaciones privadas"}{" "}
          visibles solo para el equipo del proyecto.
        </p>
      )}
    </div>
  );
}
