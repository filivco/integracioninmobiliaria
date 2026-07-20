import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Lote, Proyecto } from "@/lib/types";
import { LOTES_MOCK, type LoteMock } from "@/lib/mock-data";
import { LotesExplorer } from "./lotes-explorer";

export const metadata: Metadata = {
  title: "Lotes — IntegracionInmobiliaria.com",
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
      proyectos: lote.proyectos.map((p) => ({ ...p, necesidades: [] })),
    }));
  } catch {
    return LOTES_MOCK;
  }
}

export default async function LotesPage() {
  const lotes = await getLotes();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Lotes y proyectos
        </h1>
        <p className="text-[var(--muted)]">
          Catálogo de lotes postulados y sus proyectos asociados.
        </p>
      </div>

      <LotesExplorer lotes={lotes} />
    </div>
  );
}
