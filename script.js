document.addEventListener('DOMContentLoaded', function() {
  // Auth logic to show/hide header and menu based on login status
  const loggedInUser = localStorage.getItem('loggedInUser');
  const isLoginPage = window.location.pathname.includes('login.html');
  const isSignupPage = window.location.pathname.includes('signup.html');

  if (isLoginPage || isSignupPage) {
    // Hide header and side menu on login and signup pages
    const header = document.querySelector('.header');
    if (header) header.style.display = 'none';
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) sideMenu.style.display = 'none';
  } else {
    // For other pages, show/hide nav links and side menu based on login status
    const cartLink = document.querySelector('.nav a[href="cart.html"]');
    const loginLink = document.querySelector('.nav a[href="login.html"]');
    const signupLink = document.querySelector('.nav a[href="signup.html"]');
    const userMenu = document.querySelector('.user-menu');

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      if (cartLink) cartLink.style.display = 'inline';
      if (loginLink) loginLink.remove();
      if (signupLink) signupLink.remove();
      if (userMenu) userMenu.style.display = 'block';
      const userNameSpan = document.getElementById('userName');
      if (userNameSpan) userNameSpan.textContent = `Welcome, ${user.name}`;
    } else {
      if (cartLink) cartLink.style.display = 'none';
      if (loginLink) loginLink.style.display = 'inline';
      if (signupLink) signupLink.style.display = 'inline';
      if (userMenu) userMenu.style.display = 'none';
      const userNameSpan = document.getElementById('userName');
      if (userNameSpan) userNameSpan.textContent = '';
    }

    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) {
      sideMenu.style.display = loggedInUser ? 'block' : 'none';
    }
  }

  function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    if (menu.style.left === "0px") {
      menu.style.left = "-240px";
    } else {
      menu.style.left = "0px";
    }
  }

  // Modal functionality
  const modal = document.getElementById("productModal");
  const closeBtn = document.getElementsByClassName("close")[0];
  let currentProduct = null;

  if (closeBtn) {
    closeBtn.onclick = function() {
      modal.style.display = "none";
    }
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Open modal with product details or redirect to category pages
  document.querySelectorAll('.featured-products .product-card').forEach(card => {
    card.addEventListener('click', function() {
      const title = this.querySelector('h3').textContent;

      if (title === 'Ear Rings') {
        window.location.href = 'earrings.html';
      } else if (title === 'Diamond Ring') {
        window.location.href = 'diamond-rings.html';
      } else if (title === 'Neck Chains') {
        window.location.href = 'neck-chains.html';
      } else if (title === 'Bracelet') {
        window.location.href = 'bracelet.html';
      } else if (title === 'Bangles') {
        window.location.href = 'bangles.html';
      } else {
        const code = this.getAttribute('data-code');
        const price = this.getAttribute('data-price');
        const mrp = this.getAttribute('data-mrp');
        const images = JSON.parse(this.getAttribute('data-images'));
        const description = this.getAttribute('data-description');

        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalCode').textContent = `Product ID: ${code}`;
        document.getElementById('modalDescription').textContent = description;
        document.getElementById('modalPrice').innerHTML = `MRP: <del>₹${mrp}</del> Offer Price: ₹${price}`;

        const imagesContainer = document.getElementById('modalImages');
        imagesContainer.innerHTML = '';
        images.forEach(imgSrc => {
          const img = document.createElement('img');
          img.src = imgSrc;
          img.alt = title;
          imagesContainer.appendChild(img);
        });

        currentProduct = { code, title, price, mrp, images };
        modal.style.display = "block";
      }
    });
  });

  // Add to cart
  const addToCartBtn = document.getElementById('addToCartBtn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      if (currentProduct) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(currentProduct);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${currentProduct.title} added to cart!`);
        window.location.href = 'cart.html';
      }
    });
  }

  // Share functionality
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', function() {
      if (currentProduct) {
        const shareData = {
          title: currentProduct.title,
          text: `Check out this ${currentProduct.title} for ₹${currentProduct.price}`,
          url: window.location.href
        };

        if (navigator.share) {
          navigator.share(shareData);
        } else {
          // Fallback to WhatsApp
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`;
          window.open(whatsappUrl, '_blank');
        }
      }
    });
  }

  // Add to cart for product cards on collection pages
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.product-card');
      const code = card.getAttribute('data-code');
      const price = card.getAttribute('data-price');
      const mrp = card.getAttribute('data-mrp');
      const title = card.querySelector('h3').textContent;
      const images = Array.from(card.querySelectorAll('.image-grid img')).map(img => img.src);

      const product = { code, title, price, mrp, images };
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${title} added to cart!`);
      window.location.href = 'cart.html';
    });
  });

  // Search functionality
  const productDatabase = [
    // Earrings
    { name: 'Hoop Earrings', id: 'ER001', page: 'earrings.html' },
    { name: 'Stud Earrings', id: 'ER002', page: 'earrings.html' },
    { name: 'Chandelier Earrings', id: 'ER003', page: 'earrings.html' },
    { name: 'Drop Earrings', id: 'ER004', page: 'earrings.html' },

    // Diamond Rings
    { name: 'Solitaire Diamond Ring', id: 'DR001', page: 'diamond-rings.html' },
    { name: 'Halo Diamond Ring', id: 'DR002', page: 'diamond-rings.html' },
    { name: 'Vintage Diamond Ring', id: 'DR003', page: 'diamond-rings.html' },
    { name: 'Three-Stone Diamond Ring', id: 'DR004', page: 'diamond-rings.html' },

    // Neck Chains
    { name: 'Gold Chain', id: 'NC001', page: 'neck-chains.html' },
    { name: 'Silver Chain', id: 'NC002', page: 'neck-chains.html' },
    { name: 'Diamond Chain', id: 'NC003', page: 'neck-chains.html' },
    { name: 'Plated Chain', id: 'NC004', page: 'neck-chains.html' },

    // Bracelets
    { name: 'Gold Bracelet', id: 'BR001', page: 'bracelet.html' },
    { name: 'Silver Bracelet', id: 'BR002', page: 'bracelet.html' },
    { name: 'Diamond Bracelet', id: 'BR003', page: 'bracelet.html' },
    { name: 'Leather Bracelet', id: 'BR004', page: 'bracelet.html' },

    // Bangles
    { name: 'Gold Bangles', id: 'BG001', page: 'bangles.html' },
    { name: 'Silver Bangles', id: 'BG002', page: 'bangles.html' },
    { name: 'Diamond Bangles', id: 'BG003', page: 'bangles.html' },
    { name: 'Plastic Bangles', id: 'BG004', page: 'bangles.html' },
  ];

  function performSearch(query) {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return;

    // Check for exact product name match
    const nameMatch = productDatabase.find(product =>
      product.name.toLowerCase().includes(lowerQuery)
    );

    if (nameMatch) {
      window.location.href = nameMatch.page;
      return;
    }

    // Check for exact ID match
    const idMatch = productDatabase.find(product =>
      product.id.toLowerCase() === lowerQuery
    );

    if (idMatch) {
      window.location.href = idMatch.page;
      return;
    }

    // If no match found, show alert
    alert('No product found matching your search. Please try a different product name or ID.');
  }

  // Search button click
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      const query = document.getElementById('searchInput').value;
      performSearch(query);
    });
  }

  // Search on Enter key press
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = this.value;
        performSearch(query);
      }
    });
  }

  // Make toggleMenu global
  window.toggleMenu = toggleMenu;

  // Profile menu functionality
  const editProfileLink = document.getElementById('editProfileLink');
  if (editProfileLink) {
    editProfileLink.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Edit Profile feature not implemented yet.');
    });
  }

  const editPasswordLink = document.getElementById('editPasswordLink');
  if (editPasswordLink) {
    editPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Edit Password feature not implemented yet.');
    });
  }

  // Logout functionality
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('loggedInUser');
      alert('Logged out successfully!');
      window.location.href = 'login.html';
    });
  }

  // Sign Up functionality
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('password').value;

      // Store user data in localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const existingUser = users.find(user => user.phone === phone);
      if (existingUser) {
        alert('User with this phone number already exists.');
        return;
      }
      users.push({ name, phone, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Sign up successful! Please log in.');
      window.location.href = 'login.html';
    });

    // Continue with Phone (simplified)
    document.getElementById('continuePhone').addEventListener('click', function() {
      alert('Continue with Phone feature not implemented yet.');
    });

    // Continue with Gmail (simplified)
    document.getElementById('continueGmail').addEventListener('click', function() {
      alert('Continue with Gmail feature not implemented yet.');
    });
  }

  // Login functionality
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const phone = document.getElementById('loginPhone').value;
      const password = document.getElementById('loginPassword').value;

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.phone === phone && u.password === password);
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'index.html';
      } else {
        alert('Invalid phone number or password.');
      }
    });

    // Login with Phone Only
    document.getElementById('loginPhoneOnly').addEventListener('click', function() {
      const phone = document.getElementById('loginPhone').value;
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.phone === phone);
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'index.html';
      } else {
        alert('Phone number not found.');
      }
    });
  }

  // Cart modal functionality
  function openCartModal() {
    displayCart();
    document.getElementById('cartModal').style.display = 'block';
  }

  function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
  }

  // Close cart modal when clicking outside of it
  window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    const productModal = document.getElementById('productModal');
    if (event.target == cartModal) {
      cartModal.style.display = 'none';
    }
    if (event.target == productModal) {
      productModal.style.display = 'none';
    }
  }

  function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('modalCartItems');
    const cartTotalDiv = document.getElementById('modalCartTotal');

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalDiv.innerHTML = '';
      return;
    }

    let total = 0;
    cartItemsDiv.innerHTML = cart.map((item, index) => {
      total += parseInt(item.price);
      return `
        <div class="cart-item">
          <img src="${item.images[0]}" alt="${item.title}" style="width: 50px; height: 50px;">
          <div>
            <h4>${item.title}</h4>
            <p>₹${item.price}</p>
          </div>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
    }).join('');

    cartTotalDiv.innerHTML = `<h3>Total: ₹${total}</h3>`;
  }

  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
  }

  function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
  }

  function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    alert('Checkout functionality not implemented yet.');
  }

  // Make functions global
  window.openCartModal = openCartModal;
  window.closeCartModal = closeCartModal;
  window.displayCart = displayCart;
  window.removeFromCart = removeFromCart;
  window.clearCart = clearCart;
  window.checkout = checkout;

  // Event listeners for cart actions
  const clearCartBtn = document.getElementById('clearCartBtn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', checkout);
  }
});
