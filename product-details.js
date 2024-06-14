document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmU4YjdjMjM5YzAwMTUyZjRiNmUiLCJpYXQiOjE3MTgzNTM1NDcsImV4cCI6MTcxOTU2MzE0N30.3rAIY1p1bhDYaK4zP5CwJwCFG2o7iwx8UJO7BVbKLaA",
    },
  })
    .then((response) => response.json())
    .then((product) => {
      document.getElementById("productImage").src = product.imageUrl;
      document.getElementById("productName").textContent = product.name;
      document.getElementById("productDescription").textContent = product.description;
      document.getElementById("productBrand").textContent = `Brand: ${product.brand}`;
      document.getElementById("productPrice").textContent = `Price: ${product.price}`;
    })
    .catch((error) => {
      console.log(error);
    });
});
-document.getElementById("goBackBtn").addEventListener("click", function () {
  window.location.href = "home-page.html";
});
