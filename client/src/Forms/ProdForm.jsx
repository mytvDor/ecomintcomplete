import React, { useState } from "react";

const ProdForm = () => {
  const [prod, setProd] = useState([]);

  const [entry, setEntry] = useState({
    title: "",
    img: "",
    price: "",
    des: "",
    cat: "",
    prodid: "",
  });

  const [fileInput, setFileInput] = useState(null);

  const handleIp = (e) => {
    setFileInput(e.target);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // const fileInput = document.querySelector('input[name="productImage"]');

  //   if (!fileInput || !fileInput.files[0]) {
  //     console.error("No file selected");
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append("productImage", fileInput.files[0]);

  //   try {
  //     const response = await fetch("http://localhost:9000/upload", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     if (response.ok) {
  //       console.log("Product added successfully");
  //       // Reset form data if needed
  //     } else {
  //       console.error("Failed to add product");
  //     }
  //   } catch (error) {
  //     console.error("Error is occured:", error);
  //   }
  // };

  const handleChange = (e) => {
    // console.log(entry);
    const { name, value } = e.target;

    setEntry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //IMAGE_UPLOAD TO UPLOAD

    if (!fileInput || !fileInput.files[0]) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("productImage", fileInput.files[0]);

    try {
      const response = await fetch("http://localhost:9000/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Product added successfully");
        // Reset form data if needed
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error is occured:", error);
    }

    //DATA TO DB

    console.log(entry);

    try {
      const response = await fetch("http://localhost:9000/uploadProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });
      if (response.ok) {
        console.log("Product added successfully");
        // Reset form data if needed
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error is occured:", error);
    }
  };
  return (
    <div>
      <form action="/upload" method="POST">
        <label name="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required
        />

        <label name="img">Image:</label>

        <input type="file" name="productImage" onChange={handleIp} required />

        <label name="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          onChange={handleChange}
          required
        />

        <label name="des">Description:</label>
        <input
          type="text"
          id="des"
          name="des"
          onChange={handleChange}
          required
        />

        <label name="cat">Category:</label>
        <input
          type="text"
          id="cat"
          name="cat"
          onChange={handleChange}
          required
        />

        <label name="prodid">Product ID:</label>
        <input
          type="text"
          id="prodid"
          name="prodid"
          onChange={handleChange}
          required
        />

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProdForm;
