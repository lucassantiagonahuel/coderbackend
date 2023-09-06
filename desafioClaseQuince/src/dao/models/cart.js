import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [Object],
    default: [],
  },
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
