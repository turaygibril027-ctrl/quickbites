// Toggle hamburger menu dropdown
function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('active');
}

// Toggle sidebar menu
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Toggle cart modal
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
}

// Shopping cart array
let cart = [];

// Add category to cart (placeholder for user selection)
function addCategoryToCart(category) {
    alert(`Please select a specific item from ${category} to add to cart`);
}

// Add item to cart
function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }
    
    updateCartUI();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Update cart quantity
function updateQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = newQuantity;
        updateCartUI();
    }
}

// Update cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartCountSidebar = document.getElementById('cart-count-sidebar');
    
    cartItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Le ${item.price.toFixed(2)}</p>
            </div>
            <div class="item-controls">
                <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
            </div>
            <div class="item-total">
                Le ${itemTotal.toFixed(2)}
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    const deliveryFee = 5000;
    const total = subtotal + deliveryFee;
    
    document.getElementById('subtotal').textContent = `Le ${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `Le ${total.toFixed(2)}`;
    
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;
    cartCountSidebar.textContent = itemCount;
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (!address || !phone) {
        alert('Please fill in delivery address and phone number');
        return;
    }
    
    const orderSummary = cart.map(item => `${item.name} x${item.quantity}`).join('\n');
    const message = `Order:\n${orderSummary}\nDelivery to: ${address}\nPhone: ${phone}\nPayment: ${paymentMethod}`;
    
    alert('Order placed!\n' + message);
    
    // Reset cart
    cart = [];
    updateCartUI();
    toggleCart();
}

// Close dropdown/sidebar when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('dropdownMenu');
    const hamburger = document.querySelector('.hamburger');
    
    if (!dropdown.contains(e.target) && !hamburger.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});
