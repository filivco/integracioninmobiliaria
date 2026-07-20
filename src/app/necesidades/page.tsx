import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { NECESIDADES_MOCK, type NecesidadConLote } from "@/lib/mock-data";
import { NecesidadesExplorer } from "./necesidades-explorer";

export const metadata: Metadata = {
  title: "Necesidades abiertas — IntegracionInmobiliaria.com",
};

type NecesidadDB = {
  id: string;
  proyecto_id: string;
  tipo: NecesidadConLote["tipo"];
  descripcion: string | null;
  estado: string;
  created_at: string;
  proyectos: {
    etapa: NecesidadConLote["etapa"];
    lotes: { id: string; slug: string; nombre: string; ubicacion: string | null };
  };
};

async function getNecesidades(): Promise<NecesidadConLote[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("necesidades")
      .select("*, proyectos(etapa, lotes(id, slug, nombre, ubicacion))")
      .eq("estado", "abierta")
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return NECESIDADES_MOCK;

    return (data as unknown as NecesidadDB[]).map((n) => ({
      id: n.id,
      proyecto_id: n.proyecto_id,
      tipo: n.tipo,
      descripcion: n.descripcion,
      estado: n.estado,
      created_at: n.created_at,
      etapa: n.proyectos.etapa,
      lote: n.proyectos.lotes,
    }));
  } catch {
    return NECESIDADES_MOCK;
  }
}

export default async function NecesidadesPage() {
  const necesidades = await getNecesidades();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Necesidades abiertas
        </h1>
        <p className="text-[var(--muted)]">
          Esto es el otro lado del marketplace: lo que los proyectos están
          buscando ahora mismo — arquitectos, constructores, fiduciarias,
          bancos, comercializadores y más. Encuentra dónde encajas y postula.
        </p>
      </div>

      <NecesidadesExplorer necesidades={necesidades} />
    </div>
  );
}
