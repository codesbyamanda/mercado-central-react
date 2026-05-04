import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import CustomSelect from "../components/CustomSelect";
import { getProducts } from "../services/api";
import { formatCategory } from "../utils/format";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("relevance");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Não foi possível carregar os produtos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))].sort();
  }, [products]);

  const categoryOptions = useMemo(() => {
    return [
      { value: "all", label: "Todas as categorias" },
      ...categories.map((category) => ({
        value: category,
        label: formatCategory(category),
      })),
    ];
  }, [categories]);

  const sortOptions = [
    { value: "relevance", label: "Relevância" },
    { value: "price-asc", label: "Menor preço" },
    { value: "price-desc", label: "Maior preço" },
    { value: "rating", label: "Melhor avaliação" },
    { value: "discount", label: "Maior desconto" },
  ];

  const filteredProducts = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    const filtered = products.filter((product) => {
      const productText = `
        ${product.title}
        ${product.description}
        ${product.category}
        ${product.brand || ""}
      `.toLowerCase();

      const matchesSearch = !searchValue || productText.includes(searchValue);

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    const sorted = [...filtered];

    switch (sortOption) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);

      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);

      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);

      case "discount":
        return sorted.sort(
          (a, b) => b.discountPercentage - a.discountPercentage
        );

      default:
        return sorted;
    }
  }, [products, search, selectedCategory, sortOption]);

  const hasActiveFilters =
    search !== "" || selectedCategory !== "all" || sortOption !== "relevance";

  function clearFilters() {
    setSearch("");
    setSelectedCategory("all");
    setSortOption("relevance");
  }

  return (
    <>
      <Hero />

      <section className="catalog-pro" id="produtos">
        <div className="container">
          <div className="catalog-pro-head">
            <h2>Escolha produtos com mais clareza e praticidade</h2>

            <p>
              Navegue pelo catálogo, filtre por categoria, ordene os resultados
              e encontre rapidamente o que precisa em uma interface mais limpa,
              organizada e profissional.
            </p>
          </div>

          <div className="catalog-pro-panel">
            <div className="catalog-pro-panel-head">
            <div className="catalog-pro-panel-title">
              <SlidersHorizontal size={18} />
              <span>Filtros do catálogo</span>
            </div>

            <div className="catalog-panel-actions">
              {!loading && !error && (
                <span className="catalog-count-pill">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1
                    ? "produto encontrado"
                    : "produtos encontrados"}
                </span>
              )}

              {hasActiveFilters && (
                <button
                  type="button"
                  className="catalog-clear-button"
                  onClick={clearFilters}
                >
                  <X size={16} />
                  Limpar filtros
                </button>
              )}
            </div>
          </div>

            <div className="catalog-pro-controls">
              <label className="catalog-field catalog-field-search">
                <span>Buscar produto</span>

                <div className="catalog-control catalog-search-control">
                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Ex: cat food, motorcycle, nike etc..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>
              </label>

              <CustomSelect
                label="Categoria"
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={categoryOptions}
              />

              <CustomSelect
                label="Ordenar por"
                value={sortOption}
                onChange={setSortOption}
                options={sortOptions}
              />
            </div>
          </div>


          {error && <div className="error-box">{error}</div>}

          {loading ? (
            <div className="catalog-grid">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <>

              <div className="catalog-grid">
                {filteredProducts.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h2>Nenhum produto encontrado</h2>

              <p>
                Tente alterar os filtros ou limpar a busca para visualizar
                novamente os produtos disponíveis.
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={clearFilters}
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;