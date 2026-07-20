import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cómo funciona — IntegracionInmobiliaria.com",
};

export default function ComoFuncionaPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Cómo funciona
        </h1>
      </div>

      <div className="flex flex-col gap-8 border-t border-black/10 pt-8 dark:border-white/10">
        <div>
          <p className="font-medium">Para propietarios</p>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Postulas tu lote, eliges cómo quieres participar en el negocio
            (solo venta, aporte o mixto) y sigues el avance del proyecto por
            cada etapa: viabilidad, diseño, licencia, comercialización y
            construcción.
          </p>
        </div>
        <div>
          <p className="font-medium">Para actores del sector</p>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Navegas el catálogo de proyectos y cubres las necesidades
            puntuales que se abren en cada etapa: arquitectura, construcción,
            financiamiento, fiducia, comercialización, entre otras.
          </p>
        </div>
        <div>
          <p className="font-medium">Para el equipo de IntegracionInmobiliaria</p>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            En proyectos de alto valor, el equipo puede tomar una
            intervención o mandato completo: estructuración, consecución de
            aliados, capital o comercialización.
          </p>
        </div>
      </div>
    </div>
  );
}
