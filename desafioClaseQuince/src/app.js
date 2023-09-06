import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products_routes.js";
import cartRouter from "./routes/cart_routes.js";
import { MessageClass } from "./dao/class/messageClass.js";
import viewsRouter from "./routes/views_routes.js";
import path from "path";
import { Server } from "socket.io";
import mongoose from "mongoose";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "public");
const mesaggeClass = new MessageClass();

//Se creará una instancia de express
const app = express();
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(publicPath));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

mongoose.connect(
  "mongodb+srv://lucasnahuel:prueba123@coderdb.ni9ceet.mongodb.net/ecommerce"
);
const httpServer = app.listen(8080, () => console.log("Server ON port 8080!"));

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendData", (data) => {
    io.emit("updateList", data);
  });

  socket.on("message", async (data) => {
    await mesaggeClass.addMessage(data);
    let messages = await mesaggeClass.getMessages();
    io.emit("messagesLoad", messages);
  });
  
});
