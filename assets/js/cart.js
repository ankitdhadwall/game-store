// cart.js
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();

  const buttons = document.querySelectorAll(".product-card .cta-button");
  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      addToCart(index);
    });
  });
});

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productCards = document.querySelectorAll(".product-card");
  const productName = productCards[productId].querySelector("h3").innerText;
  const price = parseFloat(productCards[productId].querySelector(".price").innerText.replace('$',''));

  let existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, name: productName, price: price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((total, item) => total + item.qty, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.innerText = count;
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
