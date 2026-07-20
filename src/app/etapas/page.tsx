import type { Metadata } from "next";
import { ETAPAS } from "@/lib/types";

export const metadata: Metadata = {
  title: "Etapas — IntegracionInmobiliaria.com",
};

const DESCRIPCIONES: Record<string, string> = {
  captacion: "El propietario postula el lote y define su modalidad de negociación.",
  viabilidad: "Se evalúa si el lote tiene potencial para un proyecto inmobiliario.",
  prefactibilidad: "Análisis preliminar de mercado, normativa y modelo de negocio.",
  factibilidad: "Estudio detallado que confirma la conveniencia técnica y financiera.",
  diseno: "Arquitectura e ingeniería definen el proyecto a construir.",
  licencia: "Trámite y obtención de la licencia de construcción.",
  comercializacion: "Preventa y ventas del proyecto a compradores finales.",
  construccion: "Ejecución de la obra.",
  operacion: "El proyecto entra en operación o se entrega a sus propietarios.",
};

export default function EtapasPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Etapas del ciclo de vida
        </h1>
        <p className="text-[var(--muted)]">
          Todo proyecto avanza por estas etapas, desde que se capta el lote
          hasta que el proyecto entra en operación.
        </p>
      </div>

      <ol className="flex flex-col gap-6 border-t border-[var(--border)] pt-8">
        {ETAPAS.map((etapa, i) => (
          <li key={etapa.valor} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-sm">
              {i + 1}
            </span>
            <div>
              <p className="font-medium">{etapa.etiqueta}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {DESCRIPCIONES[etapa.valor]}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
