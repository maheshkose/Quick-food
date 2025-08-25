import mongoose from "mongoose";
import catchAsyncError from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import Food from "../Models/food_model.js";
import fs from "fs";

export const addFood = catchAsyncError(async (req, res, next) => {
  const file = req.file ? req.file.filename : null;

  const { name, description, price, category } = req.body;
  if (!name || !description || !price || !category || !file) {
    return next(new ErrorHandler("Fill all fields", 400));
  }
  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice)) {
    return next(new ErrorHandler("Price must be a valid number", 400));
  }

  const foodItem = await Food.create({
    name,
    description,
    price: parsedPrice,
    image: file,
    category,
  });

  res.status(201).json({
    success: true,
    message: `${name} added successfully`,
    food: foodItem,
  });
});

//all food list

export const getFoodList = catchAsyncError(async (req, res, next) => {
  const foodList = await Food.find();
  res.status(200).json({
    success: true,
    message: `food list fetched successfully`,
    foodList,
  });
});

//remove food item
export const removeFood = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  // validate mongoodb id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid food ID", 400));
  }
  let foodItem = await Food.findById(id);

  if (!foodItem) {
    return next(new ErrorHandler("Food item not found", 404));
  }
  fs.unlink(`uploads/${foodItem.image}`, (err) => {if (err) {
    console.error("Failed To delete image",err);
  }});

  foodItem = await Food.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Food item removed successfully",
    food: foodItem,
  });
});

 export const addMany =catchAsyncError (async () => {
   
  const {food_list} = req.body;
  if (!Array.isArray(food_list) || food_list.length === 0) {
    return next(new ErrorHandler("Invalid food list", 400));
  }
  const foodItems = await Food.insertMany(food_list);
  res.status(201).json({
    success: true,
    message: "Food items added successfully",
    foodItems,
  })
   
})