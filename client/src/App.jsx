import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Card from "./component/Card";
import MyCart from "./component/MyCart";
import ProdForm from "./Forms/ProdForm";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstHome from "./pages/FirstHome.jsx";
import CartPage from "./pages/CartPage.jsx";
function App() {
  return (
    <>
      {/* <Header /> */}
      {/* <Card /> */}

      {/* <ProductList /> */}

      {/* <Homepage></Homepage> */}

      {/* <Login /> */}
      {/* <Signup /> */}

      {/* <MangeCard /> */}

      {/* <MyCart></MyCart> */}

      {/* <ProdDetail /> */}

      {/* <ProdForm /> */}
      {/* <Footer /> */}

      {/* <form action="/upload">
        <input type="file" name="productImage" onChange={handleIp} />

        <button type="submit" onClick={handleSubmit}>
          upload
        </button>
      </form> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstHome />} />
          <Route path="/Home" element={<Homepage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/signUp" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
