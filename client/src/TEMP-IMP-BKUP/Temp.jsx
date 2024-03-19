VVVVIMP;

import React, { useEffect, useState } from "react";
import "../component/allStyle/Card.css";
import { addToorderInCart } from "../ReduxStore/userSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Temp from "./Temp";
import { fetchProducts } from "../ReduxStore/ProductActions";

const Card = ({ arr }) => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(fetchProducts());
  }, [dispatch]);
  console.log(arr);
  const handleAddToCart = (id) => {
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
              <div className="product-details">
                <h3>{p.title}</h3>
                <h5>{p.description}</h5>
              </div>
              <div className="product-price">
                <span>${p.price}</span>
              </div>
              <div className="add-to-cart">
                <button onClick={() => handleAddToCart(p.prodid)}>
                  Add To Cart
                </button>
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
                  <button>Add To Cart</button>
                </Link>{" "}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Card;

// import React, { useEffect, useState } from "react";
// import Header from "../component/Header";
// import Footer from "../component/Footer";
// import Card from "../component/Card";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchProducts } from "../ReduxStore/ProductActions";

// const FirstHome = () => {
//   const dispatch = useDispatch();

//   const [searchProducts, setSearchProducts] = useState("");
//   const [option, setOption] = useState("select option");
//   const [arr, setArr] = useState([]);
//   const { products } = useSelector((state) => state.products);
//   // console.log(products);

//   useEffect(() => {
//     handleProducts();
//     // dispatch(fetchProducts());
//   }, [searchProducts, option, products]); // Re-run handleProducts whenever searchProducts, option, or products change

//   const handleProducts = () => {
//     const filteredArr = products.filter((product) => {
//       if (
//         option === "Title" &&
//         product.title.toLowerCase().includes(searchProducts.toLowerCase())
//       ) {
//         return true;
//       } else if (
//         option === "price" &&
//         product.price.toLowerCase().includes(searchProducts.toLowerCase())
//       ) {
//         return true;
//       } else if (
//         option === "category" &&
//         product.category.toLowerCase().includes(searchProducts.toLowerCase())
//       ) {
//         return true;
//       } else if (option === "select option" && searchProducts === "") {
//         return true;
//       }
//       return false;
//     });
//     setArr(filteredArr);
//   };
//   console.log(arr, "mi");
//   return (
//     <div>
//       <Header></Header>

//       <div
//         className="searchBox"
//         style={{ display: "flex", margin: "100px 30px 30px 30px" }}
//       >
//         <input
//           type="text"
//           placeholder="search product "
//           style={{
//             border: "3px solid black",
//             width: "500px",
//             fontSize: "20px",
//           }}
//           value={searchProducts}
//           onChange={(e) => {
//             setSearchProducts(e.target.value);
//           }}
//         />
//         <select
//           id="options"
//           value={option}
//           placeholder={option}
//           onChange={(e) => {
//             setOption(e.target.value);
//           }}
//           style={{ width: "130px" }}
//         >
//           <option value={option}>{option}</option>
//           <option value="Title">Title</option>
//           <option value="category"> Category</option>
//           <option value="price">price</option>
//         </select>
//       </div>
//       <Card arr={arr}></Card>
//       <Footer></Footer>
//     </div>
//   );
// };

// export default FirstHome;
