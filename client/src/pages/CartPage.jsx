import React, { useEffect, useState } from "react";
import MyCart from "../component/MyCart";
import { Link } from "react-router-dom";
import "../component/allStyle/MyCart.css";
import "../component/allStyle/HeaderStyle.css";
import Homepage from "./Homepage";
import { useDispatch, useSelector } from "react-redux";
import FirstHome from "./FirstHome";
const CartPage = () => {
  //CART COUNT
  const orderInCart = useSelector((state) => state.user.orderInCart);
  const data = localStorage.getItem("authData");
  console.log(JSON.parse(data).userdata.username);
  const username = JSON.parse(data).userdata.username;
  const count = orderInCart.length;

  //ACTUAL CART PAGE

  const [presentData, setPresentDaata] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredHome, setIsHoveredHome] = useState(false);

  const handleMouseEnter = (e) => {
    if (e.target.id == logout) setIsHovered(true);
    if (e.target.id == home) setIsHoveredHome(true);
  };
  const handleMouseLeave = (e) => {
    if (e.target.id == logout) setIsHovered(false);
    if (e.target.id == home) setIsHoveredHome(false);
  };
  if (data) {
    useEffect(() => {
      setPresentDaata(true);
    }, []);
  }

  const handleLogOut = () => {
    setPresentDaata(false);
    localStorage.clear();
  };
  return (
    <div>
      {" "}
      {presentData ? (
        <>
          {" "}
          <nav>
            <div className="logo">amazon</div>

            <input type="checkbox" id="click" />

            <label htmlFor="click" className="check">
              <div className="menu">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            </label>
            <div className="un">
              <ul>
                {/* <Link to="/home" className=" liv">
                home
              </Link> */}
                <Link
                  to="/"
                  className=""
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  {" "}
                  <div
                    className="hi "
                    style={{ color: isHoveredHome ? "white" : "grey" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    id="home"
                  >
                    Home{" "}
                  </div>
                </Link>
                {/* <div className="liv">service</div> */}
                <div className="liv active cart ">
                  <img
                    src="cart.png  "
                    style={{ width: "50px", height: "50px" }}
                  />{" "}
                  <div className="circle" style={{ fontSize: "17px" }}>
                    {count}
                  </div>
                </div>{" "}
                <div className="liv  cart"> user-name : {username}</div>
                <Link
                  to="/"
                  className=""
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  {" "}
                  <div
                    className="hi "
                    style={{ color: isHovered ? "white" : "red" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleLogOut}
                    id="logout"
                  >
                    log out{" "}
                  </div>
                </Link>
              </ul>
            </div>
          </nav>
          <MyCart />
        </>
      ) : (
        <FirstHome></FirstHome>
      )}
    </div>
  );
};

export default CartPage;
