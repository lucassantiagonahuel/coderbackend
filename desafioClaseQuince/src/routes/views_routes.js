import express from "express";
import { ProductManager } from "../dao/manager/managerProducts.js";
import { ProductClass } from "../dao/class/productsClass.js";
import __dirname from "../utils/utils.js";
const dbFolderPath = __dirname + "/../db";
const productsPath = dbFolderPath + "/Products.json";

const productManager = new ProductManager(productsPath);
let productClass = new ProductClass();
let productMain = productClass;

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productMain.getProducts();
  const productsParse = products.map((product) => product.toObject());
  let isEmpty = productsParse.length === 0;
  res.render("home", { products: productsParse, isEmpty });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productMain.getProducts();
  const productsParse = products.map((product) => product.toObject());
  let isEmpty = productsParse.length === 0;
  res.render("realTimeProducts", { products: productsParse, isEmpty });
});

router.get("/chat", (req, res) => {
  res.render("chat", {});
});

export default router;
