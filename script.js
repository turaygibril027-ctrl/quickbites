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
    showNotification(`✅ ${itemName} added to cart!`, true);
}

// Show notification toast with optional proceed button
function showNotification(message, showProceed = false) {
    const toast = document.getElementById('notificationToast');
    const messageSpan = document.getElementById('notificationMessage');
    const proceedBtn = document.getElementById('notificationProceedBtn');
    
    messageSpan.textContent = message;
    
    if (showProceed) {
        proceedBtn.style.display = 'inline-block';
    } else {
        proceedBtn.style.display = 'none';
    }
    
    toast.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Proceed to checkout from notification
function proceedFromNotification() {
    document.getElementById('notificationToast').classList.remove('show');
    toggleCart();
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
    
    const deliveryFee = 0; // FREE DELIVERY!
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
    
    // Calculate total
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    const deliveryFee = 0; // FREE DELIVERY!
    const total = subtotal + deliveryFee;
    
    const orderSummary = cart.map(item => `${item.name} x${item.quantity} = Le ${(item.price * item.quantity).toFixed(2)}`).join('\n');
    const paymentMethodDisplay = {
        'whatsapp': 'WhatsApp',
        'cash': 'Cash on Delivery',
        'mobile': 'Mobile Money'
    }[paymentMethod];
    
    // If WhatsApp payment, send to WhatsApp
    if (paymentMethod === 'whatsapp') {
        const message = `*Order from QuickBite* 🍔\n\n*Customer Details:*\nName: ${phone}\nAddress: ${address}\n\n*Order Items:*\n${orderSummary}\n\n*Summary:*\nSubtotal: Le ${subtotal.toFixed(2)}\nDelivery Fee: FREE 🎉\nTotal: Le ${total.toFixed(2)}\n\n*Payment Method:* WhatsApp\n\nPlease confirm this order. Thank you!`;
        
        // WhatsApp Business number (update with your number)
        const whatsappNumber = '23276995101'; // Format: country code + number without +
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        alert('Opening WhatsApp with your order details...\n\nYour order has been sent to our WhatsApp. Our team will confirm your order shortly!');
        
        // Clear cart and close modal
        cart = [];
        updateCartUI();
        toggleCart();
    } else {
        // For other payment methods, show normal confirmation
        const message = `✅ ORDER CONFIRMED!\n\n📦 Items:\n${orderSummary}\n\n💰 Subtotal: Le ${subtotal.toFixed(2)}\n📦 Delivery Fee: FREE 🎉\n💳 Total: Le ${total.toFixed(2)}\n\n📍 Delivery Address: ${address}\n📞 Phone: ${phone}\n💳 Payment Method: ${paymentMethodDisplay}\n\nThank you for your order!`;
        
        alert(message);
        
        // Reset cart
        cart = [];
        updateCartUI();
        toggleCart();
    }
}

// Close dropdown/sidebar when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('dropdownMenu');
    const hamburger = document.querySelector('.hamburger');
    
    if (!dropdown.contains(e.target) && !hamburger.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});
