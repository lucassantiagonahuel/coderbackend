import { Router } from "express";
import { ProductManager } from "../manager/managerProducts.js";
import __dirname, { uploader } from "../utils/utils.js";
const router = Router();

const dbFolderPath = __dirname + "/../db";
const productsPath = dbFolderPath + "/Products.json";

let testProduct = new ProductManager(productsPath);

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await testProduct.getProducts(limit);
    res.send(products);
  } catch (error) {
    res.status(error.status).send("Error al cargar los productos");
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const prodId = +req.params.pid;
    const product = await testProduct.getProductById(prodId);
    res.send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", uploader.array("thumbnails", 5), async (req, res) => {
  try {
    const prod = req.body;
    const imagesFiles = req.files;
    const response = await testProduct.addProduct(prod, imagesFiles);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:pid", uploader.array("thumbnails"), async (req, res) => {
  try {
    const prodId = +req.params.pid;
    const prodUpgrade = req.body;
    const imagesFiles = req.files;
    const response = await testProduct.updateProduct(
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
    const prodId = +req.params.pid;
    const response = await testProduct.deleteProduct(prodId);
    res.send(response);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

export default router;
