"use client";

import { useState } from "react";
import { Link } from "wouter";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { ETAPAS } from "@/lib/types";
import type { LoteMock } from "@/lib/mock-data";
import { formatCOP } from "@/lib/format";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export function MapaLotes({ lotes }: { lotes: LoteMock[] }) {
  const [seleccionado, setSeleccionado] = useState<LoteMock | null>(null);

  const conCoordenadas = lotes.filter(
    (l) => l.latitud != null && l.longitud != null,
  );

  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex h-[600px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--border)] px-6 text-center">
        <p className="font-medium">El mapa no está configurado todavía.</p>
        <p className="max-w-sm text-sm text-[var(--muted)]">
          Falta la variable de entorno VITE_MAPBOX_TOKEN con un token
          público de Mapbox.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-[var(--border)]">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: -75.2, latitude: 10.6, zoom: 5.3 }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        style={{ width: "100%", height: "100%" }}
      >
        {conCoordenadas.map((lote) => {
          const proyecto = lote.proyectos[0];
          const siniestrado = proyecto?.situacion === "siniestrado";
          return (
            <Marker
              key={lote.id}
              longitude={lote.longitud!}
              latitude={lote.latitud!}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSeleccionado(lote);
              }}
            >
              <button
                type="button"
                aria-label={lote.nombre}
                className={`h-4 w-4 cursor-pointer rounded-full border-2 border-white shadow ${
                  siniestrado ? "bg-[var(--accent)]" : "bg-[var(--brand)]"
                }`}
              />
            </Marker>
          );
        })}

        {seleccionado && seleccionado.latitud != null && seleccionado.longitud != null && (
          <Popup
            longitude={seleccionado.longitud}
            latitude={seleccionado.latitud}
            anchor="top"
            onClose={() => setSeleccionado(null)}
            closeButton
            closeOnClick={false}
          >
            <div className="flex w-56 flex-col gap-2 p-1 text-sm">
              <p className="font-medium text-[var(--foreground)]">{seleccionado.nombre}</p>
              {seleccionado.ubicacion && (
                <p className="text-[var(--muted)]">{seleccionado.ubicacion}</p>
              )}
              <div className="flex flex-wrap gap-1">
                {(() => {
                  const proyecto = seleccionado.proyectos[0];
                  const etapa = ETAPAS.find((e) => e.valor === proyecto?.etapa);
                  return (
                    <>
                      {etapa && (
                        <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs">
                          {etapa.etiqueta}
                        </span>
                      )}
                      {proyecto?.valor_potencial_ventas != null && (
                        <span className="rounded-full bg-[var(--brand)] px-2 py-0.5 text-xs font-medium text-[var(--brand-foreground)]">
                          {formatCOP(proyecto.valor_potencial_ventas)}
                        </span>
                      )}
                    </>
                  );
                })()}
              </div>
              <Link
                href={`/lotes/${seleccionado.slug}`}
                className="text-xs font-medium text-[var(--brand)] hover:underline"
              >
                Ver detalle →
              </Link>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
