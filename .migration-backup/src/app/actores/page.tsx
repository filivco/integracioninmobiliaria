import type { Metadata } from "next";
import { ROLES_ACTOR } from "@/lib/types";
import { ACTORES_MOCK } from "@/lib/mock-data";
import { ActorCard } from "@/components/actor-card";

export const metadata: Metadata = {
  title: "Actores — IntegracionInmobiliaria.com",
};

export default function ActoresPage() {
  const grupos = ROLES_ACTOR.map((rol) => ({
    rol,
    actores: ACTORES_MOCK.filter((a) => a.rol === rol.valor),
  })).filter((g) => g.actores.length > 0);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Directorio de actores
        </h1>
        <p className="text-[var(--muted)]">
          Un proyecto necesita distintos roles en distintas etapas. Estos son
          los actores que participan en la plataforma.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {grupos.map((grupo) => (
          <div key={grupo.rol.valor} className="flex flex-col gap-4">
            <h2 className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
              {grupo.rol.etiqueta} ({grupo.actores.length})
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {grupo.actores.map((actor) => (
                <li key={actor.id}>
                  <ActorCard actor={actor} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
