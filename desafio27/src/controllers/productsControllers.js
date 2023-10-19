import { ProductManager } from "../dao/manager/managerProducts.js";
import { ProductClass } from "../dao/class/productsClass.js";
import __dirname from "../utils/utils.js";


const dbFolderPath = __dirname + "/../db";
const productsPath = dbFolderPath + "/Products.json";

let productFileSystem = new ProductManager(productsPath);
let productClass = new ProductClass();
let productMain = productClass;

const getProducts = async (req, res) => {
  try {
    const { limit, page, sort, ...filters } = req.query;
    const products = await productMain.getProducts(filters, sort, limit, page);
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(error.status).send("Error al cargar los productos");
  }
};

const getProductById = async (req, res) => {
  try {
    const prodId = req.params.pid;
    const product = await productMain.getProductById(prodId);
    res.send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const prod = req.body;
    const imagesFiles = req.files;
    const response = await productMain.addProduct(prod, imagesFiles);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateProduct = async (req, res) => {
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
};

const deleteProduct = async (req, res) => {
  try {
    const prodId = req.params.pid;
    const response = await productMain.deleteProduct(prodId);
    res.send(response);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
