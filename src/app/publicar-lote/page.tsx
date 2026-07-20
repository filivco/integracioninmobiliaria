import type { Metadata } from "next";
import { PublicarLoteForm } from "./publicar-lote-form";

export const metadata: Metadata = {
  title: "Publicar lote — IntegracionInmobiliaria.com",
};

export default function PublicarLotePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Publica tu lote
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Cuéntanos sobre tu lote y cómo quieres participar en el proyecto.
          Nuestro equipo lo revisa y lo pasa a la etapa de viabilidad.
        </p>
      </div>

      <PublicarLoteForm />

      <div
        id="tutorial-modalidades"
        className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-black/15 px-6 py-8 dark:border-white/20"
      >
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          Tutorial en video
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Video explicando las tres modalidades de negociación — próximamente.
        </p>
        <button
          type="button"
          disabled
          className="flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm text-zinc-500 dark:border-white/20"
        >
          ▶ Ver tutorial (próximamente)
        </button>
      </div>
    </div>
  );
}
