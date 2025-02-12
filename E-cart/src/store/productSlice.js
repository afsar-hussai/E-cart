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

//delete Product extraReducer
export const deleteProduct=createAsyncThunk('product/deleteProduct',async (id,{rejectWithValue})=>{
    try {
        const response=await productManagement.deleteProduct(id);
      
        
    return id;
        
    } catch (error) {
        rejectWithValue(error?.message)
        
    }
    
}) 

//update Product extraReducer

export const updateProduct=createAsyncThunk('product/updateProduct',async ({id,updatedData},{rejectWithValue})=>{
    try {
        const response=await productManagement.updateProductData(id,updatedData);
      
        
    return response;
        
    } catch (error) {
        rejectWithValue(error?.message)
        
    }
    
}) 


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
            state.products=action.payload || [];
        })
        .addCase(fetchAllProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.products=state.products.filter(p=>p?._id!==action.payload)
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.products=state.products.map(p=>p?._id===action.payload?._id?action.payload:p);
        })

    }

})

export default productSlice.reducer;