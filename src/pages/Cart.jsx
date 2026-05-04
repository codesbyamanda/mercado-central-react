import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCategory, formatCurrency } from "../utils/format";

function Cart() {
  const {
    items,
    totalQuantity,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const freeShippingTarget = 250;
  const shipping = subtotal >= freeShippingTarget || subtotal === 0 ? 0 : 14.9;
  const total = subtotal + shipping;
  const remainingForFreeShipping = Math.max(freeShippingTarget - subtotal, 0);

  function finishOrder() {
    window.alert(
      "Pedido finalizado com sucesso! Esta é uma simulação para o projeto."
    );

    clearCart();
  }

  if (items.length === 0) {
    return (
      <section className="container cart-page">
        <div className="empty-cart-card">
          <span className="empty-icon">🧺</span>

          <h1>Seu carrinho está vazio</h1>

          <p>
            Adicione produtos do mercado para simular sua compra e testar o
            comportamento da aplicação.
          </p>

          <Link to="/" className="primary-button">
            Ver produtos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container cart-page">
      <div className="page-title">
        <span className="eyebrow dark">Carrinho</span>
        <h1>Minha compra</h1>
        <p>
          Você possui {totalQuantity}{" "}
          {totalQuantity === 1 ? "item" : "itens"} no carrinho.
        </p>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />

              <div className="cart-item-info">
                <span>{formatCategory(item.category)}</span>
                <h2>{item.title}</h2>
                <p>{formatCurrency(item.price)} cada</p>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remover
                </button>
              </div>

              <div className="cart-item-total">
                <div className="quantity-control">
                  <button
                    type="button"
                    className="qty-button"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>

                  <strong>{item.quantity}</strong>

                  <button
                    type="button"
                    className="qty-button"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <strong>{formatCurrency(item.price * item.quantity)}</strong>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Resumo do pedido</h2>

          <div className="summary-line">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>

          <div className="summary-line">
            <span>Frete</span>
            <strong>{shipping === 0 ? "Grátis" : formatCurrency(shipping)}</strong>
          </div>

          {remainingForFreeShipping > 0 && (
            <p className="free-shipping-hint">
              Faltam {formatCurrency(remainingForFreeShipping)} para frete
              grátis.
            </p>
          )}

          <div className="summary-line total-line">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>

          <button
            type="button"
            className="primary-button checkout-button"
            onClick={finishOrder}
          >
            Finalizar pedido
          </button>

          <button type="button" className="ghost-button" onClick={clearCart}>
            Limpar carrinho
          </button>
        </aside>
      </div>
    </section>
  );
}

export default Cart;