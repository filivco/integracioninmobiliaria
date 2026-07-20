import Link from "next/link";
import { ROLES_ACTOR, type Actor } from "@/lib/types";
import { ORGANIZACIONES_MOCK } from "@/lib/mock-data";
import { VerificacionBadge } from "@/components/verificacion-badge";

export function ActorCard({ actor }: { actor: Actor }) {
  const rol = ROLES_ACTOR.find((r) => r.valor === actor.rol);
  const organizacion = ORGANIZACIONES_MOCK.find((o) => o.id === actor.organizacion_id);
  const esPropietario = actor.rol === "propietario";
  const esConfidencial = esPropietario && actor.estado_verificacion === "confidencial";

  return (
    <Link
      href={`/actores/${actor.id}`}
      className="flex flex-col gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm transition-colors hover:border-[var(--brand)]"
    >
      <span className="font-medium">
        {esConfidencial ? "Propietario confidencial" : actor.nombre}
      </span>
      <span className="text-[var(--muted)]">
        {rol?.etiqueta ?? actor.rol}
        {organizacion && !esConfidencial && ` — ${organizacion.nombre}`}
      </span>
      {esPropietario && (
        <VerificacionBadge estado={actor.estado_verificacion} />
      )}
    </Link>
  );
}
