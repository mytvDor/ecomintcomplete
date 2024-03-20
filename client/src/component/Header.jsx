import React, { useEffect, useState } from "react";
import "../component/allStyle/HeaderStyle.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//NOTE :  THIS PAGE MAY HAVE SOME TESTING COMMENTS AND UNUSED VARIABLES 

const Header = () => {
  const dispatch = useDispatch();

  const orderInCart = useSelector((state) => state.user.orderInCart);
  const count = orderInCart.length;

  const hi = useSelector((state) => state.user.orderInCart);
  let username;

  const [presentData, setPresentDaata] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Event handler for mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const data = localStorage.getItem("authData");

  if (data) {
    username = JSON.parse(data).userdata.username;
  }
  // = orderInCart.length;
  //   useEffect(() => {
  //     setPresentDaata(true);
  //   }, []);
  // }

  useEffect(() => {
    if (data) {
      setPresentDaata(true);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.clear();

    setPresentDaata(false);
  };

  return (
    <div>
      {presentData ? (
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
              <div className="active liv">home</div>
              {/* <div className="liv">service</div> */}
              <Link
                to="/cart"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                className="liv "
              >
                <div
                  className=" "
                  style={{
                    color: isHovered ? "red" : "white",
                    display: "flex",
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {" "}
                  <img
                    src="cart.png  "
                    style={{ width: "70px", height: "70px" }}
                  />{" "}
                  <div className="circle">{count}</div>
                </div>{" "}
              </Link>{" "}
              <div className="liv  cart"> user-name :{username}</div>
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
                  style={{ color: isHovered ? "red" : "red" }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleLogOut}
                >
                  log out{" "}
                </div>
              </Link>
            </ul>
          </div>
        </nav>
      ) : (
        <nav>
          <div className="logo">AMAZON</div>
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
              <div className="active liv">home</div>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: isHovered ? "blue" : "red",
                  padding: "0px",
                }}
              >
                {" "}
                <div
                  className="hi "
                  style={{ color: isHovered ? "black" : "white" }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  login
                </div>
              </Link>{" "}
              <Link
                to="/signup"
                className="liv signUp"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "27px",
                }}
              >
                {" "}
                <div className=" ">Sign Up</div>
              </Link>{" "}
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Header;
