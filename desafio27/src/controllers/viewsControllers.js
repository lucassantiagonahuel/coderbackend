import express from "express";
import { ProductManager } from "../dao/manager/managerProducts.js";
import { ProductClass } from "../dao/class/productsClass.js";
import { CartClass } from "../dao/class/cartClass.js";
import __dirname from "../utils/utils.js";

const dbFolderPath = __dirname + "/../db";
const productsPath = dbFolderPath + "/Products.json";

const productManager = new ProductManager(productsPath);
let productClass = new ProductClass();
let cartClass = new CartClass();
let productMain = productClass;

const getAllProducts = async (req, res) => {
  const response = await productMain.getProducts();
  const products = response.docs;
  const productsParse = products.map((product) => product.toObject());
  let isEmpty = productsParse.length === 0;
  res.render("home", { products: productsParse, isEmpty });
};

const getRealTimeProducts = async (req, res) => {
  const response = await productMain.getProducts();
  const products = response.docs;
  const productsParse = products.map((product) => product.toObject());
  let isEmpty = productsParse.length === 0;
  res.render("realTimeProducts", { products: productsParse, isEmpty });
};

const getListProducts = async (req, res) => {
  const { limit, sort, page = 1 } = req.query;
  const { docs, hasPrevPage, hasNextPage, prevLink, nextLink } =
    await productMain.getProducts({}, limit, sort, page);
  const products = docs;
  const productsParse = products.map((product) => product.toObject());
  const user = req.user;
  console.log(user);
  res.render("products", {
    products: productsParse,
    hasPrevPage,
    hasNextPage,
    prevLink,
    nextLink,
    user,
  });
};

const getCart = async (req, res) => {
  const cartId = req.params.cid;
  const cart = (await cartClass.getCartId(cartId)).toObject();
  const products = cart.products.map((item) => item.product);
  res.render("cart", { products });
};

const productDetail = async (req, res) => {
  const { id } = req.query;
  const product = (await productMain.getProductById(id)).toObject();
  res.render("detailProduct", { product });
};

const chat = async (req, res) => {
  res.render("chat", {});
};

const login = async (req, res) => {
  res.render("login", {});
};

const register = async (req, res) => {
  res.render("register", {});
};

const getCurrent = async (req,res) => {
    let user = req.user
  res.render("current",{user});
  }

export default {
  getAllProducts,
  getRealTimeProducts,
  getListProducts,
  getCart,
  productDetail,
  chat,
  login,
  register,
  getCurrent
};
