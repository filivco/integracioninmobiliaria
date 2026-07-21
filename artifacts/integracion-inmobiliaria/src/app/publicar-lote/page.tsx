import { PublicarLoteForm } from "./publicar-lote-form";

export default function PublicarLotePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Publica tu lote o proyecto
        </h1>
        <p className="text-[var(--muted)]">
          Cuéntanos sobre tu lote, en qué etapa está tu proyecto (aunque ya
          tengas diseño, licencia u obra en curso) y cómo quieres participar.
          Nuestro equipo lo revisa y te acompaña desde ahí.
        </p>
      </div>

      <PublicarLoteForm />

      <div
        id="tutorial-modalidades"
        className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-[var(--border)] px-6 py-8"
      >
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
          Tutorial en video
        </p>
        <p className="text-sm text-[var(--muted)]">
          Video explicando las tres modalidades de negociación — próximamente.
        </p>
        <button
          type="button"
          disabled
          className="flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)]"
        >
          ▶ Ver tutorial (próximamente)
        </button>
      </div>
    </div>
  );
}
