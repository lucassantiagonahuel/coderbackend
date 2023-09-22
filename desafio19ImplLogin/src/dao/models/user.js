import mongoose from "mongoose";


const userCollection = "users";


const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type : String,
        require: true,
        unique: true
    },
    age: Number,
    password: {
        type: String,
        require: true
    }
  });
  
  export const userModel = mongoose.model(userCollection, userSchema);