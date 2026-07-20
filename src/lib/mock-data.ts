// Datos de ejemplo para poblar el catálogo mientras se conecta un proyecto
// Supabase real. Mismas formas que las tablas de supabase/migrations.

import type {
  Actor,
  CapacidadIntervencion,
  Documento,
  Evento,
  EtapaProyecto,
  Intervencion,
  Lote,
  ModalidadNegociacion,
  Oportunidad,
  Organizacion,
  RolActor,
} from "./types";
import { ETAPAS, ROLES_ACTOR } from "./types";

export type LoteMock = Lote & {
  imagenes: string[];
  documentos: Documento[];
  proyectos: {
    id: string;
    etapa: EtapaProyecto;
    modalidad_negociacion: ModalidadNegociacion;
    valor_potencial_ventas: number | null;
    estado: string | null;
    oportunidades: Oportunidad[];
  }[];
};

function img(seed: string) {
  return `/mock/${seed}.svg`;
}

function oportunidad(
  id: string,
  proyecto_id: string,
  tipo: RolActor,
  descripcion: string,
): Oportunidad {
  return {
    id,
    proyecto_id,
    tipo,
    descripcion,
    estado: "abierta",
    created_at: "2026-05-01T00:00:00.000Z",
  };
}

function documento(id: string, loteId: string, nombre: string): Documento {
  return {
    id,
    lote_id: loteId,
    proyecto_id: null,
    url: "#",
    nombre,
    created_at: "2026-04-05T00:00:00.000Z",
  };
}

