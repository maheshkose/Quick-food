import express from "express";
import { getUserDetails, loginAdmin, loginClient, logoutAdmin, logoutClient, register } from "../Controllers/userControllers.js";
import { isAdminAuthenticate, isClientAuthenticated } from "../Middlewares/Authenticate.js";


const userRouter = express.Router();

//Clients routes
userRouter.post('/client/register',register);
userRouter.post('/client/login',loginClient);
userRouter.get('/client/userdetails', isClientAuthenticated,getUserDetails);
userRouter.get('/client/logout',isClientAuthenticated,logoutClient)

//admin routes
userRouter.post('/admin/register',isAdminAuthenticate,register);
userRouter.post('/admin/login',loginAdmin);
userRouter.get('/admin/userdetails', isAdminAuthenticate,getUserDetails);
userRouter.get('/admin/logout',isAdminAuthenticate,logoutAdmin);




export default userRouter;