import express from "express";
import {
  isAdminAuthenticate,
  isClientAuthenticated,
} from "../Middlewares/Authenticate.js";
import {
  cancelOrder,
  getAllOrders,
  getUsersOrder,
  placeOrder,
  updateOrderStatus,
  verifyOrder,
} from "../Controllers/orderController.js";

const orderRouter = express.Router();

//place order
orderRouter.post("/placeorder", isClientAuthenticated, placeOrder);
orderRouter.post("/verifypayment", isClientAuthenticated, verifyOrder);
orderRouter.get("/userorders", isClientAuthenticated, getUsersOrder);
orderRouter.get("/getallorders",isAdminAuthenticate, getAllOrders);
orderRouter.put("/updateorder", isAdminAuthenticate, updateOrderStatus);
orderRouter.put("/cancelorder", isClientAuthenticated, cancelOrder);

export default orderRouter;
