import { configureStore } from '@reduxjs/toolkit'
import restaurantReducer from './features/restaurantSlice'
import cartReducer from './features/cartSlice'
import userReducer from './features/userSlice'
import adminReducer from './features/adminSlice'



export const store = configureStore({
  reducer: {
    restaurantData: restaurantReducer,
    cart: cartReducer,
    user: userReducer,
    admin: adminReducer,
  },
})