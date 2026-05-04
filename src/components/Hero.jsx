import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, ShoppingCart, Truck } from "lucide-react";

function Hero() {
  return (
    <section className="hero-fullscreen">
      <div className="hero-overlay"></div>

      <div className="container hero-fullscreen-content">
        <div className="hero-text-block">

          <h1>
            Tudo o que você precisa,
            <br />
            em um só lugar.
          </h1>

          <p>
            Um catálogo moderno com produtos de diferentes categorias para
            simular uma experiência real de compra online, com busca, filtros,
            detalhes do produto e carrinho.
          </p>

          <div className="hero-buttons">
            <a href="#produtos" className="primary-button">
              Explorar produtos
              <ArrowRight size={18} />
            </a>

            <Link to="/carrinho" className="secondary-light-button">
              <ShoppingCart size={18} />
              Ver carrinho
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;