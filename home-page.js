document.addEventListener("DOMContentLoaded", function () {
  const newProductBtn = document.getElementById("newProductBtn");

  newProductBtn.addEventListener("click", function () {
    localStorage.removeItem("editProduct");
    window.location.href = "back-office.html";
  });

  function loadProducts() {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmU4YjdjMjM5YzAwMTUyZjRiNmUiLCJpYXQiOjE3MTgzNTM1NDcsImV4cCI6MTcxOTU2MzE0N30.3rAIY1p1bhDYaK4zP5CwJwCFG2o7iwx8UJO7BVbKLaA",
      },
    })
      .then((response) => response.json())
      .then((products) => {
        const productList = document.getElementById("productList");
        products.forEach((product) => {
          //creazione card per ogni prodotto
          const card = document.createElement("div");
          card.classList.add("card", "mb-3");

          const row = document.createElement("div");
          row.classList.add("row", "g-0");
          card.appendChild(row);

          const colImg = document.createElement("div");
          colImg.classList.add("col-md-4");
          row.appendChild(colImg);
          const imgLink = document.createElement("a");
          imgLink.href = `product-details.html?id=${product._id}`;
          colImg.appendChild(imgLink);

          const img = document.createElement("img");
          img.src = product.imageUrl;
          img.classList.add("img-fluid", "rounded-start");
          img.alt = product.name;
          colImg.appendChild(img);
          imgLink.appendChild(img);

          const colBody = document.createElement("div");
          colBody.classList.add("col-md-8");
          row.appendChild(colBody);

          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");
          colBody.appendChild(cardBody);

          const title = document.createElement("h5");
          title.classList.add("card-title");
          title.textContent = product.name;
          cardBody.appendChild(title);

          const description = document.createElement("p");
          description.classList.add("card-text");
          description.textContent = product.description;
          cardBody.appendChild(description);

          const brand = document.createElement("p");
          brand.classList.add("card-text");
          brand.textContent = `Brand: ${product.brand}`;
          cardBody.appendChild(brand);

          const price = document.createElement("p");
          price.classList.add("card-text");
          price.textContent = `Price: ${product.price}`;
          cardBody.appendChild(price);

          const buttonGroup = document.createElement("div");
          buttonGroup.classList.add("d-grid", "gap-2");

          const editButton = document.createElement("button");
          editButton.classList.add("btn", "btn-secondary");
          editButton.textContent = "Modifica";
          editButton.addEventListener("click", () => {
            localStorage.setItem("editProduct", JSON.stringify(product));
            window.location.href = "back-office.html";
          });

          buttonGroup.appendChild(editButton);
          cardBody.appendChild(buttonGroup);

          productList.appendChild(card);
        });
      })
      .catch((error) => {
        console.log("Errore nel caricamento dei prodotti", error);
      });
  }

  window.editProduct = function (productId) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmU4YjdjMjM5YzAwMTUyZjRiNmUiLCJpYXQiOjE3MTgzNTM1NDcsImV4cCI6MTcxOTU2MzE0N30.3rAIY1p1bhDYaK4zP5CwJwCFG2o7iwx8UJO7BVbKLaA",
      },
    })
      .then((response) => response.json())
      .then((product) => {
        localStorage.setItem("editProduct", JSON.stringify(product));
        window.location.href = "back-office.html";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadProducts();
});
