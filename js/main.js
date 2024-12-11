import { products } from './products.js';
import { Cart } from './cart.js';
import { sendToWhatsApp } from './whatsapp.js';
import { Slider } from './slider.js';
import { UserManager } from './user.js';

const cart = new Cart();
const userManager = new UserManager();
const cartModal = document.getElementById('cartModal');
const cartIcon = document.getElementById('cartIcon');
const closeCart = document.getElementById('closeCart');
const productsContainer = document.getElementById('products');
const cartItemsContainer = document.getElementById('cartItems');
const cartCountElement = document.getElementById('cartCount');
const cartTotalElement = document.getElementById('cartTotal');
const sendToWhatsAppButton = document.getElementById('sendToWhatsApp');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const categoryLinks = document.querySelectorAll('.categories-nav a');
const supportWhatsApp = document.getElementById('supportWhatsApp');

// Initialize slider
new Slider();

let currentCategory = 'all';
let searchQuery = '';

// Update UI with user name
userManager.onUserNameChange = (name) => {
  const navActions = document.querySelector('.nav-actions');
  let userNameElement = document.getElementById('userName');

  if (!userNameElement) {
    userNameElement = document.createElement('span');
    userNameElement.id = 'userName';
    userNameElement.className = 'user-name';
    navActions.insertBefore(userNameElement, cartIcon);
  }

  userNameElement.textContent = `Olá, ${name} !`;
};

function filterProducts() {
  return products.filter((product) => {
    const matchesCategory =
      currentCategory === 'all' || product.category === currentCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function updateCartDisplay() {
  cartCountElement.textContent = cart.getItemsCount();
  cartTotalElement.textContent = cart.getTotal().toFixed(2);

  cartItemsContainer.innerHTML = cart.items
    .map(
      (item) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">
                    R$ ${item.price.toFixed(2)} x ${item.quantity}
                </div>
            </div>
            <button class="remove-item" onclick="window.removeFromCart(${
              item.id
            })">
                ❌
            </button>
        </div>
    `,
    )
    .join('');
}

function renderProducts() {
  const filteredProducts = filterProducts();
  productsContainer.innerHTML = filteredProducts
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${
        product.name
      }" class="product-image">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">R$ ${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="window.addToCart(${
              product.id
            })">
                <i class="fas fa-cart-plus"></i> Adicionar ao Carrinho
            </button>
        </div>
    `,
    )
    .join('');
}

// Funções globais para os eventos onclick
window.addToCart = (productId) => {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.addItem(product);
    updateCartDisplay();
  }
};

window.removeFromCart = (productId) => {
  cart.removeItem(productId);
  updateCartDisplay();
};

// Event Listeners
cartIcon.addEventListener('click', () => {
  cartModal.style.display = 'block';
});

closeCart.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

sendToWhatsAppButton.addEventListener('click', () => {
  if (cart.items.length > 0) {
    sendToWhatsApp(cart.items, cart.getTotal(), userManager.getUserName());
    cart.clear();
    updateCartDisplay();
    cartModal.style.display = 'none';
  }
});

searchButton.addEventListener('click', () => {
  searchQuery = searchInput.value;
  renderProducts();
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchQuery = searchInput.value;
    renderProducts();
  }
});

categoryLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    categoryLinks.forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
    currentCategory = link.dataset.category;
    renderProducts();
  });
});

supportWhatsApp.addEventListener('click', (e) => {
  e.preventDefault();
  const supportNumber = '5591982066009';
  const userName = userManager.getUserName();
  const message = `Olá! Sou ${userName} e preciso de ajuda com a loja virtual.`;
  const whatsappUrl = `https://wa.me/${supportNumber}?text=${encodeURIComponent(
    message,
  )}`;
  window.open(whatsappUrl, '_blank');
});

// Initialize user manager
userManager.init();

// Initialize products and cart
renderProducts();
updateCartDisplay();
