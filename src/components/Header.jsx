import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

function Header() {
  const { totalQuantity } = useCart();

  function getNavClass({ isActive }) {
    return isActive ? "market-nav-link active" : "market-nav-link";
  }

  function getCartClass({ isActive }) {
    return isActive
      ? "market-nav-link market-cart-link active"
      : "market-nav-link market-cart-link";
  }

  return (
    <header className="market-header">
      <div className="market-header-inner">
        <Link to="/" className="market-brand" aria-label="Mercado Central">
          <span className="market-brand-mark">MC</span>

          <span className="market-brand-text">
            <strong>Mercado Central</strong>
            <small>Supermercado digital</small>
          </span>
        </Link>

        <nav className="market-nav" aria-label="Navegação principal">
          <NavLink to="/" className={getNavClass}>
            Início
          </NavLink>

          <NavLink to="/sobre" className={getNavClass}>
            Sobre
          </NavLink>

          <NavLink to="/carrinho" className={getCartClass}>
            <ShoppingCart size={17} strokeWidth={2.3} />
            <span>Carrinho</span>
            <span className="market-cart-count">{totalQuantity}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;