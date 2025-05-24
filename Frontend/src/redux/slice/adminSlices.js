import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  token: null
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin(state, { payload }) {
      state.data = payload.admin;
      state.token = payload.token;
      localStorage.setItem("admin", JSON.stringify(payload.admin));
      localStorage.setItem("token", payload.token);
    },
    // lsLocal(state) {
    //   const admin = localStorage.getItem("admin");
    //   const token = localStorage.getItem("token");
    //   if (admin && token) {
    //     state.data = JSON.parse(admin);
    //     state.token = token;
    //   }
    // }
   
  }
});

export const { setAdmin,  } = adminSlice.actions;
export default adminSlice.reducer;
