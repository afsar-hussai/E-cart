/* eslint-disable no-unused-vars */
import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import productManagement from "../BackendFunctions/ProductManagement";

export const fetchAllProducts=createAsyncThunk('product/fetchAllProducts',async (_,{rejectWithValue})=>{
    try {
        const response=await productManagement.allProductsRetrival();
    return response.products;
        
    } catch (error) {
        rejectWithValue(error?.message)
        
    }
    
}) 
console.log("fetchAllProducts is:",fetchAllProducts);


const initialState={
    products:[],
    loading:false,
    error:null
}

const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllProducts.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchAllProducts.fulfilled,(state,action)=>{
            state.loading=false,
            state.products=action.payload;
        })
        .addCase(fetchAllProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })

    }

})

export default productSlice.reducer;