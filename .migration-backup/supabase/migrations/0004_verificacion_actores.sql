-- Estado de verificación del actor. Se usa hoy sobre todo para
-- propietarios: verificado (identidad y titularidad confirmadas),
-- en_revision (postulado, pendiente de validar) o confidencial
-- (propietario que pidió no exponer su identidad públicamente —
-- la ficha del lote debe ocultar su nombre en vistas públicas).

create type estado_verificacion as enum ('verificado', 'en_revision', 'confidencial');

alter table actores
  add column estado_verificacion estado_verificacion not null default 'en_revision';
