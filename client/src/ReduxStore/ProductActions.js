import { fetchProductsSuccess } from "./ProductSlice";

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:9000/getProduct");
    const data = await response.json();

    dispatch(fetchProductsSuccess(data));
  } catch (error) {
    console.log(error.message);
  }
};
