/* eslint-disable no-unused-vars */

import { createSlice } from "@reduxjs/toolkit"


const initialState={
    status:null,
    userData:null
}

const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
        updateState:(state,action)=>{
            state.status=true;
            state.userData=action.payload;

        },
        updateStateToFalse:(state,action)=>{
            state.status=false;
            state.userData=null;

        },
        
    }

})

export const {updateState, updateStateToFalse  }=adminSlice.actions;
export default adminSlice.reducer;