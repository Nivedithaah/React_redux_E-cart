import { configureStore } from "@reduxjs/toolkit";
import productSlice from './slices/productSlice'
import wishlistSlice from './slices/wishlistSlice'
import CartSlice from './slices/cartSlice'

const cartStore = configureStore({
    reducer:{
        productReducer: productSlice,
        wishlistReducer:wishlistSlice,
        cartReducer:CartSlice
    }
})

export default cartStore