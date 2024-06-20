import React,{ useContext } from 'react'
import './CSS/Product.css'
import Shopcontextprovider, { Shopcontext } from '../Context/Shopcontext'
import { useParams } from 'react-router-dom'
import Breadcrums from '../Componenets/Breadcrums/Breadcrums'
import Productdisplay from '../Componenets/Productdisplay/Productdisplay'
import all_product from '../Componenets/Assets/all_product'

const Product = () => {
  const {all_product} = useContext(Shopcontext);
  const {productId} = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div>
      <Breadcrums product ={product}/>
      <Productdisplay product = {product}/>
    </div>
  )
}

export default Product
