"use client";

import { useMemo, useState } from "react";
import { ROLES_ACTOR } from "@/lib/types";
import type { NecesidadConLote } from "@/lib/mock-data";
import { NecesidadCard } from "@/components/necesidad-card";

export function NecesidadesExplorer({
  necesidades,
}: {
  necesidades: NecesidadConLote[];
}) {
  const [busqueda, setBusqueda] = useState("");
  const [tipo, setTipo] = useState("");

  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return necesidades.filter((n) => {
      if (tipo && n.tipo !== tipo) return false;
      if (
        q &&
        !`${n.descripcion ?? ""} ${n.lote.nombre} ${n.lote.ubicacion ?? ""}`
          .toLowerCase()
          .includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [necesidades, busqueda, tipo]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:flex-row">
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por descripción, lote o ubicación"
          className="flex-1 rounded-lg border border-[var(--border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[var(--brand)]"
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[var(--brand)]"
        >
          <option value="">Todos los roles</option>
          {ROLES_ACTOR.map((r) => (
            <option key={r.valor} value={r.valor}>
              {r.etiqueta}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-[var(--muted)]">
        {filtradas.length}{" "}
        {filtradas.length === 1 ? "necesidad abierta" : "necesidades abiertas"}
      </p>

      {filtradas.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] px-6 py-16 text-center">
          <p className="text-[var(--muted)]">
            No hay necesidades que coincidan con esos filtros.
          </p>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((n) => (
            <li key={n.id}>
              <NecesidadCard necesidad={n} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
