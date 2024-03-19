import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
  },
});

export default store;
