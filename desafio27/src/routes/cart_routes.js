import { Router } from "express";
import  { uploader } from "../utils/utils.js";

import cartsControllers from "../controllers/cartsControllers.js";


const router = Router();

router.get("/:cid", cartsControllers.getCartById);

router.post("/", cartsControllers.createCart);

router.post("/:cid/product/:pid", cartsControllers.addProductInCart);

router.delete("/:cid/products/:pid", cartsControllers.deleteProductInCart);

router.put("/:cid", uploader.array("thumbnails", 5), cartsControllers.updateCart);

router.put("/:cid/products/:pid", cartsControllers.updateQuantityProductInCart);

router.delete("/:cid", cartsControllers.deleteCart);

export default router;
