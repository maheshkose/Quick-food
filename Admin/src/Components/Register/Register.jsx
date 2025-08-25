import React, { useContext } from 'react'
import '../Login/Login.css'
import { useState } from 'react'
import { assets } from '../../assets/assets.js'
import App_context from '../../context/App_context.jsx'
import { toast } from 'react-toastify'
const Register = ({setShowLogin,setCurrState}) => {
  const {registerAdmin} = useContext(App_context);
  const [error, seterror] = useState("");
 const [data, setData] = useState({
  name: '',
    email: '',
    password: '',
    role:"Admin"
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
      
        const response = await registerAdmin(data);
        console.log("response from register",response);
        
        if(response?.data?.success){
          setShowLogin(false);
          toast.success(response?.data?.message);
        }else{
          // handle error
          seterror(response?.response?.data?.message);
          toast.error(response?.response?.data?.message);
        }
        
      
    }
  return (
    <div className='login-popup'>
      <div className="head">
        <h2>Add New Admin</h2>
        <p><img src={assets.cross_icon} alt="X" onClick={()=>setShowLogin(false)} /></p>
      </div>
      <form className='login-form' onSubmit={handleSubmit}>
      <div className="input-field">
          <label htmlFor="name">Name</label>
          <input type="text" id='name' placeholder='Enter your name'name="name" onChange={handleChange} value={data.name} />
        </div>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id='email' placeholder='Enter your email'name="email" onChange={handleChange} value={data.email} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id='password' placeholder='Enter your password'name="password" onChange={handleChange} value={data.password} />
        </div>
        {error && <p className='error-message'>{error}</p>}
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default Register