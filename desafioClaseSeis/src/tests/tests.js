import{ProductManager} from "../manager/managerProducts.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productsPath = join(__dirname, "../db/Products.json");
let testProduct = new ProductManager(productsPath);


export class Test{


     

    addProductsForTest = async () =>{
     await testProduct.addProduct("Fernet", "Branca",3000,"/dumy","45871ksks",500)  //Add product ok
     await testProduct.addProduct("Gaseosa", "Coca-Cola",800,"/dumy","45ajaks",800)  //Add product ok
     await testProduct.addProduct("Hielo", "Test",600,"/dumy","qwe258",300) //Add product ok
     await testProduct.addProduct("Cerveza", "Patagonia",750,"/dumy","451kskds",300)  //Add product ok
     await testProduct.addProduct("Vino", "Rutini",5000,"/dumy","45aja12ks",1200)  //Add product ok
     await testProduct.addProduct("Gin", "Bombai",8000,"/dumy","qwe25123128",3200) //Add product ok
     await testProduct.addProduct("Ron", "Havanna",9000,"/dumy","45871kssdfks",50)  //Add product ok
     await testProduct.addProduct("Wisky", "Jhonny Walker",80000,"/dumy","4554asajaks",80)  //Add product ok
     await testProduct.addProduct("Ginebra", "Llave",3000,"/dumy","qwe2asd12458",35) //Add product ok
     await testProduct.addProduct("Vodka", "Absolut",6000,"/dumy","qwe2asd1dd",350) //Add product ok
}
}