import { Router } from "express";
import { MessageClass } from "../dao/class/messageClass.js";

const router = Router();
const messageClass = new MessageClass();

router.get("/", async (req, res) => {
  try {
    const response = await messageClass.getMessages();
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', async (req,res) =>{
    try {
        const response = await messageClass.addMessage();
        res.send(response);
        
    } catch (error) {
        res.status(500).send(error.message);
    }

});

export default router;
