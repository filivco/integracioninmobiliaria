-- IntegracionInmobiliaria.com — esquema inicial
-- Ver ARQUITECTURA.md para el modelo de dominio completo.

create extension if not exists "pgcrypto";

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

create type capacidad_intervencion as enum (
  'estructuracion', 'consecucion_aliados', 'capital', 'comercializacion'
);

create table organizaciones (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  created_at timestamptz not null default now()
);

create table actores (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  rol rol_actor not null,
  organizacion_id uuid references organizaciones(id) on delete set null,
  email text,
  telefono text,
  created_at timestamptz not null default now()
);
create index actores_organizacion_id_idx on actores(organizacion_id);
create index actores_rol_idx on actores(rol);

create table lotes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nombre text not null,
  ubicacion text,
  area_m2 numeric,
  estado_juridico text,
  restricciones text,
  propietario_id uuid references actores(id) on delete set null,
  created_at timestamptz not null default now()
);
create index lotes_propietario_id_idx on lotes(propietario_id);

create table proyectos (
  id uuid primary key default gen_random_uuid(),
  lote_id uuid not null references lotes(id) on delete cascade,
  etapa etapa_proyecto not null default 'captacion',
  modalidad_negociacion modalidad_negociacion not null,
  estado text,
  created_at timestamptz not null default now()
);
create index proyectos_lote_id_idx on proyectos(lote_id);
create index proyectos_etapa_idx on proyectos(etapa);

create table necesidades (
  id uuid primary key default gen_random_uuid(),
  proyecto_id uuid not null references proyectos(id) on delete cascade,
  tipo rol_actor not null,
  descripcion text,
  estado text not null default 'abierta',
  created_at timestamptz not null default now()
);
create index necesidades_proyecto_id_idx on necesidades(proyecto_id);
create index necesidades_estado_idx on necesidades(estado);

create table documentos (
  id uuid primary key default gen_random_uuid(),
  lote_id uuid references lotes(id) on delete cascade,
  proyecto_id uuid references proyectos(id) on delete cascade,
  url text not null,
  nombre text,
  created_at timestamptz not null default now(),
  constraint documentos_lote_o_proyecto check (lote_id is not null or proyecto_id is not null)
);
create index documentos_lote_id_idx on documentos(lote_id);
create index documentos_proyecto_id_idx on documentos(proyecto_id);

create table intervenciones (
  id uuid primary key default gen_random_uuid(),
  proyecto_id uuid not null references proyectos(id) on delete cascade,
  integrador_id uuid not null references actores(id) on delete restrict,
  capacidad capacidad_intervencion not null,
  terminos text,
  created_at timestamptz not null default now()
);
create index intervenciones_proyecto_id_idx on intervenciones(proyecto_id);
create index intervenciones_integrador_id_idx on intervenciones(integrador_id);

-- RLS: catálogo de lotes/proyectos es público de lectura; escritura queda
-- restringida al backend (service role) hasta que se defina auth por rol.
alter table organizaciones enable row level security;
alter table actores enable row level security;
alter table lotes enable row level security;
alter table proyectos enable row level security;
alter table necesidades enable row level security;
alter table documentos enable row level security;
alter table intervenciones enable row level security;

create policy "lotes son de lectura publica" on lotes for select using (true);
create policy "proyectos son de lectura publica" on proyectos for select using (true);
create policy "necesidades son de lectura publica" on necesidades for select using (true);
