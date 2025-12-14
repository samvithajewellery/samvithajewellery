document.addEventListener('DOMContentLoaded', function() {
  function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalContainer.innerHTML = '';
      return;
    }

    let total = 0;
    let itemsHTML = '';

    cart.forEach((item, index) => {
      total += parseInt(item.price);
      itemsHTML += `
        <div class="cart-item">
          <div class="cart-item-details">
            <h3>${item.title}</h3>
            <p>Product ID: ${item.code}</p>
            <p>Price: ₹${item.price}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
          </div>
          <div class="cart-item-images">
            ${item.images.slice(0, 2).map(img => `<img src="${img}" alt="${item.title}" style="width: 50px; height: 50px; margin: 2px;">`).join('')}
          </div>
        </div>
      `;
    });

    cartItemsContainer.innerHTML = itemsHTML;
    cartTotalContainer.innerHTML = `<h3>Total: ₹${total}</h3>`;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        removeFromCart(index);
      });
    });
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
      alert('Your cart is empty!');
      return;
    }

    // Here you would typically send the cart data to a server for processing
    // For now, we'll just show a success message and clear the cart
    alert('Thank you for your purchase! Your order has been placed.');
    clearCart();
  }

  // Event listeners
  document.getElementById('clearCartBtn').addEventListener('click', clearCart);
  document.getElementById('checkoutBtn').addEventListener('click', checkout);

  // Display cart on page load
  displayCart();
});
