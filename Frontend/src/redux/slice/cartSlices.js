import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  final_total: 0,
  original_total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    additems(state, current) {
      const { productId, final_price, original_Price } = current.payload;
      const existingItem = state.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.qty += 1

      } else {
        state.items.push({
          productId,
          qty: 1
        })
      }

      state.final_total += final_price,
        state.original_total += original_Price
      localStorage.setItem("cart", JSON.stringify(state));
    },
    lstoCart(state) {
      const lscart = JSON.parse(localStorage.getItem("cart"));
      if (lscart) {
        state.items = lscart.items || [];
        state.final_total = lscart.final_total || 0;
        state.original_total = lscart.original_total || 0;
      }

    }
  }
});

export const { additems, lstoCart } = cartSlice.actions;
export default cartSlice.reducer;
