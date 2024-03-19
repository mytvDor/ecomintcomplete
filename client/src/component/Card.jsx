import React, { useEffect, useState } from "react";
import "../component/allStyle/Card.css";
import { addToorderInCart } from "../ReduxStore/userSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Temp from "../TEMP-IMP-BKUP/Temp";
import { fetchProducts } from "../ReduxStore/ProductActions";

const Card = ({ arr }) => {
  const dispatch = useDispatch();

  // const { products } = useSelector((state) => state.products);
  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(fetchProducts());
  }, [dispatch]);
  console.log(arr);
  const handleAddToCart = (id) => {
    alert(`item : ${id}  added to cart`);

    dispatch(addToorderInCart({ productId: id }));
  };
  //logged in or not
  const data = localStorage.getItem("authData");
  const [presentData, setPresentDaata] = useState(false);

  if (data) {
    useEffect(() => {
      setPresentDaata(true);
    }, []);
  }

  return (
    <>
      {presentData ? (
        <div className="container">
          {/* <Temp></Temp> */}
          {arr.map((p) => (
            <div className="product-card" key={Math.random()}>
              <div className="product-image">
                <img src={`http://localhost:9000/${p.img}`} alt={p.title} />
              </div>
              <div className="allprodinfo">
                {" "}
                <div className="product-details">
                  <h3>{p.title}</h3>
                  <h5>{p.description}</h5>
                </div>
                <div className="product-price">
                  <span>${p.price}</span>
                </div>
                <div className="add-to-cart">
                  <button
                    className="addtocartbtn"
                    onClick={() => handleAddToCart(p.prodid)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container">
          {arr.map((p) => (
            <div className="product-card" key={Math.random()}>
              <div className="product-image">
                <img src={`http://localhost:9000/${p.img}`} alt={p.title} />
              </div>

              <div className="allprodinfo">
                {" "}
                <div className="product-details">
                  <h3>{p.title}</h3>
                  <h5>{p.description}</h5>
                </div>
                <div className="product-price">
                  <span>${p.price}</span>
                </div>
                <div className="add-to-cart">
                  <Link to="/login">
                    {" "}
                    <button className="addtocartbtn">Add To Cart</button>
                  </Link>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Card;
