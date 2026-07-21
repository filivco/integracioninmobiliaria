import { useMemo, useRef } from "react";
import Map, { Layer, Marker, Source, type MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

/** Calcula el bounding box de un polígono GeoJSON */
function getBounds(rings: [number, number][][]): [[number, number], [number, number]] {
  const pts = rings.flat();
  const lngs = pts.map((c) => c[0]);
  const lats = pts.map((c) => c[1]);
  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ];
}

interface Props {
  latitud?: number | null;
  longitud?: number | null;
  poligono?: [number, number][][] | null;
  nombre: string;
  /** Altura del mapa en px. Por defecto 260. */
  altura?: number;
}

export function MapaLote({ latitud, longitud, poligono, nombre, altura = 260 }: Props) {
  if (!MAPBOX_TOKEN) return null;
  if (!poligono && (latitud == null || longitud == null)) return null;

  const mapRef = useRef<MapRef>(null);

  const geojson = useMemo(() => {
    if (!poligono) return null;
    return {
      type: "Feature" as const,
      geometry: { type: "Polygon" as const, coordinates: poligono },
      properties: { nombre },
    };
  }, [poligono, nombre]);

  const initialViewState = useMemo(() => {
    if (poligono) {
      const bounds = getBounds(poligono);
      return { bounds, fitBoundsOptions: { padding: 48, maxZoom: 18 } };
    }
    return { longitude: longitud!, latitude: latitud!, zoom: 15 };
  }, [poligono, latitud, longitud]);

  return (
    <div
      className="overflow-hidden rounded-xl border border-[var(--border)]"
      style={{ height: altura }}
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={initialViewState as Parameters<typeof Map>[0]["initialViewState"]}
        mapStyle="mapbox://styles/mapbox/light-v11"
        style={{ width: "100%", height: "100%" }}
        interactive
      >
        {geojson ? (
          <Source id="lote-poly" type="geojson" data={geojson}>
            {/* Relleno semitransparente */}
            <Layer
              id="lote-fill"
              type="fill"
              paint={{
                "fill-color": "var(--brand, #1a7a5e)",
                "fill-opacity": 0.18,
              }}
            />
            {/* Contorno */}
            <Layer
              id="lote-outline"
              type="line"
              paint={{
                "line-color": "var(--brand, #1a7a5e)",
                "line-width": 2.5,
                "line-opacity": 0.9,
              }}
            />
          </Source>
        ) : (
          <Marker longitude={longitud!} latitude={latitud!} anchor="bottom">
            <span
              title={nombre}
              className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[var(--brand)] shadow-md"
            />
          </Marker>
        )}
      </Map>
    </div>
  );
}
