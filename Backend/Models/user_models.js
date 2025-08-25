import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Name must contain at least 3 characters "],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      //email validator
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [8, "password must contain at least 8 characters "],
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "Client"],
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

userSchema.methods.generateJsonWebToken = function () {
  return  jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPRIES,
  });
};

const User = mongoose.model("User", userSchema);

export default User;
