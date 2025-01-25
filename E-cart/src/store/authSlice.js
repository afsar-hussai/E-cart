/* eslint-disable no-unused-vars */

import { createSlice } from "@reduxjs/toolkit"


const initialState={
    status:false,
    userData:null
}

const authSlice=createSlice({
    name:'auth',
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

export const {updateState, updateStateToFalse  }=authSlice.actions;
export default authSlice.reducer;