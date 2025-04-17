import React, { lazy, Suspense, useState, useEffect } from "react";
import PropTypes from "prop-types";
import jumpTo from "../../modules/Navigation";
import SkeletonProduct from "./SkeltonProduct";
import EmptyList from "./EmptyList";
import styles from "./NewArrivals.module.css";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
const SingleProduct = lazy(() => import("./SingleProduct"));

const PRODUCTS_PER_PAGE = 8;

const NewArrivals = ({ products: initialProducts, departments, addToBag }) => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedOption, setSelectedOption] = useState("All");
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);

  const handleNavigate = (productId) => {
    jumpTo(`/fashion-cube/single-product/${productId}`);
  };

  const handleAddToCart = (productId) => {
    addToBag(productId);
  };

  const optionClicked = (option) => {
    setIsLoading(true);
    setSelectedOption(option);
    setPage(1);

    let filtered =
      option === "All"
        ? initialProducts
        : initialProducts.filter((item) => item.department === option);

    setProducts(filtered);
    setNotFound(filtered.length === 0);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);

    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const currentItems = products.slice(start, end);

    setPaginatedProducts(currentItems);
    setIsLoading(false);
  }, [products, page]);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  return (
    <div className={styles.NewArrivals}>
      <div className={styles.wrapper}>
        <div className={`${styles.sectionTitle}`} data-aos="fade-down">
          <h1>New Arrivals</h1>
        </div>

        <div className={styles.tabs} data-aos="fade-left">
          <button
            onClick={() => optionClicked("All")}
            className={`${styles.tabButton} ${
              selectedOption === "All" ? styles.active : ""
            }`}
            aria-label="Filter by all products"
          >
            All
          </button>
          {departments.map((dep) => (
            <button
              key={dep}
              onClick={() => optionClicked(dep)}
              className={`${styles.tabButton} ${
                selectedOption === dep ? styles.active : ""
              }`}
              aria-label={`Filter by ${dep} products`}
            >
              {dep}
            </button>
          ))}
        </div>

        <div className={styles.productGrid}>
          {isLoading ? (
            Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
              <SkeletonProduct key={i} type="product" />
            ))
          ) : notFound ? (
            <EmptyList message="No Products Found." />
          ) : (
            paginatedProducts.map((item, i) => (
              <div data-aos="zoom-in" data-aos-delay={i * 100}>
                <Suspense fallback={<SkeletonProduct type="product" />} key={i}>
                  <SingleProduct
                    productItem={item}
                    onNavigate={handleNavigate}
                    onAddToCart={handleAddToCart}
                  />
                </Suspense>
              </div>
            ))
          )}
        </div>

        {!notFound && !isLoading && totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
            >
              <FaChevronCircleLeft />
            </button>
            <span>Page{page}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              <FaChevronCircleRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

NewArrivals.propTypes = {
  products: PropTypes.array.isRequired,
  departments: PropTypes.array.isRequired,
  addToBag: PropTypes.func.isRequired,
};

export default NewArrivals;
