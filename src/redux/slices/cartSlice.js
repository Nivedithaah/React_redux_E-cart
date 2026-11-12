import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        //add to cart -view and wishlist component
        addCart: (state, action) => {
            const existingItem = state.find(item => item.id == action.payload.id)
            if (existingItem) {
                existingItem.quantity += 1
                existingItem.totalPrice = existingItem.quantity * existingItem.price
                const remainingItem = state?.filter(item => item.id != existingItem.id)
                state = [...remainingItem, existingItem]

            } else {
                state.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price })
            }
        },
        removeCartItem: (state, action) => {
            return state.filter(item => item.id != action.payload)
        },
        incrementCart: (state, action) => {
            const exsisitingProduct = state.find(item => item.id == action.payload)
            const remaingProduct = state.filter(item => item.id != action.payload)
            exsisitingProduct.quantity += 1
            exsisitingProduct.totalPrice = exsisitingProduct.quantity * exsisitingProduct.price
            state = [...remaingProduct, exsisitingProduct]
        },

        decrementCart: (state, action) => {
            const exsisitingProduct = state.find(item => item.id == action.payload)
            const remaingProduct = state.filter(item => item.id != action.payload)
            exsisitingProduct.quantity -= 1
            exsisitingProduct.totalPrice = exsisitingProduct.quantity * exsisitingProduct.price
            state = [...remaingProduct, exsisitingProduct]
        },
        emptyCart: (state) => {
            return []
        }
    }
})

export const { addCart, removeCartItem, incrementCart, decrementCart, emptyCart } = CartSlice.actions
export default CartSlice.reducer