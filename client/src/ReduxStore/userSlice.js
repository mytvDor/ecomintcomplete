// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
const authData = JSON.parse(localStorage.getItem("authData"));

const cart = JSON.parse(localStorage.getItem("user"));
const place = localStorage.getItem("place");

const removeAllInstancesOfProductId = (array, productId) => {
  return array.filter((id) => id !== productId);
};
const initialState = {
  orderInCart: cart ? cart.orderInCart : [],
  orderPlaced: cart ? place : [],
  // orderPlaced: [],
  email: authData ? authData.email : null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToorderInCart(state, action) {
      const { productId } = action.payload;
      state.orderInCart = [...state.orderInCart, productId];
      console.log("from slice ", state.orderInCart, state.email);
      localStorage.setItem(
        "user",
        JSON.stringify({ orderInCart: state.orderInCart })
      );
      updateUserFromSlice(state.email, state.orderInCart, state.orderPlaced);
    },
    removeFromorderInCart(state, action) {
      const { productId } = action.payload;
      const index = state.orderInCart.indexOf(productId);
      if (index !== -1) {
        state.orderInCart.splice(index, 1);
        localStorage.setItem(
          "user",
          JSON.stringify({ orderInCart: state.orderInCart })
        );
        updateUserFromSlice(state.email, state.orderInCart, state.orderPlaced);
      }
    },

    removeAllProductInstances(state, action) {
      const { productId } = action.payload;
      state.orderInCart = removeAllInstancesOfProductId(
        state.orderInCart,
        productId
      );
      localStorage.setItem(
        "user",
        JSON.stringify({ orderInCart: state.orderInCart })
      );
      updateUserFromSlice(state.email, state.orderInCart, state.orderPlaced);
    },

    buyProduct(state, action) {
      try {
        const { productId, occurrence } = action.payload;
        console.log(occurrence);

        for (let i = 0; i < occurrence; i++) {
          state.orderPlaced = [...state.orderPlaced, productId];
        }

        localStorage.setItem("place", state.orderPlaced);
        updateUserFromSlice(state.email, state.orderInCart, state.orderPlaced);
      } catch (err) {
        console.log("err");
      }
    },
  },
});

const updateUserFromSlice = async (emaili, orderInCarts, orderPlaced) => {
  try {
    const updateData = {
      email: emaili,
      orderInCart: orderInCarts,
      orderPlaced: orderPlaced,
    };
    console.log(updateData);
    const resp = await fetch("http://localhost:9000/updateUser", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
  } catch (err) {
    console.log(err);
  }
};

export const {
  addToorderInCart,
  removeFromorderInCart,
  removeAllProductInstances,
  buyProduct,
} = userSlice.actions;

export default userSlice.reducer;
