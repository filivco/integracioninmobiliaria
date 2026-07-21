-- Proyectos siniestrados: obra parada, promotor insolvente, litigio,
-- licencia vencida, etc. Es la vitrina de la capa de negocio — donde
-- el Integrador interviene para rescatar un proyecto detenido, no solo
-- cubrir una necesidad puntual. situacion es independiente de etapa:
-- un proyecto puede quedar siniestrado en cualquier etapa del ciclo.

create type situacion_proyecto as enum ('normal', 'siniestrado');

alter table proyectos
  add column situacion situacion_proyecto not null default 'normal',
  add column motivo_siniestro text;
