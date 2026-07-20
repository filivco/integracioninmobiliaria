"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MODALIDADES_NEGOCIACION, type ModalidadNegociacion } from "@/lib/types";

function slugify(nombre: string) {
  return (
    nombre
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "lote"
  );
}

type Estado = "idle" | "enviando" | "exito" | "error";

export function PublicarLoteForm() {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [areaM2, setAreaM2] = useState("");
  const [valorLote, setValorLote] = useState("");
  const [estadoJuridico, setEstadoJuridico] = useState("");
  const [modalidad, setModalidad] = useState<ModalidadNegociacion | null>(null);
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!modalidad) {
      setErrorMsg("Elige una modalidad de negociación para continuar.");
      setEstado("error");
      return;
    }

    setEstado("enviando");
    setErrorMsg("");

    try {
      const supabase = createClient();
      const { data: lote, error: loteError } = await supabase
        .from("lotes")
        .insert({
          slug: `${slugify(nombre)}-${Date.now().toString(36)}`,
          nombre,
          ubicacion: ubicacion || null,
          area_m2: areaM2 ? Number(areaM2) : null,
          valor_lote: valorLote ? Number(valorLote) : null,
          estado_juridico: estadoJuridico || null,
        })
        .select()
        .single();

      if (loteError) throw loteError;

      const { error: proyectoError } = await supabase.from("proyectos").insert({
        lote_id: lote.id,
        modalidad_negociacion: modalidad,
      });

      if (proyectoError) throw proyectoError;

      setEstado("exito");
      setNombre("");
      setUbicacion("");
      setAreaM2("");
      setValorLote("");
      setEstadoJuridico("");
      setModalidad(null);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "No se pudo publicar el lote.",
      );
      setEstado("error");
    }
  }

  if (estado === "exito") {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center">
        <p className="text-lg font-medium">¡Lote publicado!</p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Nuestro equipo revisará la información y se pondrá en contacto
          contigo para avanzar a la etapa de viabilidad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <fieldset className="flex flex-col gap-6">
        <legend className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
          Datos del lote
        </legend>

        <label className="flex flex-col gap-2 text-sm">
          Nombre del lote
          <input
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Lote El Manantial"
            className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 outline-none focus:border-[var(--brand)]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          Ubicación
          <input
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            placeholder="Ciudad, departamento"
            className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 outline-none focus:border-[var(--brand)]"
          />
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            Área (m²)
            <input
              type="number"
              min="0"
              value={areaM2}
              onChange={(e) => setAreaM2(e.target.value)}
              placeholder="Ej. 5000"
              className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 outline-none focus:border-[var(--brand)]"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            Valor del lote (COP)
            <input
              type="number"
              min="0"
              value={valorLote}
              onChange={(e) => setValorLote(e.target.value)}
              placeholder="Ej. 1200000000"
              className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 outline-none focus:border-[var(--brand)]"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm sm:col-span-2">
            Estado jurídico
            <input
              value={estadoJuridico}
              onChange={(e) => setEstadoJuridico(e.target.value)}
              placeholder="Ej. Escriturado, sin gravámenes"
              className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 outline-none focus:border-[var(--brand)]"
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="text-sm font-medium uppercase tracking-wide text-[var(--muted)]">
          Modalidad de negociación
        </legend>

        <div className="grid gap-4 sm:grid-cols-3">
          {MODALIDADES_NEGOCIACION.map((m) => {
            const selected = modalidad === m.valor;
            return (
              <button
                key={m.valor}
                type="button"
                onClick={() => setModalidad(m.valor)}
                aria-pressed={selected}
                className={`flex flex-col items-start gap-2 rounded-2xl border-2 px-5 py-6 text-left transition-colors ${
                  selected
                    ? "border-[var(--brand)] bg-[var(--brand)] text-[var(--brand-foreground)]"
                    : "border-[var(--border)] hover:border-[var(--brand)]"
                }`}
              >
                <span className="text-base font-semibold uppercase tracking-wide">
                  {m.etiqueta}
                </span>
                <span
                  className={`text-sm leading-5 ${
                    selected ? "opacity-80" : "text-[var(--muted)]"
                  }`}
                >
                  {m.descripcion}
                </span>
              </button>
            );
          })}
        </div>

        <a
          href="#tutorial-modalidades"
          className="flex w-fit items-center gap-2 text-sm text-[var(--muted)] underline underline-offset-4 hover:text-foreground"
        >
          ▶ Ver tutorial en video: cómo elegir tu modalidad
        </a>
      </fieldset>

      {errorMsg && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--brand)] px-6 text-sm font-medium text-[var(--brand-foreground)] transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-fit"
      >
        {estado === "enviando" ? "Publicando..." : "Publicar lote"}
      </button>
    </form>
  );
}
