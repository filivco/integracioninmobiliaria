import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { OPORTUNIDADES_MOCK, type OportunidadConLote } from "@/lib/mock-data";
import { OportunidadesExplorer } from "./oportunidades-explorer";

export default function OportunidadesPage() {
  const [oportunidades, setOportunidades] = useState<OportunidadConLote[]>(OPORTUNIDADES_MOCK);

  useEffect(() => {
    async function fetchOportunidades() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("oportunidades")
          .select("*, proyectos(etapa, lotes(id, slug, nombre, ubicacion))")
          .eq("estado", "abierta")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (!data || data.length === 0) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setOportunidades((data as any[]).map((op) => ({
          id: op.id,
          proyecto_id: op.proyecto_id,
          tipo: op.tipo,
          descripcion: op.descripcion,
          estado: op.estado,
          created_at: op.created_at,
          etapa: op.proyectos.etapa,
          lote: op.proyectos.lotes,
        })));
      } catch {
        // keep mock data on error
      }
    }
    fetchOportunidades();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Oportunidades abiertas
        </h1>
        <p className="text-[var(--muted)]">
          Esto es el otro lado del marketplace: lo que los proyectos están
          buscando ahora mismo — arquitectos, constructores, fiduciarias,
          bancos, comercializadores y más. Encuentra dónde encajas y postula.
        </p>
      </div>

      <OportunidadesExplorer oportunidades={oportunidades} />
    </div>
  );
}
