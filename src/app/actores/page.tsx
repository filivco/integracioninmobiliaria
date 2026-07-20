import type { Metadata } from "next";
import { ROLES_ACTOR } from "@/lib/types";

export const metadata: Metadata = {
  title: "Actores — IntegracionInmobiliaria.com",
};

export default function ActoresPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Directorio de actores
        </h1>
        <p className="text-[var(--muted)]">
          Un proyecto necesita distintos roles en distintas etapas. Estos son
          los actores que participan en la plataforma.
        </p>
      </div>

      <ul className="grid gap-4 border-t border-[var(--border)] pt-8 sm:grid-cols-2">
        {ROLES_ACTOR.map((rol) => (
          <li
            key={rol.valor}
            className="rounded-xl border border-[var(--border)] px-4 py-3 text-sm"
          >
            {rol.etiqueta}
          </li>
        ))}
      </ul>
    </div>
  );
}
