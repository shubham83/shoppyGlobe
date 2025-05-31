import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import './Header.css'
function Header() {
     // Select cart items from Redux store
    const cartItems = useSelector(state => state.cart.items);
      // Calculate total quantity of all items in cart
    const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0)

    return (
        <>
            <header className="header">
                {/* Logo links to home page */}
                <div className="logo">
                     <Link to="/">Shoppy Globe</Link>
                </div>
               {/* Navigation links including cart with item count */}
                <nav className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/cart">
                        <i className="fas fa-shopping-cart"></i> Cart ({cartCount})
                    </Link>
                </nav>

            </header>
        </>
    )
}
export default Header