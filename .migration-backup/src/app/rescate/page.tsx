import type { Metadata } from "next";
import { LOTES_MOCK } from "@/lib/mock-data";
import { RescateCard } from "@/components/rescate-card";

export const metadata: Metadata = {
  title: "Proyectos para rescatar — IntegracionInmobiliaria.com",
};

export default function RescatePage() {
  const proyectosSiniestrados = LOTES_MOCK.filter((lote) =>
    lote.proyectos.some((p) => p.situacion === "siniestrado"),
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Proyectos para rescatar
        </h1>
        <p className="max-w-2xl text-[var(--muted)]">
          Obra parada, promotor insolvente, litigio societario, licencia
          vencida — proyectos con potencial real que quedaron detenidos.
          Esta es la capa de negocio: el Integrador entra a estructurar,
          conseguir aliados o capital para reactivarlos.
        </p>
      </div>

      {proyectosSiniestrados.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] px-6 py-16 text-center">
          <p className="text-[var(--muted)]">
            No hay proyectos siniestrados registrados por ahora.
          </p>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {proyectosSiniestrados.map((lote) => (
            <li key={lote.id}>
              <RescateCard lote={lote} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
