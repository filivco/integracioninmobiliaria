-- Histórico de acciones sobre un lote/proyecto, con visibilidad
-- pública o privada. La policy de lectura pública solo expone
-- 'publica' — hoy, sin autenticación por rol, es la regla correcta;
-- cuando exista auth se agrega una policy adicional para el equipo
-- del proyecto (propietario, integrador, actores con intervención
-- activa) sin tocar esta.

create type visibilidad_evento as enum ('publica', 'privada');

create table eventos (
  id uuid primary key default gen_random_uuid(),
  lote_id uuid not null references lotes(id) on delete cascade,
  proyecto_id uuid references proyectos(id) on delete cascade,
  actor_id uuid references actores(id) on delete set null,
  visibilidad visibilidad_evento not null default 'publica',
  descripcion text not null,
  created_at timestamptz not null default now()
);
create index eventos_lote_id_idx on eventos(lote_id);
create index eventos_proyecto_id_idx on eventos(proyecto_id);
create index eventos_created_at_idx on eventos(created_at);

alter table eventos enable row level security;

create policy "eventos publicos son de lectura publica" on eventos
  for select using (visibilidad = 'publica');
