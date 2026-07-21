import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Lote, Proyecto } from "@/lib/types";
import { LOTES_MOCK, type LoteMock } from "@/lib/mock-data";
import { MapaLotes } from "@/components/mapa-lotes";

export const metadata: Metadata = {
  title: "Mapa de oportunidades — IntegracionInmobiliaria.com",
};

type LoteConProyectos = Lote & { proyectos: Proyecto[] };

async function getLotes(): Promise<LoteMock[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("lotes")
      .select("*, proyectos(*)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return LOTES_MOCK;

    return (data as LoteConProyectos[]).map((lote) => ({
      ...lote,
      imagenes: ["/mock/generico.svg"],
      documentos: [],
      proyectos: lote.proyectos.map((p) => ({ ...p, oportunidades: [] })),
    }));
  } catch {
    return LOTES_MOCK;
  }
}

export default async function MapaPage() {
  const lotes = await getLotes();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Mapa de oportunidades
        </h1>
        <p className="max-w-2xl text-[var(--muted)]">
          Explora los lotes por ubicación. Los puntos naranjas son
          proyectos siniestrados — oportunidades de rescate.
        </p>
      </div>

      <MapaLotes lotes={lotes} />
    </div>
  );
}
