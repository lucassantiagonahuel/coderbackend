import { Router } from "express";
import __dirname from "../utils/utils.js";
import { CartManager } from "../manager/managerCart.js";

const dbFolderPath = __dirname + "/../db";
const cartsPath = dbFolderPath + "/carrito.json";
const router = Router();

let testCart = new CartManager(cartsPath);

router.get("/:cid", async (req, res) => {
  try {
    const idCart = +req.params.cid;
    let response = await testCart.getCartId(idCart);
    res.send({products : response.products});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await testCart.addNewCart(req.body);
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = +req.params.cid;
    const prodId = +req.params.pid;
    const response = await testCart.addProductInCart(cartId, prodId);

    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
