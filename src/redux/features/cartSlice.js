import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  cartItems: [],
  cartTotalQuanity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    
    addToCart: (state, action) => {
      const itemId = action.payload._id;
      console.log(itemId);
      
      const existingItem = state.cartItems.find(item => item._id === itemId);
    
      if (!existingItem) {
        // Only add the item if it's not already in the cart
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    increment: (state, action) => {
      const itemId = action.payload;
    
      // Map through the cartItems and immutably update the item's quantity
      state.cartItems = state.cartItems.map(item => {
        if (item._id === itemId) {
          return {
            ...item,
            quantity: item.quantity + 1, // Immutably update the quantity
          };
        }
        return item; // Return the item as-is if it doesn't match the ID
      });
    
      console.log("Updated cart items after increment:", JSON.stringify(state.cartItems, null, 2));
    },
    
    decrement: (state, action) => {
      const itemId = action.payload;
      
      // Find the item by its ID directly
      const existingItem = state.cartItems.find(item => item._id === itemId);
      console.log("exisitngItem====================",existingItem);
      
      
      if (existingItem) {
        console.log(`Decrementing item ${existingItem.name}, Current quantity: ${existingItem.quantity}`);
    
        if (existingItem.quantity > 1) {
          // Directly modify the quantity for the found item
          existingItem.quantity -= 1;
        } else {
          // If quantity is 1, remove the item from the cart
          console.log(`Removing item ${existingItem.name} as quantity reaches zero`);
          state.cartItems = state.cartItems.filter(item => item._id !== itemId);
        }
    
        // Log the updated cart items
        console.log("Updated cart items after decrement:", JSON.parse(JSON.stringify(state.cartItems)));
      } else {
        console.error(`Item with ID ${itemId} not found in the cart`);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotalQuanity = 0;
      state.cartTotalAmount = 0;
    },
  },
})

export const {addToCart, increment, decrement, clearCart } = cartSlice.actions

export default cartSlice.reducer