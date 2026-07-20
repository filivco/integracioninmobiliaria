-- Valor del lote (estimación del propietario al postular) y valor
-- potencial de ventas del proyecto (depende de lo que se construya,
-- por eso vive en proyectos y no en lotes).

alter table lotes
  add column valor_lote numeric;

alter table proyectos
  add column valor_potencial_ventas numeric;
