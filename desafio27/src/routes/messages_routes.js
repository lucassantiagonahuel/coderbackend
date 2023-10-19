import { Router } from "express";
import messagesControllers from "../controllers/messagesControllers.js";

const router = Router();

router.get("/", messagesControllers.getMessage);

router.post('/', messagesControllers.sendMessages);

export default router;
