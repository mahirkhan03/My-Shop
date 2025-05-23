import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './slice/adminSlices';

const store = configureStore({
    reducer: adminSlice
})

export default store;