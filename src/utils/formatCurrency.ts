export function formatCurrency(currency?: number) {

if (!currency) return "-";  

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR"
  }).format(currency);
}