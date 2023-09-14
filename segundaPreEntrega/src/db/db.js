import mongoose from "mongoose";

mongoose.connect(
    "mongodb+srv://lucasnahuel:prueba123@coderdb.ni9ceet.mongodb.net/ecommerce"
  );

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

export default db;