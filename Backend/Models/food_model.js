import mongoose from "mongoose";


const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Name must contain at least 3 characters "],
      trim:true,
      unique:true
    },
    description: {
      type: String,
      required: true,
      minLength: [3, "Description must contain at least 3 characters "],
      trim:true,
    },
    price: { type: Number, required: true },
    image: { type: String, required: true,trim:true, },
    category: { type: String, required: true,trim:true, },
  },

  { timestamps: true }
);
const Food = mongoose.model("Food", foodSchema);

export default Food;
