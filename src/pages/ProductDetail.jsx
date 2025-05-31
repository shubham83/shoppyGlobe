import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import Rating from "../components/Rating";
import Spinner from "../components/Spinner";
import "./ProductDetail.css";

function ProductDetail() {
    // Local state for product data, loading status, error message, and selected quantity
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    // Get productId from the URL params
    const { productId } = useParams();
    // Redux dispatch function to dispatch actions
    const dispatch = useDispatch()
    // React Router navigate function to programmatically navigate
    const navigate = useNavigate();
    // Fetch product details when  productId changes
    useEffect(() => {
        async function fetchProduct() {

            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://dummyjson.com/products/${productId}`);
                if (!res.ok) {
                    if (res.status === 404) {
                        throw new Error("Product not found");

                    } else {
                        throw new Error("Failed to fetch product");
                    }
                }

                const data = await res.json();
                setProduct(data);

            } catch (err) {
                setError(err.message || "Something went wrong");
            }
            finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [productId]);
    // Handler to add the current product with selected quantity to the cart
    const handleAddToCart = () => {
        const productToAdd = {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: quantity,
            image: product.images[0],
        };
        // Dispatch action to add product to cart in Redux store
        dispatch(addToCart(productToAdd))
        // Navigate to the cart page after adding
        navigate("/cart");
    };
    // Show spinner while loading data
    if (loading) return <Spinner />;
    // Show error message if fetch failed
    if (error) return <p>Error: {error}</p>;
    // Show message if no product found 
    if (!product || !product.id) return <p>No product found.</p>;

    return (

        <div className="product-detail-container">
            {/* Product image section */}
            <div className="product-detail-image">
                <img src={product.images[0]} alt={product.title} />
            </div>

            {/* Product information section */}
            <div className="product-detail-info">
                <h1 className="product-detail-title">{product.title}</h1>
                <p className="product-detail-brand">
                    Brand: <span>{product.brand}</span>
                </p>
                <p className="product-detail-price">Price : <span>₹{product.price}</span> ({product.discountPercentage}% off) <span></span></p>

                <p className="product-detail-rating">Rating: <span><Rating rating={product.rating} /></span></p>
                <div className="product-detail-description">
                    Description :
                    <p>{product.description}</p>
                </div>

                {/* Quantity selection and Add to Cart button */}
                <div className="product-detail-purchase">
                    <label htmlFor="quantity">Quantity:</label>
                    {/* Quantity dropdown from 1 to 10 */}
                    <select id="quantity" name="quantity" onChange={(e) => {
                        setQuantity(Number(e.target.value))
                    }}>
                        {/* [...Array(10).keys()] creates an array [0,1,2,...,9].
                       We add 1 to each index so the dropdown shows 1–10 instead of 0–9. */}
                        {[...Array(10).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <button className="product-detail-add-to-cart-btn " onClick={handleAddToCart}> Add to Cart</button>
                </div>
            </div>
        </div>

    );
}

export default ProductDetail;
