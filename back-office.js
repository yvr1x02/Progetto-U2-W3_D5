document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("productForm");
  const resetButton = document.getElementById("resetButton");
  const submitButton = document.getElementById("createButton");
  const editProduct = JSON.parse(localStorage.getItem("editProduct"));

  if (editProduct) {
    document.getElementById("name").value = editProduct.name;
    document.getElementById("description").value = editProduct.description;
    document.getElementById("brand").value = editProduct.brand;
    document.getElementById("imageUrl").value = editProduct.imageUrl;
    document.getElementById("price").value = editProduct.price;
    submitButton.textContent = "Modifica";
    resetButton.textContent = "Elimina";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const brand = document.getElementById("brand").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const price = document.getElementById("price").value;

    const product = {
      name: name,
      description: description,
      brand: brand,
      imageUrl: imageUrl,
      price: parseFloat(price),
    };

    if (editProduct) {
      updateProduct(editProduct._id, product);
    } else {
      createProduct(product);
    }
  });

  resetButton.addEventListener("click", function () {
    if (editProduct) {
      deleteProduct(editProduct._id);
    } else {
      form.reset();
      submitButton.textContent = "Submit";
    }
  });

  function createProduct(product) {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmU4YjdjMjM5YzAwMTUyZjRiNmUiLCJpYXQiOjE3MTgzNTM1NDcsImV4cCI6MTcxOTU2MzE0N30.3rAIY1p1bhDYaK4zP5CwJwCFG2o7iwx8UJO7BVbKLaA",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore caricamento del prodotto");
        }
        return response.json();
      })
      .then((product) => {
        console.log("Nuovo prodotto creato", product);
        localStorage.setItem("newProduct", JSON.stringify(product));
        alert("Prodotto creato con successo!");
        window.location.href = "home-page.html";
        form.reset();
      })
      .catch((error) => {
        console.log(error);
        alert("Si è verificato un errore durante la creazione del prodotto.");
      });
  }

  function updateProduct(productId, updatedProduct) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmU4YjdjMjM5YzAwMTUyZjRiNmUiLCJpYXQiOjE3MTgzNTM1NDcsImV4cCI6MTcxOTU2MzE0N30.3rAIY1p1bhDYaK4zP5CwJwCFG2o7iwx8UJO7BVbKLaA",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nell'aggiornamento del prodotto");
        }
        return response.json();
      })
      .then((updatedProduct) => {
        console.log("Prodotto aggiornato", updatedProduct);
        localStorage.removeItem("editProduct");
        alert("Prodotto aggiornato con successo!");
        window.location.href = "home-page.html";
        form.reset();
      })
      .catch((error) => {
        console.log(error);
        alert("Si è verificato un errore durante l'aggiornamento del prodotto.");
      });
  }
  function deleteProduct(productId) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmU4YjdjMjM5YzAwMTUyZjRiNmUiLCJpYXQiOjE3MTgzNTM1NDcsImV4cCI6MTcxOTU2MzE0N30.3rAIY1p1bhDYaK4zP5CwJwCFG2o7iwx8UJO7BVbKLaA",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nell'eliminazione del prodotto");
        }
        return response.json();
      })
      .then(() => {
        console.log("Prodotto eliminato");
        localStorage.removeItem("editProduct");
        alert("Prodotto eliminato con successo!");
        window.location.href = "home-page.html";
      })
      .catch((error) => {
        alert("Si è verificato un errore durante l'eliminazione del prodotto.");
      });
  }
});
