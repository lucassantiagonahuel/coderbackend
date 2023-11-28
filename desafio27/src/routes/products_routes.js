import { Router } from "express";
import { uploader } from "../utils/utils.js";
import productsController from "../controllers/productsControllers.js";
const router = Router();


router.get("/", productsController.getProducts);

router.get("/:pid", productsController.getProductById);

router.post("/", uploader.array("thumbnails", 5), productsController.createProduct);

router.put("/:pid", uploader.array("thumbnails"), productsController.updateProduct);

router.delete("/:pid", productsController.deleteProduct);

export default router;
