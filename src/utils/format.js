export function formatCurrency(value) {
  const number = Number(value) || 0;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
}

export function formatCategory(category = "") {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getStockStatus(stock) {
  if (stock <= 0) {
    return "Indisponível";
  }

  if (stock <= 10) {
    return "Últimas unidades";
  }

  return "Em estoque";
}