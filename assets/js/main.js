// Cart logic (localStorage)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Attach click event to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    addToCart(productId, name, price);
  });
});

function addToCart(productId, name, price) {
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, name, price, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);

  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.qty, 0);
  document.getElementById('cart-count').textContent = count;
}

// Initialize cart count on page load
updateCartCount();

// Show cookie modal if consent not given
window.addEventListener('load', () => {
  const cookieModal = document.getElementById('cookieModal');
  if (cookieModal && !localStorage.getItem('cookieConsent')) {
    cookieModal.classList.add('show');
  }
});

// Accept All button click
const acceptAllBtn = document.getElementById('acceptAll');
if (acceptAllBtn) {
  acceptAllBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'all');
    const cookieModal = document.getElementById('cookieModal');
    if (cookieModal) cookieModal.classList.remove('show');
  });
}

// Accept Only Necessary button click
const acceptNecessaryBtn = document.getElementById('acceptNecessary');
if (acceptNecessaryBtn) {
  acceptNecessaryBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'necessary');
    const cookieModal = document.getElementById('cookieModal');
    if (cookieModal) cookieModal.classList.remove('show');
  });
}

// Highlight active menu item in navbar based on current URL
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.replace(/\/$/, ''); // remove trailing slash
  document.querySelectorAll('.nav-center nav a').forEach(link => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '');
    if (currentPath === linkPath) {
      link.classList.add('active');
    }
  });
});

// Optional: toggle mobile menu if you have a toggle button
function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  if (menu) {
    menu.classList.toggle('show');
  }
}
