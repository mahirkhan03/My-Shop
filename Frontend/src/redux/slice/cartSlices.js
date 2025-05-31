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

    },
    qtyHandler(state, current) {
      const { productId, type, final_price, original_price } = current.payload;
      const existingItem = state.items.find(item => item.productId === productId);

      if (!existingItem) return;

      const final = parseFloat(final_price) || 0;
      const original = parseFloat(original_price) || 0;

      if (type === "inc") {
        existingItem.qty += 1;
        state.final_total = (state.final_total || 0) + final;
        state.original_total = (state.original_total || 0) + original;
      } else if (type === "dec" && existingItem.qty > 1) {
        existingItem.qty -= 1;
        state.final_total = (state.final_total || 0) - final;
        state.original_total = (state.original_total || 0) - original;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    }

  }
});

export const { additems, lstoCart, qtyHandler } = cartSlice.actions;
export default cartSlice.reducer;
