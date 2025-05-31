
import { useDispatch } from "react-redux";
import {  incrementQuantity, decrementQuantity, removeProduct } from "../store/cartSlice";
import { Link } from "react-router-dom";
import "./CartItem.css";

function CartItem({ item }) {
  const dispatch = useDispatch();
 // Dispatch action to remove product from cart by id
  const handleRemove = (id) => {
    dispatch(removeProduct({ id }));
  };

  return (
    <div className="cart-item">
       {/* Link to product details page */}
        <Link to={`/product-details/${item.id}`}>
            <img src={item.image} alt={item.title} className="cart-item-img" />
        </Link>
  
      <div className="cart-item-details">
        <h3>{item.title}</h3>
         {/* Show price with 2 decimal points */}
        <p>₹{item.price.toFixed(2)}</p>
          {/* Quantity controls: decrement, show quantity, increment */}
        <div className="cart-quantity-control">
          <button onClick={() => dispatch(decrementQuantity({ id: item.id }))}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(incrementQuantity(item))}>+</button>
        </div>
        {/* Button to remove item from cart */}
        <button className="remove-btn" onClick={() => handleRemove(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
