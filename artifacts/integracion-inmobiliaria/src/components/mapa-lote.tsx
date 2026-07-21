import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface Props {
  latitud: number;
  longitud: number;
  nombre: string;
  /** Altura del mapa en px. Por defecto 220. */
  altura?: number;
}

export function MapaLote({ latitud, longitud, nombre, altura = 220 }: Props) {
  if (!MAPBOX_TOKEN) return null;

  return (
    <div
      className="overflow-hidden rounded-xl border border-[var(--border)]"
      style={{ height: altura }}
    >
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: longitud, latitude: latitud, zoom: 13 }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        style={{ width: "100%", height: "100%" }}
        interactive={false}
      >
        <Marker longitude={longitud} latitude={latitud} anchor="bottom">
          <span
            title={nombre}
            className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[var(--brand)] shadow-md"
          />
        </Marker>
      </Map>
    </div>
  );
}
