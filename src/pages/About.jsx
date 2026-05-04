import { Link } from "react-router-dom";
import {
  ArrowRight,
  Boxes,
  Code2,
  Database,
  Filter,
  Layers,
  MonitorSmartphone,
  Route,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

const projectHighlights = [
  {
    icon: Database,
    title: "API DummyJSON Products",
    description:
      "A aplicação consome a rota de produtos da DummyJSON para exibir dados reais de uma API externa.",
  },
  {
    icon: Route,
    title: "Rotas com React Router",
    description:
      "O projeto possui navegação entre página inicial, detalhes do produto, carrinho e página sobre.",
  },
  {
    icon: ShoppingCart,
    title: "Carrinho de compras",
    description:
      "Os produtos podem ser adicionados ao carrinho, com controle de quantidade e persistência local.",
  },
];

const features = [
  "Listagem de produtos vindos da API",
  "Página individual de detalhes do produto",
  "Busca por nome, descrição, categoria ou marca",
  "Filtro por categoria",
  "Ordenação por preço, avaliação e desconto",
  "Carrinho com Context API",
  "Armazenamento no LocalStorage",
  "Interface responsiva",
];

const stack = [
  "ReactJS",
  "Vite",
  "React Router DOM",
  "Context API",
  "Fetch API",
  "LocalStorage",
  "CSS responsivo",
  "Lucide React",
];

function About() {
  return (
    <section className="about-pro-page">
      <div className="container about-pro-container">
        <section className="about-pro-hero">
          <div className="about-pro-hero-content">
            <span className="about-pro-kicker">Projeto acadêmico</span>

            <h1>Supermercado digital desenvolvido com React e API externa.</h1>

            <p>
              O Mercado Central é uma aplicação criada para simular uma
              experiência de compra online, utilizando ReactJS para construção da
              interface e a API DummyJSON Products para carregar os produtos,
              detalhes e informações complementares.
            </p>

            <div className="about-pro-actions">
              <Link to="/" className="primary-button">
                Ver produtos
                <ArrowRight size={18} />
              </Link>

              <a
                href="https://dummyjson.com/docs/products"
                target="_blank"
                rel="noreferrer"
                className="about-pro-link-button"
              >
                Documentação da API
              </a>
            </div>
          </div>

          <aside className="about-pro-summary">
            <div className="about-pro-summary-icon">
              <Sparkles size={24} />
            </div>

            <h2>Objetivo da atividade</h2>

            <p>
              Criar uma aplicação React que realize requisições HTTP em uma API,
              com página de listagem e página de detalhes para um item
              selecionado.
            </p>

            <div className="about-pro-summary-grid">
              <div>
                <strong>2+</strong>
                <span>páginas</span>
              </div>

              <div>
                <strong>API</strong>
                <span>externa</span>
              </div>

              <div>
                <strong>SPA</strong>
                <span>React</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="about-pro-section">
          <div className="about-pro-section-head">
            <span>Implementação</span>
            <h2>Principais recursos desenvolvidos</h2>
            <p>
              A aplicação foi estruturada para atender aos requisitos da
              atividade e também apresentar uma experiência visual mais próxima
              de um e-commerce real.
            </p>
          </div>

          <div className="about-pro-highlight-grid">
            {projectHighlights.map(({ icon: Icon, title, description }) => (
              <article className="about-pro-highlight-card" key={title}>
                <span>
                  <Icon size={22} />
                </span>

                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-pro-split">
          <article className="about-pro-panel">
            <div className="about-pro-panel-title">
              <Layers size={20} />
              <h2>Funcionalidades</h2>
            </div>

            <ul className="about-pro-check-list">
              {features.map((feature) => (
                <li key={feature}>
                  <span></span>
                  {feature}
                </li>
              ))}
            </ul>
          </article>

          <article className="about-pro-panel">
            <div className="about-pro-panel-title">
              <Code2 size={20} />
              <h2>Tecnologias usadas</h2>
            </div>

            <div className="about-pro-stack-list">
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </section>

        <section className="about-pro-process">
          <div className="about-pro-process-card">
            <span className="about-pro-process-number">01</span>
            <div>
              <h3>Listagem</h3>
              <p>
                A página inicial faz uma requisição para buscar os produtos e
                exibe os itens em formato de cards.
              </p>
            </div>
          </div>

          <div className="about-pro-process-card">
            <span className="about-pro-process-number">02</span>
            <div>
              <h3>Detalhamento</h3>
              <p>
                Ao clicar em um produto, uma nova requisição é feita para buscar
                as informações completas daquele item.
              </p>
            </div>
          </div>

          <div className="about-pro-process-card">
            <span className="about-pro-process-number">03</span>
            <div>
              <h3>Experiência</h3>
              <p>
                A interface inclui filtros, ordenação, carrinho e layout
                responsivo para tornar o projeto mais completo.
              </p>
            </div>
          </div>
        </section>

        <section className="about-pro-final-card">
          <div>
            <span>Entrega do projeto</span>
            <h2>Aplicação pronta para hospedagem na Vercel.</h2>
            <p>
              O projeto atende ao fluxo solicitado: listagem de produtos,
              detalhes de item selecionado, requisições em API externa e
              interface React com comportamento dinâmico.
            </p>
          </div>

          <Link to="/" className="primary-button">
            Explorar catálogo
            <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </section>
  );
}

export default About;