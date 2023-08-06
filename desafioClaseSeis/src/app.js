import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import{ProductManager} from "./manager/managerProducts.js";
import{Test} from "./tests/tests.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbFolderPath = __dirname + '/db';
const productsPath = dbFolderPath + '/Products.json';

//Se creará una instancia de express
const app = express();
app.use(express.urlencoded({extended:true}))

//Codigo de ejecucion carga de productos, ejecutar en caso de no tener elementos en Products.json y luego volver a cometar
// let testInit = new Test(productsPath);
// testInit.addProductsForTest()


let testProduct = new ProductManager(productsPath) ;

app.get('/products/',async (req,res) =>{
try {    
    const {limit} = req.query;
    const products = await testProduct.getProducts(limit);
    res.send(products)
} catch (error) {
    res.status(500).send("Error al cargar los productos")
}
})

app.get('/products/:pid', async(req,res) => {
    try {
        const prodId = +req.params.pid
        const product = await testProduct.getProductById(prodId)
        res.send(product)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})






app.listen(8080, () => console.log("Server ON port 8080!"))

