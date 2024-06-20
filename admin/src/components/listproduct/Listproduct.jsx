import React, { useEffect, useState } from 'react';
import './Listproduct.css';
import remove_icon from '../../assets/cross_icon.png';

const Listproduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/fetchallproduct');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  
  const remove_product = async(id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'content-type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }
  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className="listproduct-format">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-all">
        <hr />
        {allproducts.map((product,index) => (
          <div key={index} className="listproduct-main listproduct-format">
            <img className="product-icon" src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{remove_product(product.id)}}className='remove-icon' src={remove_icon} alt="Remove" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listproduct;
