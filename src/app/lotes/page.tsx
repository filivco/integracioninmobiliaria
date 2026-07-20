import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ETAPAS, MODALIDADES_NEGOCIACION, type Lote, type Proyecto } from "@/lib/types";

export const metadata: Metadata = {
  title: "Lotes — IntegracionInmobiliaria.com",
};

type LoteConProyectos = Lote & { proyectos: Proyecto[] };

async function getLotes(): Promise<LoteConProyectos[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("lotes")
      .select("*, proyectos(*)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as LoteConProyectos[];
  } catch {
    return [];
  }
}

export default async function LotesPage() {
  const lotes = await getLotes();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Lotes y proyectos
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Catálogo público de lotes postulados y sus proyectos asociados.
        </p>
      </div>

      {lotes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/15 px-6 py-16 text-center dark:border-white/20">
          <p className="text-zinc-600 dark:text-zinc-400">
            Aún no hay lotes publicados.
          </p>
          <Link
            href="/publicar-lote"
            className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background hover:opacity-90"
          >
            Publica el primero
          </Link>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2">
          {lotes.map((lote) => {
            const proyecto = lote.proyectos?.[0];
            const etapa = ETAPAS.find((e) => e.valor === proyecto?.etapa);
            const modalidad = MODALIDADES_NEGOCIACION.find(
              (m) => m.valor === proyecto?.modalidad_negociacion,
            );
            return (
              <li key={lote.id}>
                <Link
                  href={`/lotes/${lote.slug}`}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-black/10 p-6 transition-colors hover:border-black/30 dark:border-white/15 dark:hover:border-white/40"
                >
                  <p className="font-medium">{lote.nombre}</p>
                  {lote.ubicacion && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {lote.ubicacion}
                    </p>
                  )}
                  <div className="mt-auto flex flex-wrap gap-2 pt-2 text-xs">
                    {etapa && (
                      <span className="rounded-full border border-black/10 px-3 py-1 dark:border-white/15">
                        {etapa.etiqueta}
                      </span>
                    )}
                    {modalidad && (
                      <span className="rounded-full border border-black/10 px-3 py-1 dark:border-white/15">
                        {modalidad.etiqueta}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
