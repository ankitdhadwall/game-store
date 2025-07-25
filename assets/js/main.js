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

// Show cookie modal if consent not given
window.addEventListener('load', () => {
  if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookie-popup').classList.add('show');
  }
});

document.getElementById('accept-cookies').addEventListener('click', () => {
  localStorage.setItem('cookieConsent', true);
  document.getElementById('cookie-popup').classList.remove('show');
});
