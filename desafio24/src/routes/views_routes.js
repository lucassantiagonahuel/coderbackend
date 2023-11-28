import express from "express";
import { ProductManager } from "../dao/manager/managerProducts.js";
import { ProductClass } from "../dao/class/productsClass.js";
import { CartClass } from "../dao/class/cartClass.js";
import __dirname from "../utils/utils.js";
import passport from "passport";
import { authToken,authorization,generateToken,passportCall } from "../utils/auth.js";
const dbFolderPath = __dirname + "/../db";
const productsPath = dbFolderPath + "/Products.json";

const productManager = new ProductManager(productsPath);
let productClass = new ProductClass();
let cartClass = new CartClass();
let productMain = productClass;

const router = express.Router();

const publicAccess = (req, res, next) => {
  if (req.user) return res.redirect('/products');
  next();
}

const privateAccess = (req, res, next) => {
  if (!req.session.user) {
      return res.redirect('/login');
  }
  next();
}

router.get("/", passportCall("jwt"),async (req, res) => {
  const response = await productMain.getProducts();
  const products = response.docs;
  const productsParse = products.map((product) => product.toObject());
  let isEmpty = productsParse.length === 0;
  res.render("home", { products: productsParse, isEmpty });
});

router.get("/realtimeproducts",passportCall("jwt"), async (req, res) => {
  const response = await productMain.getProducts();
  const products = response.docs;
  const productsParse = products.map((product) => product.toObject());
  let isEmpty = productsParse.length === 0;
  res.render("realTimeProducts", { products: productsParse, isEmpty });
});

router.get("/chat",privateAccess ,(req, res) => {
  res.render("chat", {});
});

router.get("/products",passportCall("jwt") ,async (req, res) => {
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
});

router.get("/cart/:cid", passportCall("jwt"),async (req, res) => {
  const cartId = req.params.cid;
  const cart = (await cartClass.getCartId(cartId)).toObject();
  const products = cart.products.map((item) => item.product);
  res.render("cart", { products });
});

router.get("/productdetail", passportCall("jwt"),async (req, res) => {
  const { id } = req.query;
  const product = (await productMain.getProductById(id)).toObject();
  res.render("detailProduct", { product });
});

router.get("/login",async (req, res) => {
  res.render('login',{});
});

router.get("/register", publicAccess,async (req, res) => {
  res.render('register',{});
});

router.get("/current",passportCall("jwt"),authorization('admin'),async (req,res) => {
  let user = req.user
res.render("current",{user});
})

export default router;
