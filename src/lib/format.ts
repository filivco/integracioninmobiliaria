export function formatCOP(valor: number) {
  if (valor >= 1_000_000) {
    return `$${(valor / 1_000_000).toLocaleString("es-CO", { maximumFractionDigits: 1 })} M`;
  }
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}
