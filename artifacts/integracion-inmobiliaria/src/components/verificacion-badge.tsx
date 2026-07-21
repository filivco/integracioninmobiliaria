import { ESTADOS_VERIFICACION, type EstadoVerificacion } from "@/lib/types";

const ESTILOS: Record<EstadoVerificacion, string> = {
  verificado: "bg-[var(--brand)] text-[var(--brand-foreground)]",
  en_revision: "border border-[var(--border)] text-[var(--muted)]",
  confidencial: "border border-dashed border-[var(--border)] text-[var(--muted)]",
};

export function VerificacionBadge({ estado }: { estado: EstadoVerificacion }) {
  const etiqueta = ESTADOS_VERIFICACION.find((e) => e.valor === estado)?.etiqueta ?? estado;

  return (
    <span className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${ESTILOS[estado]}`}>
      {etiqueta}
    </span>
  );
}
