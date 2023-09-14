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

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await productMain.getProducts();
  const products = response.docs;
  const productsParse = products.map((product) => product.toObject());
  let isEmpty = productsParse.length === 0;
  res.render("home", { products: productsParse, isEmpty });
});

router.get("/realtimeproducts", async (req, res) => {
  const response = await productMain.getProducts();
  const products = response.docs;
  const productsParse = products.map((product) => product.toObject());
  let isEmpty = productsParse.length === 0;
  res.render("realTimeProducts", { products: productsParse, isEmpty });
});

router.get("/chat", (req, res) => {
  res.render("chat", {});
});

router.get("/products", async (req, res) => {
  const { limit, sort, page = 1 } = req.query;
  const { docs, hasPrevPage, hasNextPage, prevLink, nextLink } =
    await productMain.getProducts({}, limit, sort, page);
  const products = docs;
  const productsParse = products.map((product) => product.toObject());
  res.render("products", {
    products: productsParse,
    hasPrevPage,
    hasNextPage,
    prevLink,
    nextLink,
  });
});

router.get("/cart/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const cart = (await cartClass.getCartId(cartId)).toObject();
  const products = cart.products.map((item) => item.product);
  res.render("cart", {products});
});

router.get("/productdetail", async (req, res) => {
  const { id } = req.query;
  const product = (await productMain.getProductById(id)).toObject();
  res.render("detailProduct", { product });
});

export default router;
