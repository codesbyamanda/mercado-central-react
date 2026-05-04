import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h2>Mercado React</h2>
          <p>
            Projeto desenvolvido em ReactJS consumindo a API DummyJSON Products.
          </p>
        </div>

        <div>
          <h3>Navegação</h3>
          <Link to="/">Produtos</Link>
          <Link to="/carrinho">Carrinho</Link>
          <Link to="/sobre">Sobre o projeto</Link>
        </div>

        <div>
          <h3>Recursos usados</h3>
          <p>React Router</p>
          <p>Context API</p>
          <p>Fetch API</p>
          <p>LocalStorage</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;