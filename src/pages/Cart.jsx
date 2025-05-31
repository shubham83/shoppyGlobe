
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
    // Access cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  // Calculate the total price of all cart items
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
         {/* Show message if cart is empty */}
      {cartItems.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        <>
         {/* Render list of cart items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
            {/* Show total price and checkout button */}
          <div className="cart-total">
            <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
            <Link to="/checkout">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
