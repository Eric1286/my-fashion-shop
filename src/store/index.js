import { configureStore, createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("userCart")) || {
    id: "",
    name: "",
    items: [],
  },
  // initialState: { id: "", name: "", items: [] },
  reducers: {
    updateCart(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const { id } = action.payload;
      if (state.items.find((item) => item.id === id)) {
        const index = state.items.findIndex((item) => item.id === id);

        state.items[index].amount++;
      } else {
        state.items = state.items.concat(action.payload);
      }
      //  localStorage.setItem("userCart", JSON.stringify(state));
    },
    removeItem(state, action) {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (state.items[index].amount > 1) {
        state.items[index].amount--;
      } else {
        state.items.splice(index, 1);
      }
      // localStorage.setItem("userCart", JSON.stringify(state));
    },
    clearCart(state) {
      state.items = [];
      state.name = "";
      state.id = "";
    },
  },
});
export const cartAction = cartSlice.actions;

const authSlice = createSlice({
  name: "Authentication",
  initialState: JSON.parse(localStorage.getItem("userAccount")) || {
    token: null,
    isLogin: false,
    isRegistered: false,
    showLoginForm: false,
  },
  reducers: {
    loginHandler(state, action) {
      state.token = action.payload;
      state.isLogin = !!state.token;
    },
    logoutHandler(state) {
      state.token = null;
      state.isLogin = !!state.token;
    },
    registerHandler(state) {
      state.isRegistered = true;
    },
    showLoginFormHandler(state) {
      state.showLoginForm = !state.showLoginForm;
    },
  },
});
export const authAction = authSlice.actions;
const store = configureStore({
  reducer: { cart: cartSlice.reducer, auth: authSlice.reducer },
});
export default store;
