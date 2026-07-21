import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { LOTES_MOCK, type LoteMock } from "@/lib/mock-data";
import { LotesExplorer } from "./lotes-explorer";

export default function LotesPage() {
  const [lotes, setLotes] = useState<LoteMock[]>(LOTES_MOCK);

  useEffect(() => {
    async function fetchLotes() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("lotes")
          .select("*, proyectos(*)")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (!data || data.length === 0) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setLotes((data as any[]).map((lote) => ({
          ...lote,
          imagenes: ["/mock/generico.svg"],
          documentos: [],
          proyectos: lote.proyectos.map((p: Record<string, unknown>) => ({ ...p, oportunidades: [] })),
        })));
      } catch {
        // keep mock data on error
      }
    }
    fetchLotes();
  }, []);

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
