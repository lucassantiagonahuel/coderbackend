import { Router } from "express";
import __dirname, { uploader } from "../utils/utils.js";
import { CartManager } from "../dao/manager/managerCart.js";
import { CartClass } from "../dao/class/cartClass.js";

const dbFolderPath = __dirname + "/../db";
const cartsPath = dbFolderPath + "/carrito.json";
const router = Router();

let testCart = new CartManager(cartsPath);
let cartClass = new CartClass();
let productMain = cartClass;

router.get("/:cid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    let response = await productMain.getCartId(idCart);
    res.send({ products: response.products });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await productMain.addNewCart(req.body);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const response = await productMain.addProductInCart(cartId, prodId);

    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const response = await productMain.deleteProductInCart(cartId, prodId);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:cid", uploader.array("thumbnails", 5), async (req, res) => {
  try {
    const cartId = req.params.cid;
    const {products} = req.body;
    const response = await productMain.updateCart(cartId, products);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const { quantity } = req.body;
    const response = await productMain.updateQuantityProduct(
      cartId,
      prodId,
      quantity
    );
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const response = await productMain.deleteAllProductsInCart(cartId);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
