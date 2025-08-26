import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';



import { connectDb } from './config/db.js';
import foodRouter from './Routes/foodRoute.js';
import { errorMiddleware } from './Middlewares/ErrorHandler.js';
import userRouter from './Routes/user_routes.js';
import cartRouter from './Routes/cart_routes.js';
import orderRouter from './Routes/order_route.js';


//app configuration
const app = express();
//port configuration
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//middleware
app.use(express.json());

app.use(cors({
  origin: [process.env.FRONTEND_URL,process.env.ADMIN_URL], // or your frontend's actual URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  
}));
//cookie parser
app.use(cookieParser());

//db connection
connectDb();

app.get('/', (req, res) => {
  res.send('Api working');});
  
  //api end points
 app.use('/images', express.static(path.join(__dirname, 'Backend/Uploads')));

//food router
app.use('/api/food', foodRouter);
//user router
app.use('/api/user',userRouter);
//cart router
app.use('/api/cart',cartRouter);
//order Router
app.use('/api/order',orderRouter);

//error midleware
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});