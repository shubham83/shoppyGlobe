import "./Productitem.css"
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { incrementQuantity,decrementQuantity,addToCart} from "../store/cartSlice";
import { useDispatch ,useSelector} from "react-redux";
function ProductItem({ product }) {

    // Get current product quantity from Redux store; 0 if not in cart yet
    const cartItem = useSelector((state) =>
        state.cart.items?.find((item) => item.id === product.id)
    );
    const quantity = cartItem?.quantity || 0;

    const dispatch = useDispatch()
     // Dispatch action to add product with quantity 1 to cart
   const handleAddFirstTime = () => {
        const productToAdd = {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            image: product.images[0],
        };
        dispatch(addToCart(productToAdd)); 
    };
        // Dispatch action to increment quantity of product in cart
   const handleIncrement = () => {
        dispatch(incrementQuantity({ id: product.id }));
    };
// Dispatch action to decrement quantity of product in cart
    const handleDecrement = () => {
        dispatch(decrementQuantity({ id: product.id }));
    };

  return (
        <>
            <div className="product-card">
                 {/* Clicking on image/title/rating navigates to product details page */}
                <Link to={`/product-details/${product.id}`}>
                    <img src={product.images[0]} alt={product.title} className="product-image" />
                    <h3 className="product-title">{product.title}</h3>
                    <Rating rating={product.rating} />

                    <p className="product-price">₹{product.price}</p>
                </Link>
                   {/* Show "Add to Cart" button if quantity=0, else show quantity controls */}
                {quantity === 0 ? (
                    <button className="add-to-cart-btn" onClick={handleAddFirstTime}>
                        Add to Cart
                    </button>
                ) : (
                    <div className="quantity-controls">
                        <button onClick={handleDecrement}>-</button>
                        <span>{quantity}</span>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                )}

            </div>
        </>
    )
}
export default ProductItem;