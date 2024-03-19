import React, { useEffect, useState } from "react";
import "../component/allStyle/MyCart.css";

import { useDispatch, useSelector } from "react-redux";
import {
  addToorderInCart,
  removeFromorderInCart,
  removeAllProductInstances,
  buyProduct,
} from "../ReduxStore/userSlice";
import { fetchProducts } from "../ReduxStore/ProductActions";
const MyCart = () => {
  const orderInCart = useSelector((state) => state.user.orderInCart);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    // Filter products based on orderInCart
    const filteredProducts = products.filter((product) =>
      orderInCart.includes(product.prodid)
    );
    // Set cart items with occurrence
    setCartItems(
      filteredProducts.map((product) => ({
        ...product,
        occurrence: orderInCart.filter((id) => id === product.prodid).length,
      }))
    );

    // console.log(cartItems);
  }, [orderInCart, products]);

  const handleIncrement = (productId) => {
    dispatch(addToorderInCart({ productId }));
  };

  const handleDecrement = (productId) => {
    dispatch(removeFromorderInCart({ productId }));
  };

  const handleRemove = (productId) => {
    dispatch(removeAllProductInstances({ productId }));
  };

  const handleBuy = (p, occurrence) => {
    // Dispatch buyProduct action with productId
    dispatch(buyProduct({ productId: p, occurrence: occurrence }));
    dispatch(removeAllProductInstances({ productId: p }));
  };
  // if (cartItems.length == 0) {
  //   return <h1>NO ITEMS ADDED </h1>;
  // }
  return (
    <div>
      {cartItems.map((item) => (
        <div className="cart-card" key={item.prodid}>
          <div className="cart-image">
            <img
              src={`http://localhost:9000/${item.img}`}
              alt="Product Image"
            />
          </div>
          <div className="cart-details">
            <h3 className="product-title">{item.title}</h3>
            <h5>{item.description}</h5>
            <div className="quantity-controls">
              <button
                className="quantity-btn decrement"
                onClick={() => handleDecrement(item.prodid)}
              >
                -
              </button>
              <span className="quantity">{item.occurrence}</span>
              <button
                className="quantity-btn increment"
                onClick={() => handleIncrement(item.prodid)}
              >
                +
              </button>
            </div>
            <div className="cart-footer">
              <span className="product-price">
                ${item.price * item.occurrence}
              </span>
              <div className="cart-buttons">
                <button
                  className="btn btn-remove"
                  onClick={() => handleRemove(item.prodid)}
                >
                  Remove
                </button>
                <button
                  className="btn btn-save yellow"
                  onClick={() => handleBuy(item.prodid, item.occurrence)}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCart;