export const LOTES_MOCK: LoteMock[] = [
  {
    id: "m1",
    slug: "lote-bocagrande-cartagena",
    nombre: "Lote frente al mar — Bocagrande",
    ubicacion: "Cartagena, Bolívar",
    area_m2: 3200,
    valor_lote: 1200000000,
    estado_juridico: "Escriturado, sin gravámenes",
    restricciones: "Altura máxima 25 pisos (POT vigente)",
    propietario_id: "a1",
    created_at: "2026-04-02T00:00:00.000Z",
    imagenes: [img("bocagrande-1"), img("bocagrande-2"), img("bocagrande-3")],
    documentos: [
      documento("d1", "m1", "Escritura pública"),
      documento("d2", "m1", "Estudio de suelos"),
    ],
    proyectos: [
      {
        id: "p1",
        etapa: "factibilidad",
        modalidad_negociacion: "mixto",
        valor_potencial_ventas: 45000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n1", "p1", "constructor", "Constructor para torre residencial de 22 pisos"),
          oportunidad("n2", "p1", "fiduciaria", "Estructuración de fiducia inmobiliaria"),
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
    valor_lote: 350000000,
    estado_juridico: "Escriturado",
    restricciones: null,
    propietario_id: "a2",
    created_at: "2026-04-10T00:00:00.000Z",
    imagenes: [img("rodadero-1"), img("rodadero-2")],
    documentos: [],
    proyectos: [
      {
        id: "p2",
        etapa: "diseno",
        modalidad_negociacion: "aporte",
        valor_potencial_ventas: 8000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n3", "p2", "arquitecto", "Diseño de proyecto hotelero boutique"),
          oportunidad("n4", "p2", "inversionista", "Ronda de capital semilla para diseño y licencia"),
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
    valor_lote: 900000000,
    estado_juridico: "En proceso de titulación",
    restricciones: "Zona de manejo costero — requiere licencia ambiental",
    propietario_id: "a3",
    created_at: "2026-03-18T00:00:00.000Z",
    imagenes: [img("puertocolombia-1"), img("puertocolombia-2"), img("puertocolombia-3")],
    documentos: [],
    proyectos: [
      {
        id: "p3",
        etapa: "viabilidad",
        modalidad_negociacion: "solo_venta",
        valor_potencial_ventas: 20000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n5", "p3", "consultor", "Consultoría ambiental y de licenciamiento"),
          oportunidad("n10", "p3", "entidad_publica", "Concepto de autoridad ambiental regional"),
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
    valor_lote: 3000000000,
    estado_juridico: "Escriturado, sin gravámenes",
    restricciones: "Uso industrial/logístico según POT",
    propietario_id: "a4",
    created_at: "2026-02-25T00:00:00.000Z",
    imagenes: [img("manzanillo-1"), img("manzanillo-2")],
    documentos: [documento("d3", "m4", "Licencia de uso de suelo")],
    proyectos: [
      {
        id: "p4",
        etapa: "comercializacion",
        modalidad_negociacion: "mixto",
        valor_potencial_ventas: 18000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n6", "p4", "comercializador", "Comercialización de bodegas logísticas"),
          oportunidad("n7", "p4", "banco", "Crédito constructor"),
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
    valor_lote: 650000000,
    estado_juridico: "Escriturado",
    restricciones: null,
    propietario_id: "a5",
    created_at: "2026-05-30T00:00:00.000Z",
    imagenes: [img("via40-1"), img("via40-2")],
    documentos: [],
    proyectos: [
      {
        id: "p5",
        etapa: "prefactibilidad",
        modalidad_negociacion: "aporte",
        valor_potencial_ventas: 9500000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n8", "p5", "arquitecto", "Anteproyecto de vivienda de interés social"),
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
    valor_lote: 1500000000,
    estado_juridico: "Escriturado, régimen especial insular",
    restricciones: "Requiere concepto Oficina de Control de Circulación y Residencia",
    propietario_id: "a6",
    created_at: "2026-06-12T00:00:00.000Z",
    imagenes: [img("sanandres-1"), img("sanandres-2"), img("sanandres-3")],
    documentos: [],
    proyectos: [
      {
        id: "p6",
        etapa: "captacion",
        modalidad_negociacion: "solo_venta",
        valor_potencial_ventas: null,
        estado: "activo",
        oportunidades: [
          oportunidad("n9", "p6", "operador", "Operador hotelero para la fase de operación futura"),
        ],
      },
    ],
  },
  {
    id: "m7",
    slug: "lote-riohacha-guajira",
    nombre: "Lote frente al mar — Riohacha",
    ubicacion: "Riohacha, La Guajira",
    area_m2: 4000,
    valor_lote: 500000000,
    estado_juridico: "Escriturado, sin gravámenes",
    restricciones: null,
    propietario_id: "a10",
    created_at: "2026-01-15T00:00:00.000Z",
    imagenes: [img("riohacha-1"), img("riohacha-2")],
    documentos: [],
    proyectos: [
      {
        id: "p7",
        etapa: "viabilidad",
        modalidad_negociacion: "aporte",
        valor_potencial_ventas: 12000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n11", "p7", "consultor", "Consultoría de mercado turístico regional"),
        ],
      },
    ],
  },
  {
    id: "m8",
    slug: "lote-covenas-sucre",
    nombre: "Lote turístico — Coveñas",
    ubicacion: "Coveñas, Sucre",
    area_m2: 2200,
    valor_lote: 420000000,
    estado_juridico: "Escriturado",
    restricciones: null,
    propietario_id: "a11",
    created_at: "2026-01-20T00:00:00.000Z",
    imagenes: [img("covenas-1"), img("covenas-2")],
    documentos: [],
    proyectos: [
      {
        id: "p8",
        etapa: "comercializacion",
        modalidad_negociacion: "mixto",
        valor_potencial_ventas: 9000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n12", "p8", "comercializador", "Comercialización de lotes de segunda vivienda"),
        ],
      },
    ],
  },
  {
    id: "m9",
    slug: "lote-tolu-sucre",
    nombre: "Lote frente al mar — Tolú",
    ubicacion: "Tolú, Sucre",
    area_m2: 1800,
    valor_lote: 300000000,
    estado_juridico: "Escriturado, sin gravámenes",
    restricciones: null,
    propietario_id: "a12",
    created_at: "2026-02-02T00:00:00.000Z",
    imagenes: [img("tolu-1"), img("tolu-2")],
    documentos: [],
    proyectos: [
      {
        id: "p9",
        etapa: "diseno",
        modalidad_negociacion: "solo_venta",
        valor_potencial_ventas: 6500000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n13", "p9", "arquitecto", "Diseño de condominio frente al mar"),
        ],
      },
    ],
  },
  {
    id: "m10",
    slug: "lote-providencia",
    nombre: "Lote insular — Providencia",
    ubicacion: "Providencia, San Andrés y Providencia",
    area_m2: 700,
    valor_lote: 900000000,
    estado_juridico: "Escriturado, régimen especial insular",
    restricciones: "Requiere concepto de la Oficina de Control de Circulación y Residencia",
    propietario_id: "a13",
    created_at: "2026-06-25T00:00:00.000Z",
    imagenes: [img("providencia-1"), img("providencia-2")],
    documentos: [],
    proyectos: [
      {
        id: "p10",
        etapa: "captacion",
        modalidad_negociacion: "aporte",
        valor_potencial_ventas: null,
        estado: "activo",
        oportunidades: [],
      },
    ],
  },
  {
    id: "m11",
    slug: "lote-turbo-antioquia",
    nombre: "Lote portuario — Turbo",
    ubicacion: "Turbo, Antioquia",
    area_m2: 25000,
    valor_lote: 4500000000,
    estado_juridico: "Escriturado, sin gravámenes",
    restricciones: "Uso portuario/logístico — requiere concesión marítima",
    propietario_id: "a14",
    created_at: "2026-01-08T00:00:00.000Z",
    imagenes: [img("turbo-1"), img("turbo-2")],
    documentos: [documento("d4", "m11", "Concepto de concesión portuaria")],
    proyectos: [
      {
        id: "p11",
        etapa: "factibilidad",
        modalidad_negociacion: "mixto",
        valor_potencial_ventas: 30000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n14", "p11", "banco", "Financiamiento de bodegas portuarias"),
          oportunidad("n15", "p11", "constructor", "Constructor para infraestructura portuaria"),
        ],
      },
    ],
  },
  {
    id: "m12",
    slug: "lote-necocli-antioquia",
    nombre: "Lote turístico — Necoclí",
    ubicacion: "Necoclí, Antioquia",
    area_m2: 6000,
    valor_lote: 700000000,
    estado_juridico: "Escriturado",
    restricciones: null,
    propietario_id: "a15",
    created_at: "2026-02-14T00:00:00.000Z",
    imagenes: [img("necocli-1"), img("necocli-2")],
    documentos: [],
    proyectos: [
      {
        id: "p12",
        etapa: "prefactibilidad",
        modalidad_negociacion: "solo_venta",
        valor_potencial_ventas: 14000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n16", "p12", "arquitecto", "Anteproyecto turístico de bajo impacto"),
        ],
      },
    ],
  },
  {
    id: "m13",
    slug: "lote-cienaga-magdalena",
    nombre: "Lote agroturístico — Ciénaga",
    ubicacion: "Ciénaga, Magdalena",
    area_m2: 3500,
    valor_lote: 380000000,
    estado_juridico: "Escriturado, sin gravámenes",
    restricciones: null,
    propietario_id: "a16",
    created_at: "2026-03-01T00:00:00.000Z",
    imagenes: [img("cienaga-1"), img("cienaga-2")],
    documentos: [],
    proyectos: [
      {
        id: "p13",
        etapa: "licencia",
        modalidad_negociacion: "aporte",
        valor_potencial_ventas: 7200000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n17", "p13", "entidad_publica", "Trámite de licencia ante curaduría"),
        ],
      },
    ],
  },
  {
    id: "m14",
    slug: "lote-sitionuevo-magdalena",
    nombre: "Lote rural — Sitionuevo",
    ubicacion: "Sitionuevo, Magdalena",
    area_m2: 12000,
    valor_lote: 250000000,
    estado_juridico: "En proceso de titulación",
    restricciones: "Zona de amortiguación de ciénaga — requiere concepto ambiental",
    propietario_id: "a17",
    created_at: "2026-01-28T00:00:00.000Z",
    imagenes: [img("sitionuevo-1"), img("sitionuevo-2")],
    documentos: [],
    proyectos: [
      {
        id: "p14",
        etapa: "viabilidad",
        modalidad_negociacion: "mixto",
        valor_potencial_ventas: 4000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n18", "p14", "consultor", "Estudio de aptitud de uso del suelo rural"),
        ],
      },
    ],
  },
  {
    id: "m15",
    slug: "lote-malambo-atlantico",
    nombre: "Lote industrial — Malambo",
    ubicacion: "Malambo, Atlántico",
    area_m2: 8000,
    valor_lote: 1100000000,
    estado_juridico: "Escriturado, sin gravámenes",
    restricciones: "Uso industrial según POT",
    propietario_id: "a18",
    created_at: "2026-02-19T00:00:00.000Z",
    imagenes: [img("malambo-1"), img("malambo-2")],
    documentos: [],
    proyectos: [
      {
        id: "p15",
        etapa: "construccion",
        modalidad_negociacion: "solo_venta",
        valor_potencial_ventas: 16000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n19", "p15", "constructor", "Interventoría de obra industrial"),
        ],
      },
    ],
  },
  {
    id: "m16",
    slug: "lote-alto-prado-barranquilla",
    nombre: "Lote urbano — Alto Prado",
    ubicacion: "Barranquilla, Atlántico",
    area_m2: 1200,
    valor_lote: 2800000000,
    estado_juridico: "Escriturado, sin gravámenes",
    restricciones: "Uso comercial/oficinas según POT",
    propietario_id: "a19",
    created_at: "2026-03-10T00:00:00.000Z",
    imagenes: [img("altoprado-1"), img("altoprado-2")],
    documentos: [],
    proyectos: [
      {
        id: "p16",
        etapa: "diseno",
        modalidad_negociacion: "aporte",
        valor_potencial_ventas: 22000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n20", "p16", "arquitecto", "Diseño de edificio de oficinas"),
        ],
      },
    ],
  },
  {
    id: "m17",
    slug: "lote-manga-cartagena",
    nombre: "Lote urbano mixto — Manga",
    ubicacion: "Cartagena, Bolívar",
    area_m2: 2000,
    valor_lote: 3200000000,
    estado_juridico: "Escriturado, sin gravámenes",
    restricciones: null,
    propietario_id: "a20",
    created_at: "2026-04-22T00:00:00.000Z",
    imagenes: [img("manga-1"), img("manga-2")],
    documentos: [],
    proyectos: [
      {
        id: "p17",
        etapa: "operacion",
        modalidad_negociacion: "mixto",
        valor_potencial_ventas: 28000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n21", "p17", "operador", "Operador de centro comercial de barrio"),
        ],
      },
    ],
  },
  {
    id: "m18",
    slug: "lote-gaira-santa-marta",
    nombre: "Lote residencial — Gaira",
    ubicacion: "Santa Marta, Magdalena",
    area_m2: 1600,
    valor_lote: 600000000,
    estado_juridico: "Escriturado",
    restricciones: null,
    propietario_id: "a21",
    created_at: "2026-05-05T00:00:00.000Z",
    imagenes: [img("gaira-1"), img("gaira-2")],
    documentos: [],
    proyectos: [
      {
        id: "p18",
        etapa: "comercializacion",
        modalidad_negociacion: "solo_venta",
        valor_potencial_ventas: 11000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n22", "p18", "comercializador", "Comercialización de apartamentos vacacionales"),
        ],
      },
    ],
  },
  {
    id: "m19",
    slug: "lote-uribia-guajira",
    nombre: "Lote eólico — Uribia",
    ubicacion: "Uribia, La Guajira",
    area_m2: 80000,
    valor_lote: 1800000000,
    estado_juridico: "Escriturado, con servidumbre de paso",
    restricciones: "Uso de energía renovable — requiere licencia ambiental",
    propietario_id: "a22",
    created_at: "2026-01-05T00:00:00.000Z",
    imagenes: [img("uribia-1"), img("uribia-2")],
    documentos: [],
    proyectos: [
      {
        id: "p19",
        etapa: "factibilidad",
        modalidad_negociacion: "aporte",
        valor_potencial_ventas: 40000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n23", "p19", "inversionista", "Capital para estudio de factibilidad eólica"),
          oportunidad("n24", "p19", "consultor", "Consultoría técnica en energía eólica"),
        ],
      },
    ],
  },
  {
    id: "m20",
    slug: "lote-manaure-guajira",
    nombre: "Lote industrial — Manaure",
    ubicacion: "Manaure, La Guajira",
    area_m2: 30000,
    valor_lote: 1200000000,
    estado_juridico: "Escriturado, sin gravámenes",
    restricciones: "Uso industrial — cercano a salinas",
    propietario_id: "a23",
    created_at: "2026-02-08T00:00:00.000Z",
    imagenes: [img("manaure-1"), img("manaure-2")],
    documentos: [],
    proyectos: [
      {
        id: "p20",
        etapa: "prefactibilidad",
        modalidad_negociacion: "mixto",
        valor_potencial_ventas: 15000000000,
        estado: "activo",
        oportunidades: [
          oportunidad("n25", "p20", "banco", "Financiamiento para planta de procesamiento de sal"),
        ],
      },
    ],
  },
];

