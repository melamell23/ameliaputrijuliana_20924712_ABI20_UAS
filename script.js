document.addEventListener('DOMContentLoaded', () => {
  // Product data
  const products = [
    {
      id: 1,
      name: 'Buket wisuda',
      price: 250000,
      description: 'Buket wisuda , cocok untuk hadiah romantis rayakan hari istimewa orang tersayang .',
      image: 'buket wisudab.jpg',
    },
    {
      id: 2,
      name: 'Buket Bunga cingcin',
      price: 150000,
      description: 'Buket bunga cingcin elegan, sempurna untuk acara formal.',
      image: 'buket bunga cingcin.jpg',
    },
    {
      id: 3,
      name: 'Buket bunga satin',
      price: 65000,
      description: 'Campuran bunga warna-warni yang ceria .',
      image: 'bunga satin.jpg ',
    },
    {
      id: 4,
      name: 'Buket coklat big.jpg',
      price: 180000,
      description: 'Buket coklat yang membawa kebahagiaan dan manis di hidupmu.',
      image: 'buket coklat big.jpg',
    },
    {
      id: 5,
      name: 'Buket Uang',
      price: 320000,
      description: 'Buket uang cantik di pandnag dan menawan.',
      image: 'buket uang.jpg',
    },
    {
      id: 6,
      name: 'Buket snack',
      price: 40000,
      description: 'Buket snack yang bisa menyesuaikan budget kalian.',
      image: 'buket snack.jpg',
    },
  ];

  // DOM elements
  const productsContainer = document.getElementById('products');
  const cartIcon = document.getElementById('cart-icon');
  const cartCount = document.getElementById('cart-count');
  const cart = document.getElementById('cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');

  let cartItems = [];

  // Render products to the page
  function renderProducts() {
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Rp ${product.price.toLocaleString('id-ID')}</p>
        <button data-id="${product.id}">Tambah ke Keranjang</button>
      `;

      productsContainer.appendChild(productCard);
    });
  }

  // Update the cart item count display
  function updateCartCount() {
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;
  }

  // Render cart items in the cart sidebar
  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
      total += item.price * item.quantity;

      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';

      cartItem.innerHTML = `
        <span class="cart-item-name">${item.name}</span>
        <div class="cart-item-controls">
          <button class="decrease" data-id="${item.id}">-</button>
          <span class="cart-item-qty">${item.quantity}</span>
          <button class="increase" data-id="${item.id}">+</button>
          <button class="remove" data-id="${item.id}">x</button>
        </div>
        <span>Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</span>
      `;

      cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = total.toLocaleString('id-ID');
  }

  // Add a product to the cart
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const cartItem = cartItems.find(item => item.id === id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    renderCart();
  }

  // Remove a product from the cart
  function removeFromCart(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    updateCartCount();
    renderCart();
  }

  // Change the quantity of a product in the cart
  function changeQuantity(id, delta) {
    const cartItem = cartItems.find(item => item.id === id);
    if (!cartItem) return;

    cartItem.quantity += delta;
    if (cartItem.quantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartCount();
      renderCart();
    }
  }

  // Event listeners for product buttons and cart controls
  productsContainer.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      const id = parseInt(e.target.getAttribute('data-id'));
      addToCart(id);
    }
  });

  cartItemsContainer.addEventListener('click', e => {
    const id = parseInt(e.target.getAttribute('data-id'));
    if (e.target.classList.contains('remove')) {
      removeFromCart(id);
    } else if (e.target.classList.contains('increase')) {
      changeQuantity(id, 1);
    } else if (e.target.classList.contains('decrease')) {
      changeQuantity(id, -1);
    }
  });

  // Toggle cart visibility
  cartIcon.addEventListener('click', () => {
    cart.classList.toggle('visible');
  });

  // Close cart sidebar
  closeCartBtn.addEventListener('click', () => {
    cart.classList.remove('visible');
  });

  // Checkout process
  checkoutBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
      alert('Keranjang kosong!');
      return;
    }
    alert('Terima kasih telah berbelanja!');
    cartItems = [];
    updateCartCount();
    renderCart();
    cart.classList.remove('visible');
  });

  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Initialize the page
  renderProducts();
  updateCartCount();
});
