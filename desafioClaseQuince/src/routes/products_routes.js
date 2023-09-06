import { Router } from "express";
import { ProductManager } from "../dao/manager/managerProducts.js";
import {ProductClass} from "../dao/class/productsClass.js";
import __dirname, { uploader } from "../utils/utils.js";
const router = Router();

const dbFolderPath = __dirname + "/../db";
const productsPath = dbFolderPath + "/Products.json";

let productFileSystem = new ProductManager(productsPath);
let productClass = new ProductClass();
let productMain = productClass;

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productMain.getProducts(limit);
    console.log(products);
    res.send(products);
  } catch (error) {
    res.status(error.status).send("Error al cargar los productos");
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const prodId = req.params.pid;
    const product = await productMain.getProductById(prodId);
    res.send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", uploader.array("thumbnails", 5), async (req, res) => {
  try {
    const prod = req.body;
    const imagesFiles = req.files;
    const response = await productMain.addProduct(prod, imagesFiles);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:pid", uploader.array("thumbnails"), async (req, res) => {
  try {
    const prodId = req.params.pid;
    const prodUpgrade = req.body;
    const imagesFiles = req.files;
    const response = await productMain.updateProduct(
      prodId,
      prodUpgrade,
      imagesFiles
    );
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const prodId = req.params.pid;
    const response = await productMain.deleteProduct(prodId);
    res.send(response);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

export default router;
