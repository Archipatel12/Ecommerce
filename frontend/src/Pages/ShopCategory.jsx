import React,{useContext} from 'react'
import './CSS/Shopcategory.css'
import { Shopcontext } from '../Context/Shopcontext';
import dropdown from '../Componenets/Assets/dropdown_icon.png'
import Item from '../Componenets/Item/Item'

const ShopCategory = (props) => {
  const {all_product} = useContext(Shopcontext);
  return (
    <div className='shop'>
      <img  src={props.banner} alt='' style= {{ width:'100%' }}/>
      <div className="index">
        <p><span>Showing 1-12</span> Out Of 36 Product</p>
      <div className="sort">
        sort by 
        <img src={dropdown} alt=''/>
      </div>
      </div>
      <div className="product">
      {all_product.map((item,i)=>{
        if(props.category===item.category){
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        }
        else {
          return null;
        }
      })}
      </div>
      <div className="loadmore">
        Explore more
      </div>
    </div>
  )
}

export default ShopCategory
