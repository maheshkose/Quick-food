import catchAsyncError from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import Order from "../Models/orders_modules.js";
import User from "../Models/user_models.js";
import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_API_KEY);

export const placeOrder = catchAsyncError(async (req, res, next) => {
  const { items, amount, address } = req.body;

  if (!items || !amount || !address) {
    return next(new ErrorHandler("Fill All fields", 400));
  }
  const user = req.user;
  if (address.paymentOptions === "cash on delivery") {
    const order = await Order.create({
      userId: {userId: user._id, name: user.name, email: user.email},
      items,
      amount: Number(amount),
      address,
    });
    await User.findByIdAndUpdate(req.user._id, { cartData: {} });
    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } else if (address.paymentOptions === "online payment") {
    return next(new ErrorHandler("Online payment is not implemented yet", 501));
  } else if (address.paymentOptions === "UPI") {
    return next(new ErrorHandler("UPI payment is not implemented yet", 501));
  }

  return next(new ErrorHandler("Invalid payment option", 400));

  //stripe

  // const line_items = items?.map((item)=>({
  //   price_data:{
  //       currency:"inr",
  //       product_data:{
  //           name:item.name
  //       },
  //       unit_amount:item.price*100*80

  //   },
  //   quantity:item.quantity
  // }))

  // line_items.push({
  //     price_data:{
  //       currency:"inr",
  //       product_data:{
  //           name:"Delivery Charges"
  //       },
  //       unit_amount:2*100*80

  //   },
  //   quantity:1
  // })

  // const session = await stripe.checkout.sessions.create({
  //   line_items:line_items,
  //   mode:"payment",
  //   success_url:`${process.env.FRONTEND_URL}/verify?success=true&orderId=${order._id}`,
  //   cancel_url:`${process.env.FRONTEND_URL}/verify?success=false&orderId=${order._id}`,

  // })

  // res.status(200).json({
  //   success:true,
  //   session_url:session.url

  // })
});

export const cancelOrder = catchAsyncError(async (req, res, next) => {
  const { orderId } = req.body;
  if (!orderId) {
    return next(new ErrorHandler("Order ID is required", 400));
  }

  const order = await Order.findById(orderId);
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  if (order.status === "Cancelled") {
    return next(new ErrorHandler("Order is already cancelled", 400));
  }
  order.status = "Cancelled";
  await order.save();
  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    order,
  });
});
export const getAllOrders = catchAsyncError(async (req, res, next) => {
  let allOrders = await Order.find();
  if (allOrders.length === 0) {
    return next(new ErrorHandler("No Orders exists", 400));
  }
  const reverseOrders = allOrders.reverse();
  allOrders = reverseOrders;
  res.status(200).json({
    success: true,
    message: "orders fetched succesfully from database",
    allOrders,
  });
});

export const verifyOrder = catchAsyncError(async (req, res, next) => {
  const { orderId, success } = req.body;
  if (success === "true") {
    await Order.findByIdAndUpdate(orderId, { payment: true });
    res.status(200).json({
      success: true,
      message: "paid",
    });
  } else {
    await Order.findByIdAndDelete(orderId);
    res.status(400).json({
      success: false,
      message: "not paid",
    });
  }
});

export const getUsersOrder = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  console.log("user in orders", user);
  console.log("user id in orders", user._id);
  
  let orders = await Order.find({ 'userId.userId' : user._id});
  if (orders.length === 0) {
    return next(new ErrorHandler("No Orders exists", 404));
  }
  const reverseOrders = orders.reverse();
 orders = reverseOrders;
  res.status(200).json({
    success: true,
    message: "orders fetched succesfully from database",
    orders,
  });
});

export const updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const { orderId, status } = req.body;

  const validStatuses = [
    "Food Processing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  if (!validStatuses.includes(status)) {
    return next(new ErrorHandler("Invalid status value", 400));
  }

  const order = await Order.findById(orderId);
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  if (order.status === "Cancelled") {
    return next(new ErrorHandler("Cannot update a cancelled order", 400));
  }
  order.status = status;
  await order.save();

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order,
  });
});

