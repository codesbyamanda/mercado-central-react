import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  Box,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { getProductById } from "../services/api";
import {
  formatCategory,
  formatCurrency,
  getStockStatus,
} from "../utils/format";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProductDetails() {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        if (active) {
          setProduct(data);
          setSelectedImage(data.thumbnail || data.images?.[0] || "");
        }
      } catch (err) {
        if (active) {
          setError("Não foi possível carregar os detalhes do produto.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProductDetails();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <section className="detail-pro-page">
        <div className="container">
          <div className="detail-pro-loading">
            <div className="spinner"></div>
            <p>Carregando produto...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="detail-pro-page">
        <div className="container">
          <Link to="/" className="detail-pro-back">
            <ArrowLeft size={18} />
            Voltar para o mercado
          </Link>

          <div className="empty-state">
            <h2>Produto não encontrado</h2>
            <p>{error || "Volte para a página inicial e escolha outro item."}</p>
          </div>
        </div>
      </section>
    );
  }

  const images = product.images?.length ? product.images : [product.thumbnail];

  const specs = [
    {
      icon: BadgeCheck,
      label: "Marca",
      value: product.brand || "Não informado",
    },
    {
      icon: Box,
      label: "SKU",
      value: product.sku || "Não informado",
    },
    {
      icon: ShieldCheck,
      label: "Garantia",
      value: product.warrantyInformation || "Não informado",
    },
    {
      icon: Truck,
      label: "Entrega",
      value: product.shippingInformation || "Envio padrão",
    },
    {
      icon: RotateCcw,
      label: "Devolução",
      value: product.returnPolicy || "Não informado",
    },
    {
      icon: PackageCheck,
      label: "Pedido mínimo",
      value: `${product.minimumOrderQuantity || 1} unidade(s)`,
    },
  ];

  return (
    <section className="detail-pro-page">
      <div className="container detail-pro-container">
        <Link to="/" className="detail-pro-back">
          <ArrowLeft size={18} />
          Voltar para o mercado
        </Link>

        <div className="detail-pro-layout">
          <aside className="detail-pro-gallery-card">
            <div className="detail-pro-image-box">
              {product.discountPercentage > 0 && (
                <span className="detail-pro-discount">
                  -{Math.round(product.discountPercentage)}%
                </span>
              )}

              <img src={selectedImage} alt={product.title} />
            </div>

            <div className="detail-pro-thumbs">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  className={
                    selectedImage === image
                      ? "detail-pro-thumb active"
                      : "detail-pro-thumb"
                  }
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Imagem ${index + 1}`}
                >
                  <img src={image} alt={`${product.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          </aside>

          <article className="detail-pro-info-card">
            <div className="detail-pro-heading">
              <span className="detail-pro-category">
                {formatCategory(product.category)}
              </span>

              <h1>{product.title}</h1>

              <p>{product.description}</p>
            </div>

            <div className="detail-pro-status-row">
              <span>
                <Star size={15} fill="currentColor" />
                {Number(product.rating).toFixed(1)}
              </span>

              <span>{getStockStatus(product.stock)}</span>

              <span>{product.stock} unidades</span>
            </div>

            <div className="detail-pro-buy-box">
              <div>
                <small>Preço online</small>
                <strong>{formatCurrency(product.price)}</strong>
                <span>
                  {product.discountPercentage}% de desconto aplicado neste item.
                </span>
              </div>

              <button
                type="button"
                className="detail-pro-cart-button"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart size={18} />
                Adicionar ao carrinho
              </button>
            </div>

            <div className="detail-pro-specs">
              {specs.map(({ icon: Icon, label, value }) => (
                <div className="detail-pro-spec" key={label}>
                  <span className="detail-pro-spec-icon">
                    <Icon size={17} />
                  </span>

                  <div>
                    <small>{label}</small>
                    <strong>{value}</strong>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        {product.reviews?.length > 0 && (
          <section className="detail-pro-reviews">
            <div className="detail-pro-reviews-head">
              <div>
                <span>Avaliações</span>
                <h2>O que os clientes acharam</h2>
              </div>

              <p>
                Comentários simulados da API para representar uma experiência de
                compra real.
              </p>
            </div>

            <div className="detail-pro-reviews-grid">
              {product.reviews.slice(0, 3).map((review, index) => (
                <article className="detail-pro-review" key={index}>
                  <div className="detail-pro-review-rating">
                    <Star size={15} fill="currentColor" />
                    <strong>{review.rating}</strong>
                  </div>

                  <p>{review.comment}</p>

                  <footer>
                    <strong>{review.reviewerName}</strong>
                    <span>Cliente Mercado Central</span>
                  </footer>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

export default ProductDetails;