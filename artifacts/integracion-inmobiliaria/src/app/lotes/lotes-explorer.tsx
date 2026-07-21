"use client";

import { useMemo, useState } from "react";
import { ETAPAS, MODALIDADES_NEGOCIACION } from "@/lib/types";
import type { LoteMock } from "@/lib/mock-data";
import { LoteCard } from "@/components/lote-card";

// ── Tipos ────────────────────────────────────────────────────────────────────

type Tab = "todos" | "con_proyecto" | "en_venta";
type Orden = "recientes" | "potencial_desc" | "area_desc" | "valor_asc";

interface Filtros {
  busqueda: string;
  etapas: string[];
  modalidades: string[];
  ciudades: string[];
  area: string; // key de AREA_RANGES o ""
}

const FILTROS_INIT: Filtros = {
  busqueda: "",
  etapas: [],
  modalidades: [],
  ciudades: [],
  area: "",
};

const AREA_RANGES: { key: string; label: string; min: number; max: number }[] = [
  { key: "xs", label: "< 1.000 m²", min: 0, max: 1000 },
  { key: "sm", label: "1.000 – 5.000 m²", min: 1000, max: 5000 },
  { key: "md", label: "5.000 – 15.000 m²", min: 5000, max: 15000 },
  { key: "lg", label: "> 15.000 m²", min: 15000, max: Infinity },
];

