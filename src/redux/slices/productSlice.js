import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllProducts = createAsyncThunk("products/getAllProducts",async()=>{
    const result = await axios.get("https://dummyjson.com/products")
    console.log(result.data.products);
    return result.data.products

    

    // this is an action passed outside of function so we need extra reducers beacuse this is an async fun
    // extrareducers -it is used to handle the action that is happened created outside the slice
    

})

const productSlice = createSlice({
    name:"products",
    initialState:{
        loading:true,
        allProducts:[],
        dummyAllProducts:[],
        error:""
    },
    reducers:{
    // define only synchronus function so we use createAsyncThunk() to get asynchronus action in redux.
    // createAsyncThunk() :used to make asynchronus action in redux. it accepts an  action type string and a function that returns a promise,and generates a thunk that dispatches pending/fulfilled/rejected action types based on that promise
            //search the products and it is sync function so use it in reducers
            searchProduct : (state,action)=>{
                    state.allProducts = state.dummyAllProducts.filter(item=>item.title.toLowerCase().includes(action.payload.toLowerCase()))
            }


    },
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.allProducts = action.payload
            state.dummyAllProducts=action.payload
            state.error = ""
        })
        builder.addCase(getAllProducts.pending,(state,action)=>{
            state.loading = true
            state.allProducts = []
            state.dummyAllProducts=[]
            state.error = ""
        })
        builder.addCase(getAllProducts.rejected,(state,action)=>{
            state.loading = false
            state.allProducts = []
            state.dummyAllProducts=[]
            state.error = "API Call Failed"
        })
    }

})

export const {searchProduct} = productSlice.actions 
export default productSlice.reducer