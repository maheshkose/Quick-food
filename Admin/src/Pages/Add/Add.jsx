import React, { useContext, useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import App_context from "../../context/App_context";
import { toast } from "react-toastify";


const Add = () => {
  const { addFood } = useContext(App_context);

  const [image, setImage] = useState("");
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);

    
      const res = await addFood(formData);
      if (res?.data?.success) {

      
      toast.success(res?.data?.message);
      setData({
        name: "",
        description: "",
        price: "",
        category: "",
      });
      setImage(false);
    } else {
      toast.error(res?.response?.data?.message || "Error adding food item");
    }
     
  };
  
 

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-image-upload flex-col">
          <p>upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            name="image"
            id="image"
            required
            onChange={handleImage}
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            value={data.name}
            onChange={onChangeHandler}
            type="text"
            name="name"
            placeholder="type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            value={data.description}
            onChange={onChangeHandler}
            name="description"
            placeholder="type here"
            rows={6}
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure-veg">Pure-veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              value={data.price}
              onChange={onChangeHandler}
              type="number"
              name="price"
              placeholder="Rs.20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
