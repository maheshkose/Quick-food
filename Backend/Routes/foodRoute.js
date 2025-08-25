import express, { Router } from 'express';
import { addFood, addMany, getFoodList, removeFood } from '../Controllers/foodController.js';
import multer from 'multer';
import { isAdminAuthenticate } from '../Middlewares/Authenticate.js';


const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage:storage})

foodRouter.post('/add', isAdminAuthenticate,upload.single("image"), addFood);
//get all food items list
foodRouter.get('/list',isAdminAuthenticate, getFoodList)
foodRouter.delete('/remove/:id',isAdminAuthenticate, removeFood);
//add many
foodRouter.post('/addmany',addMany)


export default foodRouter;
  