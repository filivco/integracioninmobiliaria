import type { EtapaProyecto } from "@/lib/types";

type IconId = EtapaProyecto | "lote";

const props = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const paths: Record<IconId, React.ReactNode> = {
  lote: (
    <path d="M3 20 L9 4 L15 20 M4.5 16 h9 M12 4 L21 20 M15 20 h6" />
  ),
  captacion: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 L21 21" />
    </>
  ),
  viabilidad: (
    <>
      <path d="M9 11.5 L11.5 14 L16 8" />
      <circle cx="12" cy="12" r="9" />
    </>
  ),
  prefactibilidad: (
    <path d="M4 20 V10 M10 20 V6 M16 20 V13 M20 20 h-18" />
  ),
  factibilidad: (
    <path d="M4 17 L10 11 L14 15 L20 6 M14 6 h6 v6" />
  ),
  diseno: (
    <path d="M4 20 l1-5 11-11 4 4-11 11-5 1z M14 5 l4 4" />
  ),
  licencia: (
    <>
      <path d="M6 3 h9 l4 4 v14 h-13 z" />
      <path d="M15 3 v4 h4" />
      <path d="M8.5 13 l2 2 4-4" />
    </>
  ),
  comercializacion: (
    <path d="M3 10 v4 h4 l6 4 V6 l-6 4 z M17 9 a4 4 0 0 1 0 6" />
  ),
  construccion: (
    <path d="M4 21 V9 l8-5 8 5 v12 M4 21 h16 M9 21 v-6 h6 v6" />
  ),
  operacion: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3 v3 M12 18 v3 M3 12 h3 M18 12 h3 M5.6 5.6 l2.1 2.1 M16.3 16.3 l2.1 2.1 M18.4 5.6 l-2.1 2.1 M7.7 16.3 l-2.1 2.1" />
    </>
  ),
};

export function EtapaIcon({ id }: { id: IconId }) {
  return <svg {...props}>{paths[id]}</svg>;
}
