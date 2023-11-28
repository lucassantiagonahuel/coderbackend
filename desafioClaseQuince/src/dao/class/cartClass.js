import { cartModel } from "../models/cart.js";


export class CartClass {
  constructor() {}

  getCartId = async (idCart) => {
    const cart = await cartModel.findById(idCart);
    if (!cart) {
      throw new Error(`The cart id : ${idCart} not exists`);
    }
    return cart;
  };

  addNewCart = async (cart) => {
    let carts = await cartModel.create(cart);
    return carts;
  };

  addProductInCart = async (idCart, idProd) => {
    let cart = await this.getCartId(idCart);
    console.log(cart);
    let prodExists = false;
    if (!cart) {
      throw new Error(`The cart id : ${idCart} not exists`);
    }

    cart.products.forEach(prod => {
        if (prod.product  == new Object(idProd)) {
            prod.quantity ++;
            prodExists = true;
        }
    });
    if (!prodExists) {
      cart.products.push({"product" : idProd,"quantity" : 1})
    }

    const response = await cartModel.updateOne({_id:idCart},cart);
    return response;

  };
}
