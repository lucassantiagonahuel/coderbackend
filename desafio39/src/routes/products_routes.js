import { Router } from "express";
import { uploader } from "../utils/utils.js";
import productsController from "../controllers/productsControllers.js";
import {
  authToken,
  authorization,
  generateToken,
  passportCall,
} from "../utils/auth.js";
const router = Router();

router.get("/", productsController.getProducts);

router.get("/:pid", productsController.getProductById);

router.post(
  "/",
  uploader.array("thumbnails", 5),
  passportCall("jwt"),
  authorization(["admin","premium"]),
  productsController.createProduct
);

router.put(
  "/:pid",
  uploader.array("thumbnails"),
  passportCall("jwt"),
  authorization(["admin","premium"]),
  productsController.updateProduct
);

router.delete(
  "/:pid",
  passportCall("jwt"),
  authorization(["admin","premium"]),
  productsController.deleteProduct
);

router.post("/loggerTest", productsController.createMock);

export default router;
