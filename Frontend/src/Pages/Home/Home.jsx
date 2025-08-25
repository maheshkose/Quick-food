import React, { useContext, useState } from 'react'
import './Home.css'
import Headers from '../../Components/Headers/Headers'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import StoreContext from '../../Context/StoreContext'
import Food_Display from '../../Components/Food_display/Food_Display'

import Appdownload from '../../Components/AppDownload/Appdownload'
const Home = () => {
    const {a} = useContext(StoreContext);
    const [category, setCategory] = useState("All");
    console.log("Value from context:", a);
    
  return (
    <div>

        <Headers/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <Food_Display category={category}/>
        <Appdownload/>
    </div>
  )
}

export default Home