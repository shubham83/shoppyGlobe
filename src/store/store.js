import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"

// Creating and configuring the Redux store
const store = configureStore({
    reducer: {
        cart: cartReducer // State slice for cart-related data
    }
})

// Exporting the configured store for use in the React app
export default store;