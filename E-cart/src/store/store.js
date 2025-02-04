
import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import adminSlice from './adminSlice'
import productSlice from './productSlice'
const store=configureStore({
    reducer:{
        auth:authSlice,
        admin:adminSlice,
        product:productSlice
    }

})

export default store;