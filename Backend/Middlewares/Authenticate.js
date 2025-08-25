import User from "../Models/user_models.js";
import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "./ErrorHandler.js";
import jwt from "jsonwebtoken"


export const isAdminAuthenticate = catchAsyncError(async (req,res,next) => {
    const token = req.cookies.AdminToken;

    if (!token) {
        return next(new ErrorHandler("Login first to use this feature",400));
    }

    const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY)
    const admin = await User.findById(decode.id);
    if (!admin) {
        return next(new ErrorHandler("Admin not found",404));
    }
    if (admin.role !== "Admin") {
        return next(new ErrorHandler(`${admin.role} is not authorized for this role`,403))
    }
    req.user = admin;

    next();
});

export const isClientAuthenticated = catchAsyncError(async (req,res,next) => {
    const token = req.cookies.ClientToken;

    if (!token) {
        return next(new ErrorHandler("Login first to use this feature",400));
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const client = await User.findById(decode.id);
    if (!client) {
        return next(new ErrorHandler("Client not found", 404));
    }
     if (client.role !== "Client") {
        return next(new ErrorHandler(`${client.role} is not authorized for this resource`,403))
    }

    req.user = client;

    next();
})