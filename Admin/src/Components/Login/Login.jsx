import React, { useContext } from 'react'
import './Login.css'
import { assets } from '../../assets/assets.js'
import { useState } from 'react'
import App_context from '../../context/App_context.jsx'
import { toast } from 'react-toastify'
const Login = ({setShowLogin,setCurrState}) => {
  const {loginAdmin,setisLoggedIn} = useContext(App_context);
  const [error, setError] = useState("")
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }
    const handleSubmit = async (e) => {
      e.preventDefault();
      
        const response = await loginAdmin(data);
        if(response?.data?.success){
          setShowLogin(false);
          setCurrState("logout");
          setisLoggedIn(true);
          toast.success(response?.data?.message);
        }else{
          setError(response?.response?.data?.message);
          toast.error(response?.response?.data?.message);
        }
      
    }
  return (
    <div className='login-popup'>
      <div className="head">
        <h2>Login</h2>
        <p><img src={assets.cross_icon} alt="X" onClick={()=>setShowLogin(false)} /></p>
      </div>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id='email' placeholder='Enter your email'name="email" onChange={handleChange} value={data.email} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id='password' placeholder='Enter your password'name="password" onChange={handleChange} value={data.password} />
        </div>
        {error && <p className='error-message'>{error}</p>}
        <button type='submit'>Login</button>
      </form>
    </div>
  )
  }

export default Login