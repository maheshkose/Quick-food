import express from "express";
import { isClientAuthenticated } from "../Middlewares/Authenticate.js";
import { addToCart, getCart, removeFromCart } from "../Controllers/cartController.js";

const cartRouter = express.Router();

//cart routes

cartRouter.post('/add',isClientAuthenticated,addToCart);
cartRouter.post('/remove',isClientAuthenticated,removeFromCart);
cartRouter.get('/getcart',isClientAuthenticated,getCart);




export default cartRouter