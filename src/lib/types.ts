// Modelo de dominio — ver ARQUITECTURA.md

export type ModalidadNegociacion = "solo_venta" | "aporte" | "mixto";

export type RolActor =
  | "propietario"
  | "integrador"
  | "arquitecto"
  | "constructor"
  | "comercializador"
  | "fiduciaria"
  | "banco"
  | "operador"
  | "inversionista"
  | "consultor"
  | "entidad_publica";

export type EtapaProyecto =
  | "captacion"
  | "viabilidad"
  | "prefactibilidad"
  | "factibilidad"
  | "diseno"
  | "licencia"
  | "comercializacion"
  | "construccion"
  | "operacion";

export type CapacidadIntervencion =
  | "estructuracion"
  | "consecucion_aliados"
  | "capital"
  | "comercializacion";

export type EstadoVerificacion = "verificado" | "en_revision" | "confidencial";

export interface Organizacion {
  id: string;
  nombre: string;
  created_at: string;
}

export interface Actor {
  id: string;
  nombre: string;
  rol: RolActor;
  organizacion_id: string | null;
  estado_verificacion: EstadoVerificacion;
  email: string | null;
  telefono: string | null;
  created_at: string;
}

export interface Lote {
  id: string;
  slug: string;
  nombre: string;
  ubicacion: string | null;
  area_m2: number | null;
  valor_lote: number | null;
  estado_juridico: string | null;
  restricciones: string | null;
  propietario_id: string | null;
  created_at: string;
}

export interface Proyecto {
  id: string;
  lote_id: string;
  etapa: EtapaProyecto;
  modalidad_negociacion: ModalidadNegociacion;
  valor_potencial_ventas: number | null;
  estado: string | null;
  created_at: string;
}

export interface Oportunidad {
  id: string;
  proyecto_id: string;
  tipo: RolActor;
  descripcion: string | null;
  estado: string;
  created_at: string;
}

export interface Documento {
  id: string;
  lote_id: string | null;
  proyecto_id: string | null;
  url: string;
  nombre: string | null;
  created_at: string;
}

export interface Intervencion {
  id: string;
  proyecto_id: string;
  integrador_id: string;
  capacidad: CapacidadIntervencion;
  terminos: string | null;
  created_at: string;
}

export type VisibilidadEvento = "publica" | "privada";

export interface Evento {
  id: string;
  lote_id: string;
  proyecto_id: string | null;
  actor_id: string | null;
  visibilidad: VisibilidadEvento;
  descripcion: string;
  created_at: string;
}

export const ETAPAS: { valor: EtapaProyecto; etiqueta: string }[] = [
  { valor: "captacion", etiqueta: "Captación" },
  { valor: "viabilidad", etiqueta: "Viabilidad" },
  { valor: "prefactibilidad", etiqueta: "Prefactibilidad" },
  { valor: "factibilidad", etiqueta: "Factibilidad" },
  { valor: "diseno", etiqueta: "Diseño" },
  { valor: "licencia", etiqueta: "Licencia" },
  { valor: "comercializacion", etiqueta: "Comercialización" },
  { valor: "construccion", etiqueta: "Construcción" },
  { valor: "operacion", etiqueta: "Operación" },
];

export const ROLES_ACTOR: { valor: RolActor; etiqueta: string }[] = [
  { valor: "propietario", etiqueta: "Propietario" },
  { valor: "integrador", etiqueta: "Integrador" },
  { valor: "arquitecto", etiqueta: "Arquitecto" },
  { valor: "constructor", etiqueta: "Constructor" },
  { valor: "comercializador", etiqueta: "Comercializador" },
  { valor: "fiduciaria", etiqueta: "Fiduciaria" },
  { valor: "banco", etiqueta: "Banco" },
  { valor: "operador", etiqueta: "Operador" },
  { valor: "inversionista", etiqueta: "Inversionista" },
  { valor: "consultor", etiqueta: "Consultor" },
  { valor: "entidad_publica", etiqueta: "Entidad pública" },
];

export const ESTADOS_VERIFICACION: {
  valor: EstadoVerificacion;
  etiqueta: string;
}[] = [
  { valor: "verificado", etiqueta: "Propietario verificado" },
  { valor: "en_revision", etiqueta: "Propietario en revisión" },
  { valor: "confidencial", etiqueta: "Propietario confidencial" },
];

export const MODALIDADES_NEGOCIACION: {
  valor: ModalidadNegociacion;
  etiqueta: string;
  descripcion: string;
}[] = [
  {
    valor: "solo_venta",
    etiqueta: "Solo venta",
    descripcion: "Vendes el lote y sales del negocio.",
  },
  {
    valor: "aporte",
    etiqueta: "Aporte",
    descripcion:
      "Aportas el lote como participación en el proyecto, sin pago inmediato, a cambio de un % de las utilidades futuras.",
  },
  {
    valor: "mixto",
    etiqueta: "Mixto",
    descripcion:
      "Combinación: parte en venta (pago inicial) y parte en aporte (participación futura).",
  },
];
