import { createSlice } from "@reduxjs/toolkit";

// Creating a Redux slice for cart state management
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [] // Array to hold cart items
    },
    reducers: {
          // Add product to cart or update quantity if it already exists
        addToCart: (state, action) => {
            const item = state.items?.find((i) => i.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }

        },
         // Increment quantity of a cart item by 1
         incrementQuantity: (state, action) => {
        const item = state.items.find(i => i.id === action.payload.id);
        if (item) {
            item.quantity += 1;
        }
    },
      // Decrement quantity of a cart item by 1 or remove if quantity is 1
    decrementQuantity: (state, action) => {
        const item = state.items.find(i => i.id === action.payload.id);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter(i => i.id !== action.payload.id);
            }
        }
    },
         // Remove a product entirely from the cart by id
        removeProduct: (state, action) => {
            const idToRemove = action.payload.id;
            state.items = state.items.filter(item => item.id !== idToRemove);
        }

    }
})
// Exporting cart action creators
export const { addToCart,removeProduct,incrementQuantity,decrementQuantity} = cartSlice.actions
// Exporting the reducer to configure the store
export default cartSlice.reducer