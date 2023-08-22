import express from 'express';
import { ProductManager } from "../manager/managerProducts.js";
import __dirname from "../utils/utils.js";
const dbFolderPath = __dirname + "/../db";
const productsPath = dbFolderPath + "/Products.json";

const productManager = new ProductManager(productsPath);

const router = express.Router();

router.get('/',async (req,res)=>{
    const products = await productManager.getProducts();
    let isEmpty = products.length === 0
    res.render("home",{products,isEmpty});
});

router.get('/realtimeproducts',async (req,res)=>{
    const products = await productManager.getProducts();
    let isEmpty = products.length === 0
    res.render("realTimeProducts",{products,isEmpty});
});


export default router;