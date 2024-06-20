import React, {  createContext, useEffect, useState } from "react";



export const Shopcontext=  createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for (let index=0; index< 300+1; index++){
        cart[index]=0;
    }
    return cart;

}
const Shopcontextprovider=(props)=>{

    const [all_product,setAll_Product] = useState([]);
    const [cartitem,setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/fetchallproduct')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then((data) => setAll_Product(data))
          .catch((error) => console.error("Error fetching products:", error));
      }, []);

    const addToCart =(itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    const removeFromCart =(itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
const gettotalcartamount = () =>{
    let totalamount = 0;
    for (const item in cartitem){
        if (cartitem[item]>0){
            let iteminfo = all_product.find((product) => product.id===Number(item))
            totalamount += iteminfo.new_price * cartitem[item];
        }
    }
    return totalamount;
}
const gettotatcartitem = () => {
    let totalitem = 0;
    for (const item in cartitem){
        if(cartitem[item]>0){
            totalitem += cartitem[item];
        }
    }
    return totalitem;
}
    const contextValue = { gettotatcartitem,gettotalcartamount,all_product,cartitem,addToCart,removeFromCart};
    return (
        <Shopcontext.Provider value={contextValue}>
        {props.children}
        </Shopcontext.Provider>
    )
    }
export default Shopcontextprovider;