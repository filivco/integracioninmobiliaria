import Link from "next/link";
import { ROLES_ACTOR, type Actor } from "@/lib/types";
import { ORGANIZACIONES_MOCK } from "@/lib/mock-data";

export function ActorCard({ actor }: { actor: Actor }) {
  const rol = ROLES_ACTOR.find((r) => r.valor === actor.rol);
  const organizacion = ORGANIZACIONES_MOCK.find((o) => o.id === actor.organizacion_id);

  return (
    <Link
      href={`/actores/${actor.id}`}
      className="flex flex-col gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm transition-colors hover:border-[var(--brand)]"
    >
      <span className="font-medium">{actor.nombre}</span>
      <span className="text-[var(--muted)]">
        {rol?.etiqueta ?? actor.rol}
        {organizacion && ` — ${organizacion.nombre}`}
      </span>
    </Link>
  );
}
