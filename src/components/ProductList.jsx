import { useFetchProducts } from "../hooks/useFetchProducts";
import ProductItem from "./ProductItem";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "./Spinner";
import "./ProductList.css"

function ProductList() {
 // Custom hook to fetch products, loading status, and any error
    const { products, error, loading } = useFetchProducts()
     // Local state for search input value
    const [searchTerm, setSearchTerm] = useState("");
      // Local state to hold filtered products based on search or default list
    const [filtered, setFiltered] = useState([]);
     // React Router hook to get current location path
    const location=useLocation();
    // On mount or when products/location change, if on home page ('/'), set filtered to all products

    useEffect(() => {
        if (products.length > 0 && location.pathname === '/') {
            setFiltered(products);
            setSearchTerm(""); 
        }
    }, [products,location]);
 // Handle typing in search input, update local search term state
const handleSearchInputChange = (e) => {
  const value = e.target.value;
  setSearchTerm(value);
};

    // Filter products by title matching the search term (case-insensitive)
    // If search term empty, reset to all products
    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setFiltered(products);
        } else {
            const filteredResults = products.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFiltered(filteredResults);
        }
    };
  // Trigger search when Enter key is pressed inside the input box
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
     // Show spinner while loading
    if (loading) return <Spinner />;
    // Show error message if fetching products failed
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <>
            <div className="product-list-container">
                <div className="products-search-row">
                    <h2 className="products-heading">Products</h2>
                    <div className="search-bar-container">
                                {/* Search input */}
                        <input type="text" placeholder="Search products..." className="search-bar" value={searchTerm}  onChange={handleSearchInputChange} onKeyDown={handleKeyDown} />
                         {/* Search button */}
                        <button className="search-btn" onClick={handleSearch}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
                <div className="product-list">
                       {/* Product list or no results message */}
                    {filtered.length > 0 ? (
                        filtered.map(product => (

                            <ProductItem key={product.id} product={product} />

                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>

        </>
    )
}
export default ProductList;