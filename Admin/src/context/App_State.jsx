import React, { useEffect } from "react";
import App_context from "./App_context";
import axios from "axios";
import { useState } from "react";

const App_State = (props) => {
  // const url = "http://localhost:5000/api";
  //  const imageUrl = 'http://localhost:5000';
   const url = "https://quick-food-hvfv.onrender.com/api";
  const imageUrl = 'https://quick-food-hvfv.onrender.com/images';
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [adminDetails, setAdminDetails] = useState({});

  const addFood = async (data) => {
    try {
      const response = await axios.post(`${url}/food/add`, data, {
        withCredentials: true,
        
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getFoodList = async () => {
    try {
      const response = await axios.get(`${url}/food/list`,{
        withCredentials: true, 
      })
      return response;
    } catch (error) {
      return error;
    }
  }

  const removeFoodItem = async (id) => {
    try {
      const response = await axios.delete(`${url}/food/remove/${id}`,{
        withCredentials:true
      })
      // if (response?.data?.success) {
      //   getFoodList();
      // }
      return response;
    } catch (error) {
      return error;
    }
  }

  const getAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/order/getallorders`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put(`${url}/order/updateorder`, {
        orderId,
        status
      },{
        withCredentials:true
      })
      return response;
    } catch (error) {
      return error;
    }
  }
  const registerAdmin = async (data) => {
    try {
      const response = await axios.post(`${url}/user/admin/register`, data, {
        withCredentials: true,
        
      });
      return response;
    } catch (error) {
      console.log("app register error",error);
      return error;
    }
  }
  const loginAdmin = async (data) => {
    try {
      const response = await axios.post(`${url}/user/admin/login`, data, {
        withCredentials: true,
        
      });
      return response;
    } catch (error) {
      return error;
      console.log(error);
    }
  } 
  const logoutAdmin = async () => {
    try {
      const response = await axios.get(`${url}/user/admin/logout`, {
        withCredentials: true,
        
      });
      return response;
    } catch (error) {
      return error
      console.log(error);
    }
  }
  const getUserDetails = async () => {
    try {
      const response = await axios.get(`${url}/user/admin/userdetails`, {
        withCredentials: true,
        
      });
      if(response?.data?.success){
        setisLoggedIn(true);
        setAdminDetails(response.data.user);
      }
      return response;
    } catch (error) {
      return error
      console.log(error);
    }
  }
  useEffect(() => {
   getUserDetails();
  }, [])
  useEffect(() => {
   getUserDetails();
  }, [isLoggedIn])
  
  return (
    <App_context.Provider value={{ addFood, getFoodList,removeFoodItem,imageUrl,getAllOrders,updateOrderStatus,isLoggedIn, setisLoggedIn,registerAdmin,loginAdmin,logoutAdmin,getUserDetails,adminDetails }}>
      {props.children}
    </App_context.Provider>
  );
};

export default App_State;
