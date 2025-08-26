import React, { useContext, useEffect, useState } from "react";
import StoreContext from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";

import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount,cartItems,placeOrder,foodList } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "mahehsh",
    lastName: "kose",
    email: "ms2kose@gamil.com",
    street: "link road",
    city: "betul",
    state: "mp",
    pinCode: "460001",
    country: "india",
    phone: "6456382901",
    paymentOptions: "cash on delivery",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    console.log(data);
    
  }, [data])
  
  const placeOrderHandler = async (e) => {
    e.preventDefault();
    const spinner = document.querySelector(".spinner");
    spinner.style.display = "block";
    let orderItems = [];
    foodList.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo); 
      }
    })

    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+50
    }

    let res = await placeOrder(orderData);
    spinner.style.display = "none";
    if (res?.data?.success) {
      // const {session_url} = res.data;
      // window.location.replace(session_url);
      toast.success("Order placed successfully");
      navigate("/myorders");
    }else{
      toast.error(res?.response?.data?.message || "Failed to place order");
      console.log(res);
    }


  }

  return (
    <form className="place-order" onSubmit={placeOrderHandler}>
      <div className="place-order-left">
        <p className="title">Delivery-Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            type="text"
            placeholder="First name"
            required
          />
          <input
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            type="text"
            placeholder="Last name"
            required
          />
        </div>

        <input
          name="email"
          value={data.email}
          onChange={handleChange}
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          name="street"
          value={data.street}
          onChange={handleChange}
          type="text"
          placeholder="Street"
          required
        />

        <div className="multi-fields">
          <input
            name="city"
            value={data.city}
            onChange={handleChange}
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            value={data.state}
            onChange={handleChange}
            type="text"
            placeholder="state"
            required
          />
        </div>

        <div className="multi-fields">
          <input
            name="pinCode"
            value={data.pinCode}
            onChange={handleChange}
            type="text"
            placeholder="pin code"
            required
          />
          <input
            name="country"
            value={data.country}
            onChange={handleChange}
            type="text"
            placeholder="Country"
            required
          />
        </div>

        <input
          name="phone"
          value={data.phone}
          onChange={handleChange}
          type="tel"
          placeholder="phone"
          required
        />
        <div className="payment-options multi-fields">
          <select name="paymentOptions" onChange={handleChange} value={data.paymentOptions} required>
            <option value="select payment options" disabled selected>
              Select Payment Options
            </option>
            <option value="cash on delivery">
              cash on delivery
            </option>
            <option value="online payment">online payment</option>
            <option value="UPI">UPI</option>
          </select>
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart total</h2>
          <div>
            <div className="cart-total-details">
              <p>sub Total</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0: 50}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs.{getTotalCartAmount() + (getTotalCartAmount() === 0? 0 : 50)}</b>
            </div>
          </div>
          <button /*onClick={() => navigate("/paymentoptions")}*/>
            Proceed to Payment
            <div className="spinner"></div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
