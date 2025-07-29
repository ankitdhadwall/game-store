// 🛒 Cart logic (localStorage)
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function addToCart(productId, name, price) {
  let cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, name, price, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`${name} added to cart!`);
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.qty, 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = count;
}

// Attach click event to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    addToCart(productId, name, price);
  });
});

// ✅ Initialize cart count on page load
updateCartCount();

// 🍪 Cookie modal
window.addEventListener('load', () => {
  const cookieModal = document.getElementById('cookieModal');
  if (cookieModal && !localStorage.getItem('cookieConsent')) {
    cookieModal.classList.add('show');
  }
});

const acceptAllBtn = document.getElementById('acceptAll');
if (acceptAllBtn) {
  acceptAllBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'all');
    const cookieModal = document.getElementById('cookieModal');
    if (cookieModal) cookieModal.classList.remove('show');
  });
}

const acceptNecessaryBtn = document.getElementById('acceptNecessary');
if (acceptNecessaryBtn) {
  acceptNecessaryBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'necessary');
    const cookieModal = document.getElementById('cookieModal');
    if (cookieModal) cookieModal.classList.remove('show');
  });
}

// ✅ Highlight active menu item in navbar
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav-center nav a').forEach(link => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '');
    if (currentPath === linkPath) {
      link.classList.add('active');
    }
  });
});

// 📱 Toggle mobile menu
function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  if (menu) menu.classList.toggle('show');
}