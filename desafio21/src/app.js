import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products_routes.js";
import cartRouter from "./routes/cart_routes.js";
import viewsRouter from "./routes/views_routes.js";
import sessionsRouter from "./routes/sessions_routes.js";
import path from "path";
import { configureWebSocket } from "./utils/websocket.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializatePassport from "./config/passport.js";
import db from "./db/db.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "public");

//Se creará una instancia de express
const app = express();
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(publicPath));

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://lucasnahuel:prueba123@coderdb.ni9ceet.mongodb.net/ecommerce",
        ttl: 200000
    }),
    secret: "EcommerceSecret",
    resave:false,
    saveUninitialized:false
}));

initializatePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);


const httpServer = app.listen(8080, () => console.log("Server ON port 8080!"));

configureWebSocket(httpServer);