import { urlCreator } from "../../utils/utils.js";
import { productModel } from "../models/product.js";

export class ProductClass {
  //constructor() {}

  getProducts = async (limit = 0) => {
    //let products = [];
    if (limit > 0) {
      return productModel.find().limit(limit);
    }else{

      return productModel.find();
    }
    //return products;
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
    return productModel.updateOne({_id : idProd},prodUpgrade);

  };

  deleteProduct = async (idProd) => {
    return productModel.deleteOne({_id : idProd});
  };
}
