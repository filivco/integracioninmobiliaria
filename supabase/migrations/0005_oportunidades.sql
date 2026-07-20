-- Renombra la entidad Necesidad a Oportunidad. Mismas columnas, mismo
-- significado — es un cambio de nombre de producto (se comunica mejor
-- como "oportunidad" para un actor externo que como "necesidad").

alter table necesidades rename to oportunidades;
alter index necesidades_proyecto_id_idx rename to oportunidades_proyecto_id_idx;
alter index necesidades_estado_idx rename to oportunidades_estado_idx;
alter policy "necesidades son de lectura publica" on oportunidades
  rename to "oportunidades son de lectura publica";
