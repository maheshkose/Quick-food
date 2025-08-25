import React, { useEffect, useState } from "react";
import StoreContext from "./StoreContext";
import { food_list } from "../assets/assets";
import { toast } from "react-toastify";


import axios from "axios";
// Assuming food_list is an array of food items imported from assets
const Storestate = (props) => {
  // const url = "http://localhost:5000/api";
  //const imageUrl = "http://localhost:5000/images";
  const url = "https://quick-food-hvfv.onrender.com/api";
  const imageUrl = "https://quick-food-hvfv.onrender.com/images";
  const [showLogin, setShowLogin] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [discount, setDiscount] = useState(0);


  // const addToCart = (itemId) => {
  //   if (!cartItems[itemId]) {
  //     setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
  //   } else {
  //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  //   }
  // };
   const addToCart = async(itemId) => {
    try {
      const response = await axios.post(`${url}/cart/add`,{itemId},{withCredentials:true});
       toast.success(response?.data?.message);
       getCart();
    } catch (error) {
       toast.error(error?.response?.data?.message)
    }
  };
  const removeFromCart = async(itemId) => {
    try {
      const response = await axios.post(`${url}/cart/remove`,{itemId},{withCredentials:true});
      toast.success(response?.data?.message);
      getCart();
    } catch (error) {
       toast.error(error?.response?.data?.message)
    }
  };

  const getCart = async() => {
    try {
      const response = await axios.get(`${url}/cart/getcart`,{withCredentials:true});
      setCartItems(response?.data?.cartData)
      // toast.success(response?.data?.message);
    } catch (error) {
      // toast.error(error?.response?.data?.message)
    }
  };
  


  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  // };

  const a = 10;

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = foodList.find((food) => food._id === itemId);
      if (cartItems[itemId]) {
        total += item?.price * cartItems[itemId];
      }
    }
    return total;
  };

  //api req calls

  const register = async (data) => {
    try {
      const response = await axios.post(`${url}/user/client/register`, data, {
        withCredentials: true,
      });
      console.log("response", response);
      
      return response;
    } catch (error) {
      console.log("error", error);
      return error
    }
  };

  const login = async (data) => {
    try {
      const response = await axios.post(`${url}/user/client/login`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error
    }
  };

const getUserDetails = async () => {
    try {
      const response = await axios.get(`${url}/user/client/userdetails`, {withCredentials: true});
      setUser(response?.data?.user);
      setIsLoggedIn(true);
      console.log("User details fetched successfully:", response?.data?.user);
    } catch (error) {
      console.log("Error fetching user details:", error);

    }
  }
  const logout = async () => {
    try {
      const response = await axios.get(`${url}/user/client/logout`, {withCredentials: true});

      return response;
    } catch (error) {
      return error
    }
  }

  const getAllFoodList = async () => {
     try {
      const response = await axios.get(`${url}/food/list`, {
        withCredentials: true,
      });
      setFoodList(response?.data?.foodList)
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    getUserDetails();
    getAllFoodList();
    getCart();
  }, [])
  

  const placeOrder = async (orderData) => {
    try {
      const res = await axios.post(`${url}/order/placeorder`,orderData,{withCredentials:true});
      return res
    } catch (error) {
      return error
    }
  }

  const cancelOrder = async (orderId) => {
    try {
      const res = await axios.put(`${url}/order/cancelorder`,{orderId},{withCredentials:true});
      return res
    } catch (error) {
      return error
    }
  }

  const verifyPayment = async (orderId,success) => {
    try {
      const res = await axios.post(`${url}/order/verifypayment`,{orderId,success},{withCredentials:true});
      return res
    } catch (error) {
      return error
    }
  }

  const getUserOrders = async () => {
    try {
      const res = await axios.get(`${url}/order/userorders`,{withCredentials:true})
    
      
      return res
    } catch (error) {
      
      
      return error
    }
  }

  useEffect(()=>{
    getUserDetails();
  },[isLoggedIn] )
  const contextValue = {
    a: a,
    food_list: food_list,
    cartItems: cartItems,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    setCartItems: setCartItems,
    getTotalCartAmount: getTotalCartAmount,
    register,
    login,
    foodList,
    placeOrder,
    verifyPayment,
    getUserOrders,
    isLoggedIn, setIsLoggedIn,
    user, setUser,
    logout,
    imageUrl,
    getCart,
    discount, setDiscount,
    cancelOrder,
    showLogin, setShowLogin
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default Storestate;
