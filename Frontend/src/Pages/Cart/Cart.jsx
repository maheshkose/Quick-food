import React, { useContext } from "react";
import "./Cart.css";
import StoreContext from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { removeFromCart, foodList, cartItems,getTotalCartAmount,imageUrl,discount } = useContext(StoreContext);

  const navigate = useNavigate();


  return <div className="cart">
    
    <div className="cart-items">
      <div className="cart-items-title">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Qauntity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br />
      <hr />
      {foodList.map((item,index) => {
        if (cartItems[item._id] > 0) {
          return (
            <>
            <div className="cart-items-title cart-items-item" key={index}>
              <img src={`${imageUrl}/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>Rs.{item.price}</p>                      
              <p>{cartItems[item._id]}</p>
              <p>Rs.{item.price * cartItems[item._id]}</p>
              <p onClick={()=>{removeFromCart(item._id)}} className="cross">X</p>

            </div>
            <hr />
            </>
          );
        }
        return null;
      })}
    </div>
    <div className="cart-bottom">
      <div className="cart-total">
        <h2>Cart total</h2>
        <div>
          <div className="cart-total-details">
            <p>sub Total</p>
            <p>Rs.{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Discount</p>
            <p>Rs.{discount}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>delivery Fee</p>
            <p>Rs.{getTotalCartAmount() === 0 ? 0: 50}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>Rs.{getTotalCartAmount() === 0 ? 0: getTotalCartAmount() - discount+ 50}</b>
          </div>
        </div>
          <button onClick={()=>navigate('/placeorder')}>Proceed to checkout</button>
      </div>
      <div className="cart-promocode">
        <p>If You have a promo code, Enter It Here</p>
      <div className="cart-promocode-input">
        <input type="text" placeholder="Promo Code" />
        <button>Submit</button>
      </div>
      </div>
    </div>
  </div>;
};

export default Cart;
