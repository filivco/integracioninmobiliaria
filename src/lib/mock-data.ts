// Datos de ejemplo para poblar el catálogo mientras se conecta un proyecto
// Supabase real. Mismas formas que las tablas de supabase/migrations.

import type {
  Actor,
  CapacidadIntervencion,
  EtapaProyecto,
  Lote,
  ModalidadNegociacion,
  Necesidad,
  RolActor,
} from "./types";

export type LoteMock = Lote & {
  imagenes: string[];
  proyectos: {
    id: string;
    etapa: EtapaProyecto;
    modalidad_negociacion: ModalidadNegociacion;
    estado: string | null;
    necesidades: Necesidad[];
  }[];
};

function img(seed: string) {
  return `/mock/${seed}.svg`;
}

function necesidad(
  id: string,
  proyecto_id: string,
  tipo: RolActor,
  descripcion: string,
): Necesidad {
  return {
    id,
    proyecto_id,
    tipo,
    descripcion,
    estado: "abierta",
    created_at: "2026-05-01T00:00:00.000Z",
  };
}

export const LOTES_MOCK: LoteMock[] = [
  {
    id: "m1",
    slug: "lote-bocagrande-cartagena",
    nombre: "Lote frente al mar — Bocagrande",
    ubicacion: "Cartagena, Bolívar",
    area_m2: 3200,
    estado_juridico: "Escriturado, sin gravámenes",
    restricciones: "Altura máxima 25 pisos (POT vigente)",
    propietario_id: "a1",
    created_at: "2026-04-02T00:00:00.000Z",
    imagenes: [img("bocagrande-1"), img("bocagrande-2"), img("bocagrande-3")],
    proyectos: [
      {
        id: "p1",
        etapa: "factibilidad",
        modalidad_negociacion: "mixto",
        estado: "activo",
        necesidades: [
          necesidad("n1", "p1", "constructor", "Constructor para torre residencial de 22 pisos"),
          necesidad("n2", "p1", "fiduciaria", "Estructuración de fiducia inmobiliaria"),
        ],
      },
    ],
  },
  {
    id: "m2",
    slug: "lote-el-rodadero-santa-marta",
    nombre: "Lote esquinero — El Rodadero",
    ubicacion: "Santa Marta, Magdalena",
    area_m2: 1450,
    estado_juridico: "Escriturado",
    restricciones: null,
    propietario_id: "a2",
    created_at: "2026-04-10T00:00:00.000Z",
    imagenes: [img("rodadero-1"), img("rodadero-2")],
    proyectos: [
      {
        id: "p2",
        etapa: "diseno",
        modalidad_negociacion: "aporte",
        estado: "activo",
        necesidades: [
          necesidad("n3", "p2", "arquitecto", "Diseño de proyecto hotelero boutique"),
          necesidad("n4", "p2", "inversionista", "Ronda de capital semilla para diseño y licencia"),
        ],
      },
    ],
  },
  {
    id: "m3",
    slug: "lote-puerto-colombia-barranquilla",
    nombre: "Lote costero — Puerto Colombia",
    ubicacion: "Puerto Colombia, Atlántico",
    area_m2: 8600,
    estado_juridico: "En proceso de titulación",
    restricciones: "Zona de manejo costero — requiere licencia ambiental",
    propietario_id: "a3",
    created_at: "2026-03-18T00:00:00.000Z",
    imagenes: [img("puertocolombia-1"), img("puertocolombia-2"), img("puertocolombia-3")],
    proyectos: [
      {
        id: "p3",
        etapa: "viabilidad",
        modalidad_negociacion: "solo_venta",
        estado: "activo",
        necesidades: [
          necesidad("n5", "p3", "consultor", "Consultoría ambiental y de licenciamiento"),
        ],
      },
    ],
  },
  {
    id: "m4",
    slug: "lote-manzanillo-cartagena",
    nombre: "Lote industrial — Manzanillo del Mar",
    ubicacion: "Cartagena, Bolívar",
    area_m2: 15000,
    estado_juridico: "Escriturado, sin gravámenes",
    restricciones: "Uso industrial/logístico según POT",
    propietario_id: "a4",
    created_at: "2026-02-25T00:00:00.000Z",
    imagenes: [img("manzanillo-1"), img("manzanillo-2")],
    proyectos: [
      {
        id: "p4",
        etapa: "comercializacion",
        modalidad_negociacion: "mixto",
        estado: "activo",
        necesidades: [
          necesidad("n6", "p4", "comercializador", "Comercialización de bodegas logísticas"),
          necesidad("n7", "p4", "banco", "Crédito constructor"),
        ],
      },
    ],
  },
  {
    id: "m5",
    slug: "lote-ciudad-verde-soledad",
    nombre: "Lote suburbano — Vía 40",
    ubicacion: "Soledad, Atlántico",
    area_m2: 5200,
    estado_juridico: "Escriturado",
    restricciones: null,
    propietario_id: "a5",
    created_at: "2026-05-30T00:00:00.000Z",
    imagenes: [img("via40-1"), img("via40-2")],
    proyectos: [
      {
        id: "p5",
        etapa: "prefactibilidad",
        modalidad_negociacion: "aporte",
        estado: "activo",
        necesidades: [
          necesidad("n8", "p5", "arquitecto", "Anteproyecto de vivienda de interés social"),
        ],
      },
    ],
  },
  {
    id: "m6",
    slug: "lote-los-corales-san-andres",
    nombre: "Lote turístico — Los Corales",
    ubicacion: "San Andrés, San Andrés y Providencia",
    area_m2: 900,
    estado_juridico: "Escriturado, régimen especial insular",
    restricciones: "Requiere concepto Oficina de Control de Circulación y Residencia",
    propietario_id: "a6",
    created_at: "2026-06-12T00:00:00.000Z",
    imagenes: [img("sanandres-1"), img("sanandres-2"), img("sanandres-3")],
    proyectos: [
      {
        id: "p6",
        etapa: "captacion",
        modalidad_negociacion: "solo_venta",
        estado: "activo",
        necesidades: [],
      },
    ],
  },
];

export const ACTORES_MOCK: Actor[] = [
  { id: "a1", nombre: "María Fernanda Ospina", rol: "propietario", organizacion_id: null, email: null, telefono: null, created_at: "2026-04-02T00:00:00.000Z" },
  { id: "a7", nombre: "Constructora del Litoral", rol: "constructor", organizacion_id: "o1", email: null, telefono: null, created_at: "2026-04-02T00:00:00.000Z" },
  { id: "a8", nombre: "Fiduciaria Caribe", rol: "fiduciaria", organizacion_id: "o2", email: null, telefono: null, created_at: "2026-04-02T00:00:00.000Z" },
  { id: "a9", nombre: "Estudio Arenas & Arquitectos", rol: "arquitecto", organizacion_id: "o3", email: null, telefono: null, created_at: "2026-04-02T00:00:00.000Z" },
];

export const CAPACIDADES_INTERVENCION: { valor: CapacidadIntervencion; etiqueta: string }[] = [
  { valor: "estructuracion", etiqueta: "Estructuración" },
  { valor: "consecucion_aliados", etiqueta: "Consecución de aliados" },
  { valor: "capital", etiqueta: "Capital" },
  { valor: "comercializacion", etiqueta: "Comercialización" },
];
