import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  user_token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.data = payload.user;
      state.user_token = payload.user_token;
      localStorage.setItem("user", JSON.stringify(state));

    },
    lstoUser(state) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        state.data = user.data;
        state.user_token = user.user_token;
      }
    },
    userLogout(state) {
      state.data = null;
      state.user_token = null;
      localStorage.removeItem("user");
    }

  }
});

export const { setUser, lstoUser, userLogout } = userSlice.actions;
export default userSlice.reducer;
