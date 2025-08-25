import React, { useContext, useEffect, useState } from 'react'
import './List.css'
import App_context from '../../context/App_context';
import { toast } from "react-toastify";
const List = () => {
  const [foodList, setFoodList] = useState([]);

  const {getFoodList,removeFoodItem,imageUrl} = useContext(App_context);

  const getList = async () => {
    try {
      const result = await getFoodList();
      console.log(result);
      if (result?.data?.success) {
        setFoodList(result?.data?.foodList);
        toast.success(result?.data?.message)
      }else{
        toast.error(result?.response?.data?.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response?.data?.message);
      
    }
    
  }
  const removeFoodItemHandler = async (id) => {
    try {
      const result = await removeFoodItem(id)
      if (result?.data?.success) {
        toast.success(result?.data?.message);
        getList();
      }else{
        toast.error(result?.response?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }


  useEffect(() => {
   getList();
  }, [])
   
  
  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title">

            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>

          </div>
          {foodList && foodList.length === 0 ?
          <><h2>no food item...</h2></>:
          foodList.map((item,index)=>{
            return (
              <div key={index} className='list-table-format'>
                    <img src={`${imageUrl}/images/`+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>Rs.{item.price}</p>
                    <p onClick={()=>{removeFoodItemHandler(item._id)}} className='cursor'>X</p>

              </div>
            )
          })}
        </div>

    </div>
  )
}

export default List