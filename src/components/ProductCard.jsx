import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCategory } from "../utils/format";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const hasDiscount = Number(product.discountPercentage) > 0;

  const originalPrice = hasDiscount
    ? product.price / (1 - product.discountPercentage / 100)
    : null;

  const formatPrice = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const discountValue = Math.round(product.discountPercentage || 0);

  return (
    <article className="store-card-pro">
      <div className="store-card-pro-media">
        {hasDiscount && (
          <span className="store-card-pro-badge">-{discountValue}%</span>
        )}

        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className="store-card-pro-body">
        <div className="store-card-pro-meta">
          <span className="store-card-pro-category">
            {formatCategory(product.category)}
          </span>

          <span className="store-card-pro-rating">
            <Star size={14} fill="currentColor" />
            {Number(product.rating).toFixed(1)}
          </span>
        </div>

        <h3 className="store-card-pro-title">{product.title}</h3>

        <p className="store-card-pro-description">{product.description}</p>

        <div className="store-card-pro-stock">
          <span>Estoque</span>
          <strong>{product.stock} un.</strong>
        </div>

        <div className="store-card-pro-price-block">
          {originalPrice && (
            <small className="store-card-pro-old-price">
              de {formatPrice(originalPrice)}
            </small>
          )}

          <strong className="store-card-pro-price">
            {formatPrice(product.price)}
          </strong>

          <span className="store-card-pro-price-note">
            preço especial online
          </span>
        </div>

        <div className="store-card-pro-actions">
          <Link
            to={`/produto/${product.id}`}
            className="store-card-pro-button secondary"
          >
            Detalhes
          </Link>

          <button
            type="button"
            className="store-card-pro-button primary"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={16} />
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;