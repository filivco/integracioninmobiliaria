# IntegracionInmobiliaria.com — Arquitectura de Información y Modelo de Dominio

> Ayudamos a convertir terrenos y proyectos con potencial en activos inmobiliarios exitosos.

## 1. Modelo de negocio de dos capas

**Capa tecnológica**: la plataforma organiza información, colaboración y seguimiento del proyecto. Es la herramienta — escala, bajo margen por transacción.

**Capa de negocio**: el equipo interviene directamente cuando un proyecto necesita estructuración, consecución de aliados, levantamiento de capital o comercialización — alto margen, bajo volumen, "calidad sobre cantidad, no cantidad de proyectos".

La tecnología califica y da visibilidad de oportunidades; el negocio real ocurre en la capa de intervención directa.

## 2. Entidades del modelo

| Entidad | Descripción |
|---|---|
| **Lote** | Entidad raíz. Nada existe aislado de un lote. Contiene ubicación, área, documentos, propietarios, fotografías, estado jurídico, restricciones, oportunidades, proyectos asociados. |
| **Proyecto** | Un lote puede tener múltiples proyectos (intentos de desarrollo en el tiempo). Contiene etapa actual, aliados, oportunidades, documentos, cronograma, estado, indicadores, modalidad de negociación. |
| **Etapa** | Ciclo de vida del proyecto: Captación → Viabilidad → Prefactibilidad → Factibilidad → Diseño → Licencia → Comercialización → Construcción → Operación. |
| **Oportunidad** | Algo puntual que el proyecto requiere (constructor, arquitecto, banco, fiduciaria, comercializador). Un proyecto puede tener varias oportunidades abiertas a la vez. Distinta de Etapa: una oportunidad puede repetirse en más de una etapa. |
| **Actor** | Persona o empresa, puede asumir múltiples roles: Propietario, Integrador, Arquitecto, Constructor, Comercializador, Fiduciaria, Banco, Operador, Inversionista, Consultor, Entidad pública. |
| **Organización** | Empresa a la que pertenece un Actor. |
| **Documento** | Siempre pertenece a un Lote o Proyecto, nunca queda huérfano. |
| **Intervención / Mandato** | Registra cuándo el negocio propio (Integrador) entra a un Proyecto: en qué capacidad (estructuración, consecución de aliados, capital, comercialización) y con qué términos (fee, % de participación, alcance). Conecta la capa tecnológica con la capa de negocio. |

## 3. Modalidad de negociación del lote

Campo obligatorio al postular un lote (`modalidad_negociacion`), con fuerte diferenciación visual (tres botones grandes, no dropdown):

- **SOLO VENTA** — el dueño vende el lote y sale del negocio.
- **APORTE** — aporta el lote como participación/equity en el proyecto, sin pago inmediato, a cambio de % de utilidades futuras.
- **MIXTO** — combinación: parte en venta (pago inicial) + parte en aporte (participación futura).

Debajo de los tres botones: botón/link a tutorial en video explicando las tres modalidades (placeholder hasta que el video esté grabado).

## 4. Usuarios / roles

- **Propietario**: postula lote, elige modalidad, ve estado de sus oportunidades, recibe aplicaciones.
- **Integrador** (negocio propio): puede tomar una Intervención/Mandato completa sobre un proyecto, no solo cubrir una oportunidad puntual. Panel interno para detectar proyectos candidatos de alto valor.
- **Actor externo** (Arquitecto, Constructor, Comercializador, Fiduciaria, Banco, Operador, Inversionista, Consultor, Entidad pública): navega y toma Oportunidades puntuales.
- **Visitante anónimo**: navega catálogo público de lotes y etapas, sin aplicar.

## 5. Mecánica de la plataforma

Propietario postula lote (con modalidad) → proyecto avanza por Etapas → en cada etapa se abren Oportunidades → Actores externos toman oportunidades puntuales, o el Integrador toma una Intervención/Mandato sobre el proyecto completo. Matching automático / IA queda para V2 (roadmap del manifiesto).

## 6. Sitemap propuesto

| Ruta | Propósito |
|---|---|
| `/` | Home — manifiesto, qué es (y qué no es) la plataforma |
| `/lotes/` | Buscador/listado de lotes y proyectos, filtros por ubicación, etapa, modalidad, tamaño |
| `/lotes/[slug]/` | Ficha de lote/proyecto: datos, etapa actual, oportunidades abiertas, modalidad |
| `/publicar-lote/` | Postulación: datos del lote → botones SOLO VENTA / APORTE / MIXTO → botón tutorial en video → documentos |
| `/etapas/` | Explicación de las etapas del ciclo de vida |
| `/actores/` | Directorio de actores por rol |
| `/como-funciona/` | Explicación del modelo para propietarios y actores |
| `/sobre-nosotros/` | Manifiesto, principios, quiénes somos |
| `/contacto/` | Contacto |

## 7. Esquema de datos (borrador, para Supabase/Postgres)

```sql
create type modalidad_negociacion as enum ('solo_venta', 'aporte', 'mixto');
create type rol_actor as enum (
  'propietario', 'integrador', 'arquitecto', 'constructor',
  'comercializador', 'fiduciaria', 'banco', 'operador',
  'inversionista', 'consultor', 'entidad_publica'
);
create type etapa_proyecto as enum (
  'captacion', 'viabilidad', 'prefactibilidad', 'factibilidad',
  'diseno', 'licencia', 'comercializacion', 'construccion', 'operacion'
);

create table lotes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  ubicacion text,
  area_m2 numeric,
  estado_juridico text,
  restricciones text,
  propietario_id uuid references actores(id),
  created_at timestamptz default now()
);

create table proyectos (
  id uuid primary key default gen_random_uuid(),
  lote_id uuid not null references lotes(id),
  etapa etapa_proyecto not null default 'captacion',
  modalidad_negociacion modalidad_negociacion not null,
  estado text,
  created_at timestamptz default now()
);

create table organizaciones (
  id uuid primary key default gen_random_uuid(),
  nombre text not null
);

create table actores (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  rol rol_actor not null,
  organizacion_id uuid references organizaciones(id),
  email text,
  telefono text
);

create table oportunidades (
  id uuid primary key default gen_random_uuid(),
  proyecto_id uuid not null references proyectos(id),
  tipo rol_actor not null,
  descripcion text,
  estado text default 'abierta',
  created_at timestamptz default now()
);

create table documentos (
  id uuid primary key default gen_random_uuid(),
  lote_id uuid references lotes(id),
  proyecto_id uuid references proyectos(id),
  url text not null,
  nombre text,
  created_at timestamptz default now(),
  check (lote_id is not null or proyecto_id is not null)
);

create table intervenciones (
  id uuid primary key default gen_random_uuid(),
  proyecto_id uuid not null references proyectos(id),
  integrador_id uuid not null references actores(id),
  capacidad text not null, -- estructuracion | consecucion_aliados | capital | comercializacion
  terminos text,
  created_at timestamptz default now()
);
```

## 8. Fuera de alcance de esta iteración

- Creación del repo y construcción real de la app (Next.js + Supabase).
- Autenticación / permisos por rol.
- Formularios funcionales, subida real de documentos.
- Matching inteligente / IA (V2).
- Video tutorial real.
- Paleta de colores y diseño visual definitivo (el manifiesto pide: minimalista, mucho espacio en blanco, jerarquía visual clara, pocas acciones por pantalla).