const ORDEN_OPTIONS: { value: Orden; label: string }[] = [
  { value: "recientes", label: "Más recientes" },
  { value: "potencial_desc", label: "Mayor potencial" },
  { value: "area_desc", label: "Mayor área" },
  { value: "valor_asc", label: "Menor valor" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function ciudad(ubicacion: string | null): string {
  return ubicacion?.split(",")[0].trim() ?? "";
}

function aplicarFiltros(
  lotes: LoteMock[],
  tab: Tab,
  filtros: Filtros,
  orden: Orden,
): LoteMock[] {
  let result = lotes.filter((lote) => {
    const proyecto = lote.proyectos[0];
    const tieneProyecto = lote.proyectos.length > 0;

    // Tab
    if (tab === "con_proyecto" && !tieneProyecto) return false;
    if (tab === "en_venta" && tieneProyecto) return false;

    // Búsqueda
    if (filtros.busqueda) {
      const q = filtros.busqueda.toLowerCase();
      if (!`${lote.nombre} ${lote.ubicacion ?? ""}`.toLowerCase().includes(q))
        return false;
    }

    // Etapa
    if (filtros.etapas.length > 0 && !filtros.etapas.includes(proyecto?.etapa ?? ""))
      return false;

    // Modalidad
    if (
      filtros.modalidades.length > 0 &&
      !filtros.modalidades.includes(proyecto?.modalidad_negociacion ?? "")
    )
      return false;

    // Ciudad
    if (
      filtros.ciudades.length > 0 &&
      !filtros.ciudades.includes(ciudad(lote.ubicacion))
    )
      return false;

    // Área
    if (filtros.area) {
      const rango = AREA_RANGES.find((r) => r.key === filtros.area);
      if (rango && lote.area_m2 != null) {
        if (lote.area_m2 < rango.min || lote.area_m2 >= rango.max) return false;
      }
    }

    return true;
  });

  // Ordenar
  result = [...result].sort((a, b) => {
    if (orden === "recientes")
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (orden === "potencial_desc")
      return (
        (b.proyectos[0]?.valor_potencial_ventas ?? 0) -
        (a.proyectos[0]?.valor_potencial_ventas ?? 0)
      );
    if (orden === "area_desc") return (b.area_m2 ?? 0) - (a.area_m2 ?? 0);
    if (orden === "valor_asc") return (a.valor_lote ?? 0) - (b.valor_lote ?? 0);
    return 0;
  });

  return result;
}

function contarFiltrosActivos(filtros: Filtros): number {
  return (
    (filtros.busqueda ? 1 : 0) +
    filtros.etapas.length +
    filtros.modalidades.length +
    filtros.ciudades.length +
    (filtros.area ? 1 : 0)
  );
}

// ── Panel de filtros (reutilizable en sidebar y bottom-sheet) ─────────────────

function PanelFiltros({
  filtros,
  setFiltros,
  ciudadesDisponibles,
}: {
  filtros: Filtros;
  setFiltros: (f: Filtros) => void;
  ciudadesDisponibles: string[];
}) {
  function toggleArr(arr: string[], val: string) {
    return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Búsqueda */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
          Buscar
        </label>
        <input
          value={filtros.busqueda}
          onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
          placeholder="Nombre o ubicación"
          className="rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--brand)]"
        />
      </div>

      {/* Etapa */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
          Etapa del proyecto
        </span>
        <div className="flex flex-col gap-1.5">
          {ETAPAS.map((e) => (
            <label key={e.valor} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-[var(--brand)]"
                checked={filtros.etapas.includes(e.valor)}
                onChange={() =>
                  setFiltros({ ...filtros, etapas: toggleArr(filtros.etapas, e.valor) })
                }
              />
              {e.etiqueta}
            </label>
          ))}
        </div>
      </div>

      {/* Modalidad */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
          Modalidad
        </span>
        <div className="flex flex-col gap-1.5">
          {MODALIDADES_NEGOCIACION.map((m) => (
            <label key={m.valor} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-[var(--brand)]"
                checked={filtros.modalidades.includes(m.valor)}
                onChange={() =>
                  setFiltros({
                    ...filtros,
                    modalidades: toggleArr(filtros.modalidades, m.valor),
                  })
                }
              />
              {m.etiqueta}
            </label>
          ))}
        </div>
      </div>

      {/* Ciudad */}
      {ciudadesDisponibles.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Ciudad
          </span>
          <div className="flex max-h-44 flex-col gap-1.5 overflow-y-auto">
            {ciudadesDisponibles.map((c) => (
              <label key={c} className="flex cursor-pointer items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded accent-[var(--brand)]"
                  checked={filtros.ciudades.includes(c)}
                  onChange={() =>
                    setFiltros({ ...filtros, ciudades: toggleArr(filtros.ciudades, c) })
                  }
                />
                {c}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Área */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
          Área del lote
        </span>
        <div className="flex flex-col gap-1.5">
          {AREA_RANGES.map((r) => (
            <label key={r.key} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="radio"
                name="area"
                className="h-4 w-4 accent-[var(--brand)]"
                checked={filtros.area === r.key}
                onChange={() =>
                  setFiltros({
                    ...filtros,
                    area: filtros.area === r.key ? "" : r.key,
                  })
                }
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

export function LotesExplorer({ lotes }: { lotes: LoteMock[] }) {
  const [tab, setTab] = useState<Tab>("todos");
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_INIT);
  const [orden, setOrden] = useState<Orden>("recientes");
  const [sheetAbierto, setSheetAbierto] = useState(false);

  // Ciudades disponibles (derivadas de los lotes, ordenadas)
  const ciudadesDisponibles = useMemo(() => {
    const set = new Set(lotes.map((l) => ciudad(l.ubicacion)).filter(Boolean));
    return [...set].sort();
  }, [lotes]);

  // Conteos para tabs
  const conProyecto = useMemo(() => lotes.filter((l) => l.proyectos.length > 0).length, [lotes]);
  const enVenta = useMemo(() => lotes.filter((l) => l.proyectos.length === 0).length, [lotes]);

  // Resultado filtrado y ordenado
  const filtrados = useMemo(
    () => aplicarFiltros(lotes, tab, filtros, orden),
    [lotes, tab, filtros, orden],
  );

  const nFiltros = contarFiltrosActivos(filtros);

  // Pills de filtros activos
  const pills: { label: string; onRemove: () => void }[] = [];
  if (filtros.busqueda)
    pills.push({ label: `"${filtros.busqueda}"`, onRemove: () => setFiltros({ ...filtros, busqueda: "" }) });
  filtros.etapas.forEach((v) => {
    const e = ETAPAS.find((x) => x.valor === v);
    if (e) pills.push({ label: e.etiqueta, onRemove: () => setFiltros({ ...filtros, etapas: filtros.etapas.filter((x) => x !== v) }) });
  });
  filtros.modalidades.forEach((v) => {
    const m = MODALIDADES_NEGOCIACION.find((x) => x.valor === v);
    if (m) pills.push({ label: m.etiqueta, onRemove: () => setFiltros({ ...filtros, modalidades: filtros.modalidades.filter((x) => x !== v) }) });
  });
  filtros.ciudades.forEach((v) =>
    pills.push({ label: v, onRemove: () => setFiltros({ ...filtros, ciudades: filtros.ciudades.filter((x) => x !== v) }) }),
  );
  if (filtros.area) {
    const r = AREA_RANGES.find((x) => x.key === filtros.area);
    if (r) pills.push({ label: r.label, onRemove: () => setFiltros({ ...filtros, area: "" }) });
  }

  return (
    <div className="flex gap-8">
      {/* ── Sidebar de filtros (desktop) ── */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-24 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-medium">Filtros</span>
            {nFiltros > 0 && (
              <button
                type="button"
                onClick={() => setFiltros(FILTROS_INIT)}
                className="text-xs text-[var(--brand)] hover:underline"
              >
                Limpiar todo
              </button>
            )}
          </div>
          <PanelFiltros
            filtros={filtros}
            setFiltros={setFiltros}
            ciudadesDisponibles={ciudadesDisponibles}
          />
        </div>
      </aside>

      {/* ── Área de resultados ── */}
      <div className="min-w-0 flex-1">
        {/* Tabs */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1">
            {(
              [
                { key: "todos", label: `Todos (${lotes.length})` },
                { key: "con_proyecto", label: `Con proyecto (${conProyecto})` },
                { key: "en_venta", label: `En venta (${enVenta})` },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  tab === t.key
                    ? "bg-[var(--brand)] text-[var(--brand-foreground)]"
                    : "text-[var(--muted)] hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Botón filtrar móvil */}
          <button
            type="button"
            onClick={() => setSheetAbierto(true)}
            className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-foreground lg:hidden"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M2 4h12M4 8h8M6 12h4" strokeLinecap="round" />
            </svg>
            Filtrar{nFiltros > 0 && ` (${nFiltros})`}
          </button>
        </div>

        {/* Sort bar + count + pills */}
        <div className="mb-6 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[var(--muted)]">
              <span className="font-medium text-foreground">{filtrados.length}</span>{" "}
              {filtrados.length === 1 ? "lote encontrado" : "lotes encontrados"}
            </p>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value as Orden)}
              className="rounded-lg border border-[var(--border)] bg-transparent px-3 py-1.5 text-sm text-[var(--muted)] outline-none focus:border-[var(--brand)]"
            >
              {ORDEN_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Pills de filtros activos */}
          {pills.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {pills.map((pill, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs"
                >
                  {pill.label}
                  <button
                    type="button"
                    onClick={pill.onRemove}
                    className="text-[var(--muted)] hover:text-foreground"
                    aria-label={`Quitar filtro ${pill.label}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              {pills.length > 1 && (
                <button
                  type="button"
                  onClick={() => setFiltros(FILTROS_INIT)}
                  className="text-xs text-[var(--brand)] hover:underline"
                >
                  Limpiar todos
                </button>
              )}
            </div>
          )}
        </div>

        {/* Grid */}
        {filtrados.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--border)] px-6 py-20 text-center">
            <p className="text-[var(--muted)]">
              No hay lotes que coincidan con esos filtros.
            </p>
            <button
              type="button"
              onClick={() => { setFiltros(FILTROS_INIT); setTab("todos"); }}
              className="mt-3 text-sm text-[var(--brand)] hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtrados.map((lote) => (
              <li key={lote.id}>
                <LoteCard lote={lote} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Bottom-sheet de filtros (móvil) ── */}
      {sheetAbierto && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSheetAbierto(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-[var(--background)] p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-medium">Filtros</span>
              <button
                type="button"
                onClick={() => setSheetAbierto(false)}
                className="text-sm text-[var(--muted)]"
              >
                Cerrar
              </button>
            </div>
            <PanelFiltros
              filtros={filtros}
              setFiltros={setFiltros}
              ciudadesDisponibles={ciudadesDisponibles}
            />
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setFiltros(FILTROS_INIT)}
                className="flex-1 rounded-full border border-[var(--border)] py-2.5 text-sm font-medium text-[var(--muted)]"
              >
                Limpiar
              </button>
              <button
                type="button"
                onClick={() => setSheetAbierto(false)}
                className="flex-1 rounded-full bg-[var(--brand)] py-2.5 text-sm font-medium text-[var(--brand-foreground)]"
              >
                Ver {filtrados.length} {filtrados.length === 1 ? "lote" : "lotes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
