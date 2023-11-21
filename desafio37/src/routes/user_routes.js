import { Router } from "express";
import userController from "../controllers/userController.js";
import { authorization } from "../utils/auth.js";

const router = Router();

router.get("/:email", userController.getUserByEmail);

router.post("/", userController.sendEmailResetPassword);

router.put("/", userController.updatePassword);

router.put("/:uid",authorization(["admin"]),userController.updateRole);

export default router;
