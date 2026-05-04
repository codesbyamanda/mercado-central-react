function ProductSkeleton() {
  return (
    <article className="product-card skeleton-card" aria-hidden="true">
      <div className="skeleton-image"></div>

      <div className="skeleton-content">
        <div className="skeleton-line small"></div>
        <div className="skeleton-line title"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line price"></div>
      </div>
    </article>
  );
}

export default ProductSkeleton;