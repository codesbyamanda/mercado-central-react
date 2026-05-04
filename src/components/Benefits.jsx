import {
  BadgePercent,
  Search,
  ShoppingBasket,
  Truck,
} from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Navegação de compra",
    description:
      "Estrutura pensada como loja online, com fluxo claro e mais profissional.",
  },
  {
    icon: Search,
    title: "Busca e filtros",
    description:
      "Pesquise produtos por nome, descrição, marca e categoria com facilidade.",
  },
  {
    icon: BadgePercent,
    title: "Preços e descontos",
    description:
      "Os cards destacam avaliação, estoque e desconto de forma mais organizada.",
  },
  {
    icon: ShoppingBasket,
    title: "Carrinho persistente",
    description:
      "Os itens do carrinho ficam salvos localmente no navegador do usuário.",
  },
];

function Benefits() {
  return (
    <section className="benefits">
      <div className="container benefit-grid">
        {benefits.map(({ icon: Icon, title, description }) => (
          <article className="benefit-card" key={title}>
            <span className="benefit-icon">
              <Icon size={20} strokeWidth={2.2} />
            </span>

            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Benefits;