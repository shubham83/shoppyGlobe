import { useEffect, useState } from "react";

// Custom hook to fetch product data from an API
export function useFetchProducts() {

    // Local state for product data, error message, and loading status
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
         // Reset error and set loading to true before starting fetch
        setError(null);
        setLoading(true);
         // Async function to fetch product data
        async function fetchProducts() {
            try {
                const res = await fetch("https://dummyjson.com/products");
                 // If response is not OK, throw an error with status
                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }

                const data = await res.json();
                setProducts(data.products)

            }
            catch (err) {
                // Set error message if fetch fails
                setError(err.message || "Failed to fetch products");
            }
            finally {
                 // stop loading once fetch is complete (success or fail)
                setLoading(false);
            }
        }
        fetchProducts();
    }, [])
 // Return products, error, and loading state for use in components
    return { products, error, loading }
}