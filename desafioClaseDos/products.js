class ProductManager{

constructor(){
    this.products = [];
}

getProducts = () => {
    return this.products;
}

getProductById = (idProduct) => {
    let productExist = this.products.find(prod => prod.id === idProduct)
    if (!productExist) {
        return `Not found`;
    } 
    return productExist;
}

addProduct = (title,description,price,thumbnail,code,stock) => {

    const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock
        }

        if (!title || !description || !price || !thumbnail || !code || stock === null || stock === undefined) {
            console.error("Error: All fields are required.");
            return;
        }

    let codeExist = this.products.findIndex(cod => cod.code === code);

    if(codeExist !== -1){
        console.error(`Error in code ${product.code} the product already exists`);
        return
    }

 
    product.id = this.products.length + 1;

    this.products.push(product)

}

}

let testProduct = new ProductManager ;
testProduct.addProduct("Fernet",3000,"/dumy","45871ksas",500)
testProduct.addProduct("Fernet", "Branca",3000,"/dumy","45871ksks",500)
testProduct.addProduct("Fernet", "Branca",3000,"/dumy","45871ksks",500)
testProduct.addProduct("Gaseosa", "Coca-Cola",800,"/dumy","1111",801)

console.log(testProduct.getProducts())
console.log(testProduct.getProductById(2))
console.log(testProduct.getProductById(3))