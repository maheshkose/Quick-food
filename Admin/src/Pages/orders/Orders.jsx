import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useContext } from "react";
import App_context from "../../context/App_context";
import { toast, ToastContainer } from "react-toastify";

const Orders = () => {
  const [allOredrs, setAllOredrs] = useState([]);
  const { getAllOrders } = useContext(App_context);
  const { updateOrderStatus } = useContext(App_context);

  const fetchAllOrders = async () => {
    try {
      const response = await getAllOrders();
      if (response?.data?.success) {
        console.log(response?.data?.allOrders);
        setAllOredrs(response?.data?.allOrders || []);
        toast.success(response?.data?.message || "Orders fetched successfully");
      } else {
        toast.error(
          response?.response?.data?.message || "Failed to fetch orders"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleStatusChange = async (orderId, e) => {
    e.preventDefault();
    const status = e.target.value;
    const res = await updateOrderStatus(orderId, status);
    if (res?.data?.success) {
      toast.success("Order status updated successfully");
      fetchAllOrders(); // Refresh the order list after updating
    } else {
      toast.error(
        res?.response?.data?.message || "Failed to update order status"
      );
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <>
      <div className="orders-container">
        <h1>All Orders</h1>
        <div className="orders-list">
          {allOredrs.length > 0 ? (
            allOredrs.map((order, index) => (
              <div key={index} className="order-item">
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <div>
                  <h3>User</h3>
                  <div>
                    <strong>Name : </strong> <span>{order.userId.name}</span>
                  </div>
                  <div>
                    <strong>Email : </strong> <span>{order.userId.email}</span>
                  </div>
                  <div>
                    <strong>user Id : </strong>{" "}
                    <span>{order.userId.userId}</span>
                  </div>
                </div>

                <p>
                  <strong>Total Amount:</strong> ${order.amount}
                </p>
                <div>
                  <strong>Status:</strong> {order.status}
                  <form className="update-order-status">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e)}
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </form>
                </div>
                <p>
                  <strong>Items:</strong>
                </p>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      <p><strong>Food Item : </strong>{item.name}</p> 
                      <p><strong>Price : </strong> ${item.price}</p>
                      <p><strong>Quantity : </strong>{item.quantity}</p>
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Address:</strong> {order.address.street},{" "}
                  {order.address.city}, {order.address.state} -{" "}
                  {order.address.zipcode}
                </p>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>

      
    </>
  );
};

export default Orders;
