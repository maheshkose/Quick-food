import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import StoreContext from '../../Context/StoreContext'

const Verify = () => {
    const {verifyPayment} = useContext(StoreContext);
    const {searchParams,setSearchParams} = useSearchParams();
    const success = searchParams?.get("success");
    const orderId = searchParams?.get("orderId");

    const navigate = useNavigate()
    const verifyPaymentHandler = async () => {
        const res = await verifyPayment(orderId,success);
        if (res?.data?.success) {
            navigate('/myorders')
        }else{
            navigate("/")
        }
    }
    
    useEffect(() => {
      verifyPaymentHandler();
    }, [


        
    ])
    
  return (
    <div className='verify'>
        <div className="spinner">

        </div>

    </div>
  )
}

export default Verify