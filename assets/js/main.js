// Cart logic (localStorage)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, name, price) {
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, name, price, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(name + " added to cart!");
}

// Cookies popup
window.addEventListener('load', () => {
  if (!localStorage.getItem('cookieConsent')) {
    const consent = confirm("We use cookies to improve your experience. Accept?");
    if (consent) localStorage.setItem('cookieConsent', true);
  }
});
