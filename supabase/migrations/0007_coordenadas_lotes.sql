-- Coordenadas del lote, para ubicarlo en el mapa. Nullable: un lote
-- publicado sin coordenadas simplemente no aparece en /mapa, no rompe
-- nada del resto de la plataforma.

alter table lotes
  add column latitud numeric,
  add column longitud numeric;
