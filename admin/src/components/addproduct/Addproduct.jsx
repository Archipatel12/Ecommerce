import React, { useState } from 'react';
import './Addproduct.css';
import upload_area from '../../assets/upload_area.svg';

const Addproduct = () => {
  const [image, setImage] = useState(null);
  const [productdetails, setProductdetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imagehandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changehandler = (e) => {
    setProductdetails({ ...productdetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productdetails);
    let responsedata;
    let product = productdetails;
    let formdata = new FormData();
    formdata.append('product', image);

    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formdata,
      });

      responsedata = await response.json();
      if (responsedata.success) {
        product.image = responsedata.imageurl; // Ensure this key matches the backend response
        console.log(product);

        // Add product details to the database
        const addProductResponse = await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        const addProductData = await addProductResponse.json();
        if (addProductData.success) {
          console.log('Product added successfully:', addProductData);
        } else {
          console.error('Failed to add product:', addProductData);
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className='add-product'>
      <div className="addproduct-item">
        <p>Product Title</p>
        <input
          value={productdetails.name}
          onChange={changehandler}
          type='text'
          name="name"
          placeholder='Type Here'
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-item">
          <p>Price</p>
          <input
            value={productdetails.old_price}
            onChange={changehandler}
            type='text'
            name="old_price"
            placeholder='Type Here'
          />
        </div>
        <div className="addproduct-item">
          <p>Offer Price</p>
          <input
            value={productdetails.new_price}
            onChange={changehandler}
            type='text'
            name="new_price"
            placeholder='Type Here'
          />
        </div>
      </div>
      <div className="addproduct-item">
        <p>Product Category</p>
        <select
          value={productdetails.category}
          onChange={changehandler}
          name="category"
          className='addproduct-select'
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-item">
        <label htmlFor='file-input'>
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className='addproduct-image'
            alt="Upload area"
          />
        </label>
        <input
          onChange={imagehandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={Add_Product} className='addproduct-button'>Add</button>
    </div>
  );
};

export default Addproduct;
