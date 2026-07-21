"use client";

import { useMemo, useState } from "react";
import { ETAPAS, MODALIDADES_NEGOCIACION } from "@/lib/types";
import type { LoteMock } from "@/lib/mock-data";
import { LoteCard } from "@/components/lote-card";

export function LotesExplorer({ lotes }: { lotes: LoteMock[] }) {
  const [busqueda, setBusqueda] = useState("");
  const [etapa, setEtapa] = useState("");
  const [modalidad, setModalidad] = useState("");

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return lotes.filter((lote) => {
      const proyecto = lote.proyectos[0];
      if (q && !`${lote.nombre} ${lote.ubicacion ?? ""}`.toLowerCase().includes(q)) {
        return false;
      }
      if (etapa && proyecto?.etapa !== etapa) return false;
      if (modalidad && proyecto?.modalidad_negociacion !== modalidad) return false;
      return true;
    });
  }, [lotes, busqueda, etapa, modalidad]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:flex-row">
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre o ubicación"
          className="flex-1 rounded-lg border border-[var(--border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[var(--brand)]"
        />
        <select
          value={etapa}
          onChange={(e) => setEtapa(e.target.value)}
          className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[var(--brand)]"
        >
          <option value="">Todas las etapas</option>
          {ETAPAS.map((e) => (
            <option key={e.valor} value={e.valor}>
              {e.etiqueta}
            </option>
          ))}
        </select>
        <select
          value={modalidad}
          onChange={(e) => setModalidad(e.target.value)}
          className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[var(--brand)]"
        >
          <option value="">Toda modalidad</option>
          {MODALIDADES_NEGOCIACION.map((m) => (
            <option key={m.valor} value={m.valor}>
              {m.etiqueta}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-[var(--muted)]">
        {filtrados.length} {filtrados.length === 1 ? "lote encontrado" : "lotes encontrados"}
      </p>

      {filtrados.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] px-6 py-16 text-center">
          <p className="text-[var(--muted)]">
            No hay lotes que coincidan con esos filtros.
          </p>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((lote) => (
            <li key={lote.id}>
              <LoteCard lote={lote} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
