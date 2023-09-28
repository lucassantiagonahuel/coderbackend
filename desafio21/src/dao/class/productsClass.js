import { urlCreator } from "../../utils/utils.js";
import { productModel } from "../models/product.js";
import { sortOrder } from "../../utils/utils.js";

export class ProductClass {
  //constructor() {}

  getProducts = async (filters, sortOrd, limitProd = 10, pageSearch = 1) => {
    const filter = {};
    if (filters) {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          filter[key] = filters[key];
        }
      }
    }

    filter.stock = {$gt:0}
    const response = await productModel.paginate(filter, {
      limit: limitProd,
      page: pageSearch,
      sort: sortOrder(sortOrd),
    }); //explain('executionStats')
    response.prevLink = response.hasPrevPage ? `/products?limit=${limitProd}&page=${response.prevPage}` : null;
    response.nextLink = response.hasNextPage ? `/products?limit=${limitProd}&page=${response.nextPage}` : null;
    return response;
  };

  getProductById = async (idProduct) => {
    let productExist = await productModel.findById(idProduct);
    if (!productExist) {
      throw new Error(`The product id : ${idProduct} does not exist`);
    }
    return productExist;
  };

  addProduct = async (product, imagesFiles) => {
    const urlsCreated = urlCreator(imagesFiles);
    product.thumbnails = urlsCreated;
    const response = await productModel.create(product);

    return response;
  };

  updateProduct = async (idProd, prodUpgrade, imagesFiles) => {
    const urlsCreated = urlCreator(imagesFiles);
    prodUpgrade.thumbnails = urlsCreated;
    return productModel.updateOne({ _id: idProd }, prodUpgrade);
  };

  deleteProduct = async (idProd) => {
    return productModel.deleteOne({ _id: idProd });
  };
}