export type OportunidadConLote = Oportunidad & {
  etapa: EtapaProyecto;
  lote: { id: string; slug: string; nombre: string; ubicacion: string | null };
};

export const OPORTUNIDADES_MOCK: OportunidadConLote[] = LOTES_MOCK.flatMap((lote) =>
  lote.proyectos.flatMap((proyecto) =>
    proyecto.oportunidades.map((n) => ({
      ...n,
      etapa: proyecto.etapa,
      lote: {
        id: lote.id,
        slug: lote.slug,
        nombre: lote.nombre,
        ubicacion: lote.ubicacion,
      },
    })),
  ),
);

export const ORGANIZACIONES_MOCK: Organizacion[] = [
  { id: "o1", nombre: "Constructora del Litoral", created_at: "2026-04-02T00:00:00.000Z" },
  { id: "o2", nombre: "Fiduciaria Caribe", created_at: "2026-04-02T00:00:00.000Z" },
  { id: "o3", nombre: "Estudio Arenas & Arquitectos", created_at: "2026-04-02T00:00:00.000Z" },
  { id: "o4", nombre: "IntegracionInmobiliaria — Estructuración", created_at: "2026-01-01T00:00:00.000Z" },
  { id: "o5", nombre: "Banco Caribe Capital", created_at: "2026-01-08T00:00:00.000Z" },
  { id: "o6", nombre: "Litoral Comercializadora", created_at: "2026-01-20T00:00:00.000Z" },
  { id: "o7", nombre: "Operadora Costa Hotel Group", created_at: "2026-04-22T00:00:00.000Z" },
  { id: "o8", nombre: "Fondo Caribe Inversiones", created_at: "2026-01-05T00:00:00.000Z" },
  { id: "o9", nombre: "Ambiental & Legal Consultores", created_at: "2026-02-02T00:00:00.000Z" },
];

