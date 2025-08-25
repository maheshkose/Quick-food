import React, { useContext } from "react";
import "./Food_Display.css";
import StoreContext from "../../Context/StoreContext";
import FoodItem from "../Food_item/FoodItem";
const Food_Display = ({ category }) => {
  const { food_list, foodList } = useContext(StoreContext);
  console.log(foodList);
  
  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
        {foodList && foodList.length === 0 ? (
          <><h1>loading...</h1></>
        ) : (
          foodList.map((item, index) => {
            if (category === "All" || item.category === category) {
             
              
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default Food_Display;
