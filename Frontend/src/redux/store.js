import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './slice/adminSlices';
import cartSlice from './slice/cartSlices';

const store = configureStore({
    reducer: {
        admin: adminSlice,
        cart: cartSlice
    }
})

export default store;