import catchAsyncError from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import User from "../Models/user_models.js";

export const addToCart = catchAsyncError(async (req,res,next) => {
    const {itemId} = req.body;
    
    let user = await User.findById(req.user._id);
      if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
    let cartData = user.cartData;
   cartData[itemId] = (cartData[itemId] || 0) + 1;

    user = await User.findByIdAndUpdate(user._id,{cartData},{new:true});

    res.status(200).json({
        success:true,
        message:"item added to cart",
        cartData:user.cartData
    })
 


})

export const removeFromCart = catchAsyncError(async (req,res,next) => {
    const {itemId} = req.body;
    
    let user = await User.findById(req.user._id);
    let cartData = user.cartData;
    if (cartData[itemId] > 0) {
        cartData[itemId] -= 1;
    }

    user = await User.findByIdAndUpdate(user._id,{cartData},{new:true});

    res.status(200).json({
        success:true,
        message:"item removed from cart",
        cartData:user.cartData
    })
 


})

export const getCart = catchAsyncError(async (req,res,next) => {
     res.status(200).json({
        success:true,
        message:"food items from cart",
        cartData:req.user.cartData
    })
});