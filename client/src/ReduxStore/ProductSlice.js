import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
  },
});

export const { fetchProductsSuccess } = ProductSlice.actions;
export default ProductSlice.reducer;
ProductSlice.js;
