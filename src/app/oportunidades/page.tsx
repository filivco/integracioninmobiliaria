import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { OPORTUNIDADES_MOCK, type OportunidadConLote } from "@/lib/mock-data";
import { OportunidadesExplorer } from "./oportunidades-explorer";

export const metadata: Metadata = {
  title: "Oportunidades abiertas — IntegracionInmobiliaria.com",
};

type OportunidadDB = {
  id: string;
  proyecto_id: string;
  tipo: OportunidadConLote["tipo"];
  descripcion: string | null;
  estado: string;
  created_at: string;
  proyectos: {
    etapa: OportunidadConLote["etapa"];
    lotes: { id: string; slug: string; nombre: string; ubicacion: string | null };
  };
};

async function getOportunidades(): Promise<OportunidadConLote[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("oportunidades")
      .select("*, proyectos(etapa, lotes(id, slug, nombre, ubicacion))")
      .eq("estado", "abierta")
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return OPORTUNIDADES_MOCK;

    return (data as unknown as OportunidadDB[]).map((op) => ({
      id: op.id,
      proyecto_id: op.proyecto_id,
      tipo: op.tipo,
      descripcion: op.descripcion,
      estado: op.estado,
      created_at: op.created_at,
      etapa: op.proyectos.etapa,
      lote: op.proyectos.lotes,
    }));
  } catch {
    return OPORTUNIDADES_MOCK;
  }
}

export default async function OportunidadesPage() {
  const oportunidades = await getOportunidades();

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
