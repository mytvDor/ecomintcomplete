import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Card from "../component/Card";
import { useSelector, useDispatch } from "react-redux";

const Homepage = () => {
  const [searchProducts, setSearchProducts] = useState("");
  const [option, setOption] = useState("select option");
  const { products } = useSelector((state) => state.products);
  const [arr, setArr] = useState([]);

  console.log(products);

  // console.log(products);
  useEffect(() => {
    handleProducts();
  }, [searchProducts, option, products]); // Re-run handleProducts whenever searchProducts, option, or products change

  const handleProducts = () => {
    const filteredArr = products.filter((product) => {
      if (
        option === "Title" &&
        product.title.toLowerCase().includes(searchProducts.toLowerCase())
      ) {
        return true;
      } else if (
        option === "price" &&
        product.price.toLowerCase().includes(searchProducts.toLowerCase())
      ) {
        return true;
      } else if (
        option === "category" &&
        product.category.toLowerCase().includes(searchProducts.toLowerCase())
      ) {
        return true;
      } else if (option === "select option" && searchProducts === "") {
        return true;
      }
      return false;
    });
    setArr(filteredArr);
  };

  return (
    <div>
      <Header></Header>

      <div
        className="searchBox"
        style={{ display: "flex", margin: "100px 30px 30px 30px" }}
      >
        <input
          type="text"
          placeholder="search product "
          style={{
            border: "3px solid black",
            width: "500px",
            fontSize: "20px",
          }}
          value={searchProducts}
          onChange={(e) => {
            setSearchProducts(e.target.value);
          }}
        />
        <select
          id="options"
          value={option}
          placeholder={option}
          onChange={(e) => {
            setOption(e.target.value);
          }}
          style={{ width: "130px" }}
        >
          <option value={option}>{option}</option>
          <option value="Title">Title</option>
          <option value="category"> Category</option>
          <option value="price">price</option>
        </select>
      </div>
      <Card></Card>
      <Footer></Footer>
    </div>
  );
};

export default Homepage;
