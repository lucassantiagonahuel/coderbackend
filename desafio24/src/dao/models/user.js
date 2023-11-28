import mongoose from "mongoose";
import {cartCollection} from "./cart.js"

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    require: true,
    unique: true,
  },
  age: Number,
  password: {
    type: String,
    require: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: cartCollection,
  },
  role: {
    type: String,
  },
});

export const userModel = mongoose.model(userCollection, userSchema);
