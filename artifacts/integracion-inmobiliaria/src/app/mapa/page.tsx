import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { LOTES_MOCK, type LoteMock } from "@/lib/mock-data";
import { MapaLotes } from "@/components/mapa-lotes";

export default function MapaPage() {
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
