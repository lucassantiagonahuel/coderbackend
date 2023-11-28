document
  .getElementById("resetPasswordForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    var email = document.getElementById("emailInput").value;

    try {
      // Hacer una solicitud al backend para verificar si el usuario existe
      const response = await fetch(`/api/users/${email}`);

      if (response.ok) {
        // Si la respuesta es exitosa, intentar convertir la respuesta a JSON
        const user = await response.json();

        if (user) {
          // Usuario encontrado, redirigir a la vista "changePassword" con el usuario como parámetro
          // window.location.href = `/changePassword?userId=${user._id}`;
          const sendEmailRecovery = await fetch(`/api/users/`, {
            method: "POST", // Método HTTP para actualizar el usuario, ajusta esto según tu API
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          if (sendEmailRecovery.ok) {
            // Si la actualización es exitosa, mostrar un alert
            alert("Por favor revise su casilla de correo");
          } else {
            // Si la actualización no es exitosa, mostrar un alert de error
            console.error(
              `Error al actualizar el usuario: ${sendEmailRecovery.statusText}`
            );
            alert(
              "Error al actualizar el usuario. Por favor, inténtelo de nuevo."
            );
          }
        } else {
          // Usuario no encontrado, mostrar un alert
          alert("Usuario no registrado");
        }
      } else {
        // Si la respuesta no es exitosa, manejar el error
        console.error(`Error al obtener el usuario: ${response.statusText}`);
        alert("Error al obtener el usuario. Por favor, inténtelo de nuevo.");
      }
    } catch (error) {
      // Manejar errores de red u otros errores inesperados
      console.error("Error inesperado:", error);
      alert("Error inesperado. Por favor, inténtelo de nuevo.");
    }
  });
