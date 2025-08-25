import React from 'react'
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>

        <h1>Explore Our Menu</h1>
        <p className="explore-menu-text">
            Discover a wide variety of delicious dishes crafted with the freshest ingredients. Whether you're in the mood for a hearty meal or a light snack, we have something to satisfy every craving. Explore our menu and find your new favorite dish today!
        </p>
        <div className="explore-menu-list">
            {menu_list.map((item, index) => (
                <div onClick={()=>(setCategory((prev)=>prev === item.menu_name?"All":item.menu_name))} className="explore-menu-list-item" key={index}>
                    <img className={category === item.menu_name?"active":""} src={item.menu_image} alt={item.name} />
                    <p>{item.menu_name}</p>
                    
                </div>
            ))}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu