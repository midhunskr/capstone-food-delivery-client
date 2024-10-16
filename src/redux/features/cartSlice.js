import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const itemId = action.payload._id || action.payload.menuItem; // Check for _id or menuItem
      const existingItem = state.cartItems.find(item => item._id === itemId || item.menuItem === itemId);
    
      if (existingItem) {
        // If the item already exists, check if it's being added from the backend (with a predefined quantity)
        existingItem.quantity = action.payload.quantity || existingItem.quantity + 1; // Use backend quantity if available, otherwise increment
      } else {
        // Add the item with its quantity from the backend or set it to 1 if not provided
        state.cartItems.push({
          ...action.payload,
          _id: action.payload._id || action.payload.menuItem, // Ensure both _id and menuItem are handled
          quantity: action.payload.quantity || 1, // Set the correct quantity from backend, or default to 1
        });
      }
    },    

    increment: (state, action) => {
      const itemId = action.payload; // Get the ID passed with the action
      const item = state.cartItems.find(cartItem => cartItem._id === itemId || cartItem.menuItem === itemId);
      
      if (item) {
        item.quantity += 1; // Increment quantity by 1
        console.log("Item incremented:", item, "Current quantity:", item.quantity);
      } else {
        console.log("Item not found for increment");
      }
    },

    decrement: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem._id === itemId || cartItem.menuItem === itemId);
    
      if (existingItem) {
        if (existingItem.quantity === 0) {
          // Remove item if its quantity becomes 0
          state.cartItems = state.cartItems.filter(cartItem => cartItem._id !== itemId && cartItem.menuItem !== itemId);
        } else {
          existingItem.quantity -= 1; // Decrease quantity
        }
      }
    },   
    
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
  },
});

export const { addToCart, increment, decrement, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
