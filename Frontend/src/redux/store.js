import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './slice/adminSlices';
import cartSlice from './slice/cartSlices';
import userSlice from './slice/userSlices';

const store = configureStore({
    reducer: {
        admin: adminSlice,
        cart: cartSlice,
        user: userSlice
    }
})

export default store;