import React, { useContext, useEffect, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import StoreContext from "../../Context/StoreContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "../Logout/Logout";



const LoginPopUp = ({ setShowLogin }) => {
  const {register,login, isLoggedIn, setIsLoggedIn} = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role:"Client"
  });

  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const spinner = document.querySelector(".spinner");
    spinner.style.display = "block";
    try {
      let result;
      if (currState === "Sign Up") {
        result = await register(data);
      }else{
        result = await login(data);
      }
       console.log("result",result);
      spinner.style.display = "none";
      if (result?.data?.success) {
        setMessage(result?.data?.message || "");
        setError("");
         toast.success(result?.data?.message);
         currState === "Sign Up" ? setCurrState("Login") : 
         setShowLogin(false);
          setIsLoggedIn(true);
         // Reset form data after successful login or registration
         setData({
          name: "", 
          email: "",
          password: "", 
          role:"Client"
        });
      }else{
        setError(result?.response?.data?.message || "Something went wrong");
        setMessage("");
        toast.error(result?.response?.data?.message || "Something went wrong");
      }
     
     
    } catch (error) {
      spinner.style.display = "none";
      setError(error?.response?.data?.message || "Something went wrong");
      setMessage("");
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
      
    }
  };


  return (

    <>
    {isLoggedIn ?
    <div className="logout-popup login-popup">
      <Logout setShowLogin={setShowLogin}/>
    </div>:
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onSubmitHandler}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt="X"
            onClick={() => {
              setShowLogin(false);
            }}
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder="Your Name"
              required
            />
          )}

          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Your password"
            required
          />
        </div>
        <button>{currState === "Sign Up" ? "Create Account" : "Login"}
          <div className="spinner"> </div>
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing I agree to terms of use & privacy policy</p>
        </div>
        <div className="error-message">
          <p style={{color:"green"}}>{message}</p>
          <p style={{color:"red"}}>{error}</p>
        </div>
        {currState === "Sign Up" ? (
          <p>
            Already have an Account?
            <span onClick={() => setCurrState("Login")}>Login</span>
          </p>
        ) : (
          <p>
            Create a new Account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        )}
      </form>
       
    </div>
    }
    
    
    </>
    
  );
};

export default LoginPopUp;
