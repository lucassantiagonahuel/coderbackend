import { urlCreator } from "../../utils/utils.js";
import { productModel } from "../models/product.js";

export class ProductClass {
  //constructor() {}

  getProducts = async (limit = 0) => {
    let products = [];
    if (limit > 0) {
      products = await productModel.find().limit(limit);;
      console.log(products)
    }else{

      products = await productModel.find();
    }
    return products;
  };

  getProductById = async (idProduct) => {
    let productExist = await productModel.findById(idProduct);
    if (!productExist) {
      throw new Error(`The product id : ${idProduct} does not exist`);
    }
    return productExist;
  };

  addProduct = async (product,imagesFiles) => {
    const urlsCreated = urlCreator(imagesFiles);
    product.thumbnails = urlsCreated;
    const response = await productModel.create(product);

    return response;
  };

  updateProduct = async (idProd, prodUpgrade, imagesFiles) => {

    const urlsCreated = urlCreator(imagesFiles);
    prodUpgrade.thumbnails = urlsCreated;
    const result = await productModel.updateOne({_id : idProd},prodUpgrade);
    return result;
  };

  deleteProduct = async (idProd) => {
    const result = await productModel.deleteOne({_id : idProd});

    return result;
  };
}
