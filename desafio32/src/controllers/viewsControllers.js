import __dirname from "../utils/utils.js";
import productsService from "../service/productsService.js";
import cartsService from "../service/cartsService.js";
import UserDTO from "../dao/DTO/user.js";

const getAllProducts = async (req, res) => {
  const response = await productsService.getProducts();
  const products = response.docs;
  const productsParse = products.map((product) => product.toObject());
  let isEmpty = productsParse.length === 0;
  res.render("home", { products: productsParse, isEmpty });
};

const getRealTimeProducts = async (req, res) => {
  const response = await productsService.getProducts();
  const products = response.docs;
  const productsParse = products.map((product) => product.toObject());
  let isEmpty = productsParse.length === 0;
  res.render("realTimeProducts", { products: productsParse, isEmpty });
};

const getListProducts = async (req, res) => {
  const { limit, sort, page = 1 } = req.query;
  const { docs, hasPrevPage, hasNextPage, prevLink, nextLink } =
    await productsService.getProducts({}, sort, limit, page);
  const products = docs;
  const productsParse = products.map((product) => product.toObject());
  const user = req.user;

  res.render("products", {
    products: productsParse,
    hasPrevPage,
    hasNextPage,
    prevLink,
    nextLink,
    user,
  });
};

const getCart = async (req, res) => {
  const cartId = req.params.cid;
  const cart = (await cartsService.getCartById(cartId)).toObject();

  const products = cart.products.map((item) => {
    const productInfo = item.product;
    const quantity = item.quantity;

    productInfo.quantity = quantity;

    return productInfo;
  });

  res.render("cart", { products ,cartId});
};

const productDetail = async (req, res) => {
  const { id } = req.query;
  const product = (await productsService.getProductById(id)).toObject();
  res.render("detailProduct", { product });
};

const chat = async (req, res) => {
  res.render("chat", {});
};

const login = async (req, res) => {
  res.render("login", {});
};

const register = async (req, res) => {
  res.render("register", {});
};

const getCurrent = async (req, res) => {
  let user = req.user;
  let userDTO = new UserDTO({ user });
  res.render("current", { user: userDTO });
};

export default {
  getAllProducts,
  getRealTimeProducts,
  getListProducts,
  getCart,
  productDetail,
  chat,
  login,
  register,
  getCurrent,
};
