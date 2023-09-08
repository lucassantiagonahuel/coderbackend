document.addEventListener("DOMContentLoaded", () => {
const socket = io();
const productForm = document.getElementById("productForm");
let productList = document.querySelector("#productList");

if (!productList) {
    productList = document.createElement("ul");
    productList.id = "productList";
    document.body.appendChild(productList);
  }

const loadProductList = async () => {
    try {
      const updatedResponse = await fetch("/api/products", {
        method: "GET",
      });
  
      if (updatedResponse.ok) {
        const data = await updatedResponse.json();
        socket.emit("sendData", data);
      } else {
        console.error("Error al obtener datos actualizados");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      console.log("ID EN EL JS FRONT: ");
      console.log(productId);
      const response = await fetch("/api/products/" + productId, {
        method: "DELETE",
      });
  
      if (response.ok) {
        loadProductList();
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  productForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: new FormData(productForm),
      });
  
      if (response.ok) {
        loadProductList();
        productForm.reset();
      } else {
        console.error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  productList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
      const button = event.target;
      const productId = button.getAttribute("data-product-id");
      console.log("Eliminar producto con ID:", productId);
      deleteProduct(productId);
    }
  });

  socket.on("updateList", (data) => {
    const dataIsEmpty = data.length === 0;
    if (!dataIsEmpty) {
      productList.innerHTML = "";
      data.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${product.title}
        <button class="delete-button" data-product-id="${product._id}">Eliminar</button>`;
        productList.appendChild(listItem);
      });
    } else {
      productList.innerHTML = "No hay productos cargados";
    }
  });
  
  loadProductList();

});
