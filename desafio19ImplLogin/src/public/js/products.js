const logoutBtn = document.getElementById("logoutBtn");

const  addToCart = (productId)=> {
    console.log('The product id :', productId);
};

if (logoutBtn) {
    logoutBtn.addEventListener("click", e => {
      e.preventDefault();
      console.log("Logging out...");
      fetch("/api/sessions/logout", {
        method: "post"
      }).then(response => {
        console.log(response.status);
        if (response.status === 200) {
          window.location.href = "/login";
        } else {
          console.error("Error al cerrar la sesión.");
        }
      }).catch(error => {
        console.error("Error al cerrar la sesión:", error);
      });
    });
  }