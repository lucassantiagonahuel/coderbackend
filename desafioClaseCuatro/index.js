const ProductManager = require("./manager/managerProducts");

//Se creará una instancia de la clase “ProductManager”
const dbFolderPath = __dirname + '/db';
const productsPath = dbFolderPath + '/Products.json';

let testProduct = new ProductManager(productsPath) ;

const tests = async () => {

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
// console.log(await testProduct.getProducts())

//Se llamará al método “addProduct” con los campos:
//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
 
// await testProduct.addProduct("Fernet", "Branca",3000,"/dumy","45871ksks",500)  //Add product ok
//  await testProduct.addProduct("Gaseosa", "Coca-Cola",800,"/dumy","45ajaks",800)  //Add product ok
//  await testProduct.addProduct("Fernet", "Branca",3000,"/dumy","45871ksks",500)  //Add product faild code repeat
//  await testProduct.addProduct("Hielo", "Test",600,"/dumy","qwe258",300) //Add product ok
//  await testProduct.addProduct("Hielo", "Test",600,"qwe258",300)  //Add product faild field required

//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado

// const getProductsNew = await testProduct.getProducts();
// console.log(getProductsNew)

//Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.

// console.log(await testProduct.getProductById(1))  //Get by id ok
// console.log(await testProduct.getProductById(4))  //Get by id faild product not exists

//Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.

// const prodUpdatesComplete = {
//     title :"Vaso",
//     description : "Vidrio",
//     price : 250,
//     thumbnail : "/dumy",
//     code : "6536535asda", 
//     stock : 154
//     }

//     const prodUpdatesPartial = {
//         description : "Pepsi",
//         price : 458
//         }
// console.log(await testProduct.updateProduct(3,prodUpdatesComplete)); //Update complete ok
// console.log(await testProduct.updateProduct(2,prodUpdatesPartial));  //Update partial ok
// console.log(await testProduct.updateProduct(8,prodUpdatesPartial));  //Update faild id not exists

//Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.

//console.log(await testProduct.deleteProduct(3)) //delete product ok
//console.log(await testProduct.deleteProduct(4)) //delete product faild id not exists

}

tests();