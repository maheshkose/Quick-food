import React from 'react'
import { GoMoveToTop } from "react-icons/go";
import './GoToTop.css'
const GoToTop = () => {
  return (
    <div className='go-to-top' onClick={()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})}}>
        <div>
        <GoMoveToTop/>
        <span>Go To Top</span>
        </div>
        
    </div>
  )
}

export default GoToTop