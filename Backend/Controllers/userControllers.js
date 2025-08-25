import catchAsyncError from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import User from "../Models/user_models.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtToken.js";
import validator from "validator";

export const register = catchAsyncError(async (req,res,next) => {
    const {name,email,password,role} = req.body;

    if (!name.trim() || !email.trim() || !password.trim() || !role.trim()) {
        return next(new ErrorHandler("Fill All fields",400));
    }

    let user = await User.findOne({email});
    if (user) {
        return next(new ErrorHandler("User with this Email already exists",400));
    }
     //validate email and strong password
    if (!validator.isEmail(email)) {
        return next(new ErrorHandler("Please provide valid email",400));
    }

    if (password.length < 8) {
        return next(new ErrorHandler("password must contain at least 8 characters ",400));
    }
    const hashPassword = await bcrypt.hash(password,10); 

     user = await User.create({name,email,password:hashPassword,role});

     res.status(201).json({
        success:true,
        message:`${role} Registerd Successfully`,
        user:{name,email,role}
     });
})

export const loginAdmin = catchAsyncError(async (req,res,next) => {
    const {email,password} = req.body;

    if ( !email.trim() || !password.trim()) {
        return next(new ErrorHandler("Fill All fields",400));
    }

    let user = await User.findOne({email});
    if (!user) {
        return next(new ErrorHandler("User with this Email not exists",400));
    }
    if (user.role !== "Admin") {
        return next(new ErrorHandler("Only Admin can access this resources",400));
    }
    const isPassValid = await bcrypt.compare(password,user.password)

    if (!isPassValid) {
        return next(new ErrorHandler("Invalid Password",400));
    }
    generateToken(user,`${user.role} Login Successfully`,200,res)
   

})

export const loginClient = catchAsyncError(async (req,res,next) => {
    const {email,password} = req.body;

    if ( !email.trim() || !password.trim()) {
        return next(new ErrorHandler("Fill All fields",400));
    }

    let user = await User.findOne({email});
    if (!user) {
        return next(new ErrorHandler("User with this Email not exists",400));
    }
   
    if (user.role !== "Client") {
        return next(new ErrorHandler("Only Clients can access this resources",400));
    }
    const isPassValid = await bcrypt.compare(password,user.password);

    if (!isPassValid) {
        return next(new ErrorHandler("Invalid Password",400));
    }
    generateToken(user,`${user.role} Login Successfully`,200,res);
   

});

export const getUserDetails = catchAsyncError(async (req,res,next) => {
    const user = await User.findById(req.user._id).select("-password -createdAt -updatedAt -__v");
    if (!user) {
        return next(new ErrorHandler("User not found",404));
    }
    res.status(200).json({
        success:true,
        message:"User details fetched successfully",
        user
    })
});

export const logoutClient = catchAsyncError(async (req,res,next) => {
    res.cookie("ClientToken",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: false, // for local development
        sameSite: "Lax", // or "None" if cross-site
    });
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
})
export const logoutAdmin = catchAsyncError(async (req,res,next) => {
    res.cookie("AdminToken",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: false, // for local development
        sameSite: "Lax", // or "None" if cross-site
    });
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
})