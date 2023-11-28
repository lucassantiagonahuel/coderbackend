import express from "express";
import productsRouter from './routes/products_routes.js';
import cartRouter from './routes/cart_routes.js';
import path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "public");
//Se creará una instancia de express
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/static',express.static(publicPath));

app.use('/api/products',productsRouter);
app.use('/api/carts',cartRouter);


app.listen(8080, () => console.log("Server ON port 8080!"))

