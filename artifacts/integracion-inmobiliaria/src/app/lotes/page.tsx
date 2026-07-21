import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { LOTES_MOCK, type LoteMock } from "@/lib/mock-data";
import { formatCOP } from "@/lib/format";
import { LotesExplorer } from "./lotes-explorer";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-sm text-[var(--muted)]">{label}</p>
    </div>
  );
}

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
          proyectos: lote.proyectos.map((p: Record<string, unknown>) => ({
            ...p,
            oportunidades: [],
          })),
        })));
      } catch {
        // keep mock data on error
      }
    }
    fetchLotes();
  }, []);

  // Stats del mercado
  const potencialTotal = useMemo(
    () =>
      lotes.reduce(
        (sum, l) => sum + (l.proyectos[0]?.valor_potencial_ventas ?? 0),
        0,
      ),
    [lotes],
  );

  const ciudadesCount = useMemo(
    () =>
      new Set(
        lotes.map((l) => l.ubicacion?.split(",")[0].trim()).filter(Boolean),
      ).size,
    [lotes],
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
      {/* Encabezado con stats */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Marketplace de lotes y proyectos
          </h1>
          <p className="max-w-xl text-[var(--muted)]">
            Conectamos terrenos con potencial a los actores que los convierten en
            proyectos inmobiliarios exitosos.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-5">
          <StatCard label="lotes publicados" value={String(lotes.length)} />
          <div className="w-px self-stretch bg-[var(--border)]" />
          <StatCard
            label="en potencial de ventas"
            value={`$${(potencialTotal / 1_000_000_000).toFixed(0)} B`}
          />
          <div className="w-px self-stretch bg-[var(--border)]" />
          <StatCard
            label="ciudades representadas"
            value={String(ciudadesCount)}
          />
          <div className="w-px self-stretch bg-[var(--border)]" />
          <StatCard
            label="oportunidades abiertas"
            value={String(
              lotes.flatMap((l) =>
                l.proyectos.flatMap((p) =>
                  p.oportunidades.filter((o) => o.estado === "abierta"),
                ),
              ).length,
            )}
          />
        </div>
      </div>

      <LotesExplorer lotes={lotes} />
    </div>
  );
}
