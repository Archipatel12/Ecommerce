import React, { useContext } from 'react';
import "./Cartitem.css";
import { Shopcontext } from "../../Context/Shopcontext";
import remove_icon from '../Assets/cart_cross_icon.png';

const Cartitem = () => {
    const { all_product, cartitem, removeFromCart ,gettotalcartamount} = useContext(Shopcontext);

    return (
        <div className='cartitem'>
            <div className="cartitem-format">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr/>
            {all_product.map((e) => {
                if (cartitem[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitem-format clcartitem-form">
                                <img src={e.image} alt={e.name} className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitem-quantity'>{cartitem[e.id]}</button>
                                <p>${e.new_price * cartitem[e.id]}</p>
                                <img classname="remove-icon" src={remove_icon} alt="Remove item" onClick={() => removeFromCart(e.id)} />
                            </div>
                            <hr/>
                        </div>
                    );
                } else {
                    return null;
                }
            })}
            <div className="cart-total">
                <div className="cart-tot">
                    <h1>Cart Totals</h1>
                    <div>
                        <div  className="cart-total-item">
                            <p>Subtotal</p>
                            <p>${gettotalcartamount()}</p>
                        </div>
                        <hr/>
                        <div className="cart-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr/>
                        <div className="cart-total-item">
                            <h3>Total</h3>
                            <h3>${gettotalcartamount()}</h3>
                        </div>
                </div>

                        <button>Proceed to Checkout</button>
                        </div>
                        
                <div className="cart-promocode">
                    <p>If you have a promo code enter it here</p>
                    <div className="cart-promobox">
<input placeholder="PROMOCODE"></input>
<button>SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Cartitem;
