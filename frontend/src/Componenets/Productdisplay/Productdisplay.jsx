import React, { useContext } from 'react'
import './Productdisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png' 
import { Shopcontext } from '../../Context/Shopcontext'

const Productdisplay = (props) => {
    const {product}=props;
    const {addToCart} = useContext(Shopcontext)
  return (
    <div className='productdisplay'>
<div className="productdisplay-left">
    <div className="product-image">
        <img src={product.image} alt=""/>
        <img src={product.image} alt=""/>
         <img src={product.image} alt=""/>
          <img src={product.image} alt=""/>

        
    </div>
    <div className="display-iamge">
        <img className='mainimg'src={product.image} alt=""/>
    </div>
</div>
    <div className="productdisplay-right">
           <h1>{product.name}</h1>
           <div className="product-star">
            <img src={star_icon} alt=""/>
            <img src={star_icon} alt=""/>
            <img src={star_icon} alt=""/>
            <img src={star_icon} alt=""/>
            <img src={star_dull_icon} alt=""/>
            <p>(122)</p>
           </div>
           <div className="product-price">
            <div className="product-oldprice"></div>
            ${product.old_price}
            <div className="product-newprice"></div>
            ${product.new_price}
           </div>
           <div className="product-des">

           </div>
           <div className="product-size">
            <h1>Select Size</h1>
            <div className="product-sizes">  
            <div >S</div>
            <div >M</div>
            <div >L</div>
            <div >XL</div>
                <div >XXL</div>
            </div>
           </div>
           <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
           <div className="product-category">
            <span>Category :</span><p>Women ,T-Shirt ,Crop Top</p>
            <span>Tags :</span><p>Morderm ,Latest</p>
           </div>
    </div>
    </div>
  )
}

export default Productdisplay
