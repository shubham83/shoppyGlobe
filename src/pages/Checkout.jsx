import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeProduct } from "../store/cartSlice";
import "./Checkout.css"

function Checkout() {
// Local state for selected payment method
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    // Local state to toggle address edit mode
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    // Local state to control visibility of the order confirmation modal
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");
    // Redux state selector to get cart items from global store
    const cartItems = useSelector((state) => state.cart.items);
    // Redux hooks for navigation and dispatching actions
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // User address state (default values pre-filled)
    const [address, setAddress] = useState({
        name: "Shubham Poddar",
        phone: "7011636522",
        address: "9/4740 old seelampur, Delhi-110053",
    });

    // Function to handle checkout - clears cart and shows confirmation modal
    const handleProceed = () => {
        cartItems.forEach(item => {
            dispatch(removeProduct({ id: item.id }));
        });
        setShowModal(true);
    };

    // Effect to auto-redirect to homepage after showing modal for 3 seconds
    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => {
                setShowModal(false);
                navigate("/");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showModal, navigate])


    // Calculate total amount from cart items
    const totalAmount = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    // Handle change in selected payment method
    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    // Handle input change for address editing
    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };
     const validateAddress = () => {
        if (!address.name.trim()) {
            setError("Name is required.");
            return false;
        }
         if (!/^[A-Za-z\s]+$/.test(address.name.trim())) {
        setError("Name can contain only letters and spaces.");
        return false;
    }
        if (!/^\d{10}$/.test(address.phone)) {
            setError("Phone must be 10 digits.");
            return false;
        }
        if (!address.address.trim() || address.address.length < 10) {
            setError("Address must be at least 10 characters.");
            return false;
        }
        setError("");
        return true;
    };

     const handleSaveAddress = () => {
        if (validateAddress()) {
            setIsEditingAddress(false);
        }
    };

    return (
        <div className="checkout-wrapper">
            {/* Header Section */}
            <header className="checkout-header">
                <h1>Checkout</h1>
            </header>

            <section className="delivery-section">
                <h2>Delivery Address</h2>
                <div className="address-card">
                    {/* View or Edit Address */}
                    {!isEditingAddress ? (
                        <>
                            <p><strong>{address.name}</strong></p>
                            <p>{address.phone}</p>
                            <p>{address.address}</p>
                            <button className="change-address-btn" onClick={() => setIsEditingAddress(true)}>
                                Change
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Address Edit Fields */}
                            <input type="text" name="name" value={address.name} onChange={handleAddressChange} placeholder="Name"
                                className="edit-input"
                            />
                            <input type="text" name="phone" value={address.phone} onChange={handleAddressChange} placeholder="Phone"
                                className="edit-input"
                            />
                            <textarea name="address" value={address.address} onChange={handleAddressChange}
                                placeholder="Address"
                                className="edit-textarea"
                            />
                            <button className="save-address-btn" onClick={handleSaveAddress}>
                                Save
                            </button>
                            {error && <p className="error-text">{error}</p>}
                        </>
                    )}
                </div>
            </section>
            {/* Payment Method Section */}
            {/* Renders a group of radio buttons for selecting the payment method.
            Selected value is stored in paymentMethod state and updates on change. */}
            <section className="payment-section">
                <h2>Payment Method</h2>
                <div className="payment-options">
                    <label>
                        <input type="radio" value="UPI" checked={paymentMethod === "UPI"} onChange={handlePaymentChange} />
                        UPI
                    </label>
                    <label>
                        <input type="radio" value="Credit/Debit Card" checked={paymentMethod === "Credit/Debit Card"} onChange={handlePaymentChange} />
                        Credit/Debit Card
                    </label>
                    <label>
                        <input type="radio" value="Cash on Delivery" checked={paymentMethod === "Cash on Delivery"} onChange={handlePaymentChange} />
                        Cash on Delivery
                    </label>
                </div>
            </section>
            {/* Total Amount Section */}
            <section className="total-section">
                <h2>Total Amount</h2>
                <p className="total-price">₹{totalAmount.toFixed(2)}</p>
            </section>

            <button className="proceed-btn" onClick={handleProceed}>
                Proceed to Buy
            </button>
            {/* Confirmation Modal after placing order */}
             {/* It displays a message based on the selected payment method and auto-redirects to the homepage after 3 seconds. */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>
                            {paymentMethod === "Cash on Delivery"
                                ? "Order Confirmed!"
                                : `Payment Successful!
                                Order Confirmed!`}
                        </h2>
                        <p>
                            {paymentMethod === "Cash on Delivery"
                                ? "You will pay on delivery."
                                : "Thank you for your payment."}
                        </p>
                        <p >
                            Redirecting to home page...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Checkout;