export const ACTORES_MOCK: Actor[] = [
  { id: "a1", nombre: "María Fernanda Ospina", rol: "propietario", organizacion_id: null, estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-04-02T00:00:00.000Z" },
  { id: "a2", nombre: "Carlos Julio Barrios", rol: "propietario", organizacion_id: null, estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-04-10T00:00:00.000Z" },
  { id: "a3", nombre: "Inversiones Costa Azul S.A.S.", rol: "propietario", organizacion_id: null, estado_verificacion: "en_revision", email: null, telefono: null, created_at: "2026-03-18T00:00:00.000Z" },
  { id: "a4", nombre: "Rodrigo Emilio Pacheco", rol: "propietario", organizacion_id: null, estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-02-25T00:00:00.000Z" },
  { id: "a5", nombre: "Lucía Esther Vanegas", rol: "propietario", organizacion_id: null, estado_verificacion: "confidencial", email: null, telefono: null, created_at: "2026-05-30T00:00:00.000Z" },
  { id: "a6", nombre: "Jairo Andrés Robinson", rol: "propietario", organizacion_id: null, estado_verificacion: "en_revision", email: null, telefono: null, created_at: "2026-06-12T00:00:00.000Z" },
  { id: "a7", nombre: "Constructora del Litoral", rol: "constructor", organizacion_id: "o1", estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-04-02T00:00:00.000Z" },
  { id: "a8", nombre: "Fiduciaria Caribe", rol: "fiduciaria", organizacion_id: "o2", estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-04-02T00:00:00.000Z" },
  { id: "a9", nombre: "Estudio Arenas & Arquitectos", rol: "arquitecto", organizacion_id: "o3", estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-04-02T00:00:00.000Z" },
  { id: "a10", nombre: "Yesenia Paola Iguarán", rol: "propietario", organizacion_id: null, estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-01-15T00:00:00.000Z" },
  { id: "a11", nombre: "Hernán Darío Mercado", rol: "propietario", organizacion_id: null, estado_verificacion: "en_revision", email: null, telefono: null, created_at: "2026-01-20T00:00:00.000Z" },
  { id: "a12", nombre: "Alba Lucía Genes", rol: "propietario", organizacion_id: null, estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-02-02T00:00:00.000Z" },
  { id: "a13", nombre: "Whitney O'Neill Robinson", rol: "propietario", organizacion_id: null, estado_verificacion: "confidencial", email: null, telefono: null, created_at: "2026-06-25T00:00:00.000Z" },
  { id: "a14", nombre: "Portuaria Urabá S.A.S.", rol: "propietario", organizacion_id: null, estado_verificacion: "en_revision", email: null, telefono: null, created_at: "2026-01-08T00:00:00.000Z" },
  { id: "a15", nombre: "Marlon Enrique Córdoba", rol: "propietario", organizacion_id: null, estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-02-14T00:00:00.000Z" },
  { id: "a16", nombre: "Deisy Milena Redondo", rol: "propietario", organizacion_id: null, estado_verificacion: "en_revision", email: null, telefono: null, created_at: "2026-03-01T00:00:00.000Z" },
  { id: "a17", nombre: "Agropecuaria Ciénaga Grande Ltda.", rol: "propietario", organizacion_id: null, estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-01-28T00:00:00.000Z" },
  { id: "a18", nombre: "Elkin Ramiro Fontalvo", rol: "propietario", organizacion_id: null, estado_verificacion: "confidencial", email: null, telefono: null, created_at: "2026-02-19T00:00:00.000Z" },
  { id: "a19", nombre: "Inversiones Prado Alto S.A.S.", rol: "propietario", organizacion_id: null, estado_verificacion: "en_revision", email: null, telefono: null, created_at: "2026-03-10T00:00:00.000Z" },
  { id: "a20", nombre: "Manga Desarrollos Urbanos S.A.S.", rol: "propietario", organizacion_id: null, estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-04-22T00:00:00.000Z" },
  { id: "a21", nombre: "Katherine Judith Zúñiga", rol: "propietario", organizacion_id: null, estado_verificacion: "en_revision", email: null, telefono: null, created_at: "2026-05-05T00:00:00.000Z" },
  { id: "a22", nombre: "Comunidad Wayuu Portete", rol: "propietario", organizacion_id: null, estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-01-05T00:00:00.000Z" },
  { id: "a23", nombre: "Salinas del Caribe S.A.S.", rol: "propietario", organizacion_id: null, estado_verificacion: "en_revision", email: null, telefono: null, created_at: "2026-02-08T00:00:00.000Z" },
  { id: "a24", nombre: "Juan Sebastián Nieto", rol: "integrador", organizacion_id: "o4", estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-01-01T00:00:00.000Z" },
  { id: "a25", nombre: "Banco Caribe Capital", rol: "banco", organizacion_id: "o5", estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-01-08T00:00:00.000Z" },
  { id: "a26", nombre: "Litoral Comercializadora", rol: "comercializador", organizacion_id: "o6", estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-01-20T00:00:00.000Z" },
  { id: "a27", nombre: "Operadora Costa Hotel Group", rol: "operador", organizacion_id: "o7", estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-04-22T00:00:00.000Z" },
  { id: "a28", nombre: "Fondo Caribe Inversiones", rol: "inversionista", organizacion_id: "o8", estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-01-05T00:00:00.000Z" },
  { id: "a29", nombre: "Ambiental & Legal Consultores", rol: "consultor", organizacion_id: "o9", estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-02-02T00:00:00.000Z" },
  { id: "a30", nombre: "Curaduría Urbana No. 2 — Cartagena", rol: "entidad_publica", organizacion_id: null, estado_verificacion: "verificado", email: null, telefono: null, created_at: "2026-03-01T00:00:00.000Z" },
];

export const CAPACIDADES_INTERVENCION: { valor: CapacidadIntervencion; etiqueta: string }[] = [
  { valor: "estructuracion", etiqueta: "Estructuración" },
  { valor: "consecucion_aliados", etiqueta: "Consecución de aliados" },
  { valor: "capital", etiqueta: "Capital" },
  { valor: "comercializacion", etiqueta: "Comercialización" },
];

export const INTERVENCIONES_MOCK: Intervencion[] = [
  {
    id: "iv1",
    proyecto_id: "p1",
    integrador_id: "a24",
    capacidad: "estructuracion",
    terminos: "Fee de éxito del 3% sobre valor de cierre, acompañamiento en consecución de constructor y fiduciaria.",
    created_at: "2026-04-15T00:00:00.000Z",
  },
  {
    id: "iv2",
    proyecto_id: "p11",
    integrador_id: "a24",
    capacidad: "consecucion_aliados",
    terminos: "Mandato de consecución de aliado portuario y banco de primer piso.",
    created_at: "2026-01-20T00:00:00.000Z",
  },
  {
    id: "iv3",
    proyecto_id: "p19",
    integrador_id: "a24",
    capacidad: "capital",
    terminos: "Estructuración de vehículo de inversión para la fase de factibilidad, participación del 8% sobre el proyecto.",
    created_at: "2026-01-10T00:00:00.000Z",
  },
];

// Comentarios internos de ejemplo, además de lo que ya se deriva de
// lote/proyecto/oportunidad/documento/intervención en construirHistorico().
const COMENTARIOS_INTERNOS_MOCK: Record<string, { descripcion: string; created_at: string }[]> = {
  m1: [
    {
      descripcion:
        "El propietario confirmó disponibilidad para reunión con el constructor la próxima semana.",
      created_at: "2026-05-20T00:00:00.000Z",
    },
  ],
  m11: [
    {
      descripcion:
        "Pendiente validar con el banco el apetito de riesgo para financiamiento portuario antes de cerrar el mandato.",
      created_at: "2026-02-10T00:00:00.000Z",
    },
  ],
  m19: [
    {
      descripcion:
        "Se agenda visita técnica con el consultor de energía eólica para la próxima etapa de factibilidad.",
      created_at: "2026-02-01T00:00:00.000Z",
    },
  ],
};

/**
 * Deriva el histórico de un lote a partir de las entidades que ya
 * existen (no se guarda por separado): publicación del lote, apertura
 * de cada oportunidad, carga de cada documento, formalización de cada
 * intervención, más comentarios internos de ejemplo. Ordenado del más
 * reciente al más antiguo.
 */
export function construirHistorico(lote: LoteMock): Evento[] {
  const eventos: Evento[] = [];

  eventos.push({
    id: `ev-${lote.id}-publicacion`,
    lote_id: lote.id,
    proyecto_id: null,
    actor_id: lote.propietario_id,
    visibilidad: "publica",
    descripcion: `Lote publicado en la plataforma${
      lote.ubicacion ? ` — ${lote.ubicacion}` : ""
    }.`,
    created_at: lote.created_at,
  });

  for (const proyecto of lote.proyectos) {
    const etapa = ETAPAS.find((e) => e.valor === proyecto.etapa)?.etiqueta ?? proyecto.etapa;
    eventos.push({
      id: `ev-${proyecto.id}-creacion`,
      lote_id: lote.id,
      proyecto_id: proyecto.id,
      actor_id: null,
      visibilidad: "publica",
      descripcion: `Proyecto creado — etapa actual: ${etapa}.`,
      created_at: lote.created_at,
    });

    for (const n of proyecto.oportunidades) {
      const rol = ROLES_ACTOR.find((r) => r.valor === n.tipo)?.etiqueta ?? n.tipo;
      eventos.push({
        id: `ev-${n.id}`,
        lote_id: lote.id,
        proyecto_id: proyecto.id,
        actor_id: null,
        visibilidad: "publica",
        descripcion: `Se abrió oportunidad de ${rol}${n.descripcion ? `: ${n.descripcion}` : ""}.`,
        created_at: n.created_at,
      });
    }

    for (const iv of INTERVENCIONES_MOCK.filter((i) => i.proyecto_id === proyecto.id)) {
      const integrador = ACTORES_MOCK.find((a) => a.id === iv.integrador_id);
      const capacidad = CAPACIDADES_INTERVENCION.find((c) => c.valor === iv.capacidad)?.etiqueta ?? iv.capacidad;
      eventos.push({
        id: `ev-${iv.id}`,
        lote_id: lote.id,
        proyecto_id: proyecto.id,
        actor_id: iv.integrador_id,
        visibilidad: "privada",
        descripcion: `Se formalizó intervención de ${capacidad}${
          integrador ? ` con ${integrador.nombre}` : ""
        }.`,
        created_at: iv.created_at,
      });
    }
  }

  for (const doc of lote.documentos) {
    eventos.push({
      id: `ev-${doc.id}`,
      lote_id: lote.id,
      proyecto_id: null,
      actor_id: null,
      visibilidad: "privada",
      descripcion: `Se cargó el documento «${doc.nombre ?? "documento"}».`,
      created_at: doc.created_at,
    });
  }

  (COMENTARIOS_INTERNOS_MOCK[lote.id] ?? []).forEach((c, i) => {
    eventos.push({
      id: `ev-${lote.id}-comentario-${i}`,
      lote_id: lote.id,
      proyecto_id: lote.proyectos[0]?.id ?? null,
      actor_id: null,
      visibilidad: "privada",
      descripcion: c.descripcion,
      created_at: c.created_at,
    });
  });

  return eventos.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}
