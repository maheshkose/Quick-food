import React, { useContext, useEffect, useState } from "react";
import "./Myorders.css";
import StoreContext from "../../Context/StoreContext";
import { assets } from "../../assets/assets.js";
import { toast } from "react-toastify";

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const { getUserOrders, imageUrl, cancelOrder } = useContext(StoreContext);
  const getUserOrdersHandler = async () => {
    const res = await getUserOrders();
    if (res?.data?.success) {
      console.log("user orders", res?.data?.orders);
      setOrders(res?.data?.orders);
    } else {
      setOrders([]);
    }
  };

  const handleCancleOrder = async(orderId)=>{
    const spinner = document.querySelector(".spinner");
    spinner.style.display = "block";
    const res = await cancelOrder(orderId);
    spinner.style.display = "none";
    if (res?.data?.success) {
      toast.success(res?.data?.message || "Order cancelled successfully");
      getUserOrdersHandler();
    } else {
      toast(res?.response?.data?.message || "Failed to cancel order");
    }
  }
  useEffect(() => {
    getUserOrdersHandler();
    console.log("orders", orders);
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="my-orders-order">
              {/* <img src={assets.parcel_icon} alt="" className="parcel-img"/> */}
              <div className="order-details">
                <div className="order-items">
                  {order.items?.map((item, index) => {
                    return (
                      <div key={index} className="order-item">
                        <img src={`${imageUrl}/${item.image}`} alt="" />
                        <p>{item.name}</p>
                        <p>Rs.{item.price}</p>
                        <p>Qty : {item.quantity}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="order-price-and">
                  <div className="order-price-status">
                    <p>Total : Rs.{order.amount}</p>
                    <p className="status">
                      <span>&#x25cf;</span> <b>{order.status}</b>
                    </p>
                  </div>
                  <div className="order-buttons">
                    <button>track Order</button>
                    <button onClick={()=>{handleCancleOrder(order._id)}}>Cancel order
                      <div className="spinner"></div>
                    </button>
                  </div>
                  <div className="order-date">
                    <p>
                      Order Placed on :{order.date?.slice(0, 10)} at {order.date?.slice(11, 16)}
                      
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>No orders</>
        )}
      </div>
    </div>
  );
};

export default Myorders;
