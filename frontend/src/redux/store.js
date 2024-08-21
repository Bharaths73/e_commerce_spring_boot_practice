import { configureStore } from '@reduxjs/toolkit'
import  cartSlice  from './Slice/CartSlice'
import  userSlice  from './Slice/UserSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
  },
})