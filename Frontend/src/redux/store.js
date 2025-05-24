import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './slice/adminSlices';

const store = configureStore({
    reducer:{
        admin:adminSlice
    } 
})

export default store;