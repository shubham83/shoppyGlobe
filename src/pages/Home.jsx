import ProductList from "../components/ProductList"
import "./Home.css"

function Home() {
    return (
        <>
            <div className="home-container">
                 {/* Welcome message displayed at the top */}
                <h1 className="welcome-message">Welcome to ShoppyGlobe</h1>
                {/* Render the ProductList component to display products */}
                <ProductList />
            </div>
        </>
    )
}
export default Home