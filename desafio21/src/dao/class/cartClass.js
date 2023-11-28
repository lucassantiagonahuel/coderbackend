import { cartModel } from "../models/cart.js";
import { ProductClass } from "../../dao/class/productsClass.js";
const productManager = new ProductClass();
export class CartClass {
  constructor() {}
  getCartId = async (idCart) => {
    const cart = await cartModel.findById(idCart).populate("products.product");
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
    let prodExists = false;
    if (!cart) {
      throw new Error(`The cart id : ${idCart} not exists`);
    }

    cart.products.forEach((prod) => {
      if (prod.product._id.toString() == idProd) {
        prod.quantity++;
        prodExists = true;
      }
    });
    if (!prodExists) {
      cart.products.push({ product: idProd, quantity: 1 });
    }
    const response = cartModel.updateOne({ _id: idCart }, cart);
    return response;
  };

  deleteProductInCart = async (idCart, idProd) => {
    let cart = await this.getCartId(idCart);

    if (!cart) {
      throw new Error(`The cart id : ${idCart} not exists`);
    }

    const productIndex = cart.products.findIndex(
      (prod) => prod.product._id.toString() === idProd
    );

    if (productIndex === -1) {
      throw new Error(`The product id : ${idProd} not exists in cart`);
    }

    cart.products.splice(productIndex, 1);

    const response = cartModel.updateOne(
      { _id: idCart },
      { products: cart.products }
    );

    return response;
  };

  updateCart = async (idCart, products) => {
    let cart = await this.getCartId(idCart);
    if (!cart) {
      throw new Error(`The cart id : ${idCart} not exists`);
    }
    await this.deleteAllProductsInCart(idCart);
    for (const product of products) {
      const prodExist = await productManager.getProductById(product);
      if (!prodExist) {
        throw new Error(`The product id : ${idCart} not exists`);
      }
      await this.addProductInCart(idCart, product);
    }

    return `Cart update ok`;
  };

  updateQuantityProduct = async (idCart, idProd, quantity) => {
    let cart = await this.getCartId(idCart);
    let prodExists = false;
    if (!cart) {
      throw new Error(`The cart id : ${idCart} not exists`);
    }

    cart.products.forEach((prod) => {
      if (prod.product._id.toString() == idProd) {
        prod.quantity = quantity;
        prodExists = true;
      }
    });
    if (!prodExists) {
      cart.products.push({ product: idProd, quantity: 1 });
    }
    const response = cartModel.updateOne({ _id: idCart }, cart);
    return response;
  };

  deleteAllProductsInCart = async (idCart) => {
    let cart = await this.getCartId(idCart);
    if (!cart) {
      throw new Error(`The cart id : ${idCart} not exists`);
    }
    cart.products = [];
    const response = cartModel.updateOne({ _id: idCart }, cart);
    return response;
  };
}
