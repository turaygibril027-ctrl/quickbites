
// Cart array to store items
let cart = [];
const DELIVERY_FEE = 5000;

// Menu categories with items and prices
const menuCategories = {
    'Burger': [
        { name: 'Classic Beef Burger', price: 35000 },
        { name: 'Double Cheese Burger', price: 45000 },
        { name: 'Bacon Burger', price: 42000 },
        { name: 'Spicy Chicken Burger', price: 38000 },
        { name: 'Mushroom Burger', price: 40000 },
        { name: 'Veggie Burger', price: 32000 }
    ],
    'Pizza': [
        { name: 'Pepperoni Pizza', price: 45000 },
        { name: 'Margherita Pizza', price: 40000 },
        { name: 'BBQ Chicken Pizza', price: 48000 },
        { name: 'Seafood Pizza', price: 55000 },
        { name: 'Vegetarian Pizza', price: 38000 },
        { name: 'Four Cheese Pizza', price: 50000 }
    ],
    'Pasta': [
        { name: 'Carbonara Pasta', price: 32000 },
        { name: 'Seafood Spaghetti', price: 48000 },
        { name: 'Garlic Parmesan Pasta', price: 28000 },
        { name: 'Pesto Pasta', price: 35000 },
        { name: 'Bolognese Pasta', price: 30000 },
        { name: 'Creamy Alfredo Pasta', price: 38000 }
    ],
    'Grilled': [
        { name: 'Grilled Beef Steak', price: 55000 },
        { name: 'Grilled Salmon', price: 60000 },
        { name: 'Grilled Chicken Breast', price: 45000 },
        { name: 'Mixed Grill Platter', price: 75000 },
        { name: 'Grilled Shrimp', price: 65000 },
        { name: 'Grilled Lamb Chops', price: 70000 }
    ],
    'African': [
        { name: 'Jollof Rice with Chicken', price: 28000 },
        { name: 'Groundnut Stew', price: 29000 },
        { name: 'Cassava Leaves & Rice', price: 24000 },
        { name: 'Okra Soup with Meat', price: 25000 },
        { name: 'Fried Plantain & Beans', price: 18000 },
        { name: 'Pepper Soup (Spicy)', price: 20000 }
    ],
    'Seafood': [
        { name: 'Grilled Fish Platter', price: 50000 },
        { name: 'Fish Tacos', price: 35000 },
        { name: 'Garlic Shrimp', price: 55000 },
        { name: 'Baked Tilapia', price: 45000 },
        { name: 'Seafood Pasta', price: 48000 },
        { name: 'Fish & Chips', price: 32000 }
    ],
    'RiceDish': [
        { name: 'Chicken Fried Rice', price: 22000 },
        { name: 'Shrimp Fried Rice', price: 32000 },
        { name: 'Vegetable Fried Rice', price: 18000 },
        { name: 'Asian Rice Bowl', price: 25000 },
        { name: 'Pineapple Fried Rice', price: 28000 },
        { name: 'Beef Fried Rice', price: 26000 }
    ],
    'Beverage': [
        { name: 'Coca Cola / Fanta', price: 5000 },
        { name: 'Fresh Mango Juice', price: 8000 },
        { name: 'Fresh Orange Juice', price: 8000 },
        { name: 'Iced Tea', price: 6000 },
        { name: 'Espresso Coffee', price: 7000 },
        { name: 'Milkshakes (Strawberry/Chocolate)', price: 12000 },
        { name: 'Fresh Lemonade', price: 7000 },
        { name: 'Bottled Water', price: 3000 }
    ]
};

// Add category item to cart with selection
function addCategoryToCart(category) {
    const items = menuCategories[category];
    if (!items || items.length === 0) {
        showNotification('Category not found!');
        return;
    }

    // Create selection dialog
    let message = `Select a ${category}:\n\n`;
    items.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - Le ${item.price.toLocaleString()}\n`;
    });
    message += `\nEnter the number (1-${items.length}):`;

    const selection = prompt(message);
    
    if (selection !== null) {
        const index = parseInt(selection) - 1;
        if (index >= 0 && index < items.length) {
            const item = items[index];
            addToCart(item.name, item.price);
        } else {
            showNotification('Invalid selection!');
        }
    }
}

// Add item to cart
function addToCart(itemName, itemPrice) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${itemName} added to cart!`);
}

// Remove item from cart
function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCart();
}

// Update quantity
function updateQuantity(itemName, quantity) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity = Math.max(1, quantity);
        updateCart();
    }
}

// Update cart display
function updateCart() {
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const subtotal = document.getElementById('subtotal');
    const total = document.getElementById('total');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Clear previous items
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 30px;">Your cart is empty</p>';
        subtotal.textContent = 'Le 0';
        total.textContent = 'Le ' + DELIVERY_FEE.toLocaleString();
        return;
    }

    // Add items to cart display
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">Le ${item.price.toLocaleString()}</div>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateQuantity('${item.name}', ${item.quantity - 1})">−</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
                <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItemElement);
    });

    // Calculate totals
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalAmount = subtotalAmount + DELIVERY_FEE;

    subtotal.textContent = 'Le ' + subtotalAmount.toLocaleString();
    total.textContent = 'Le ' + totalAmount.toLocaleString();
}

// Toggle cart modal
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

// Close cart when clicking outside
window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
}

// Checkout function
function checkout() {
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    // Validation
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    if (!address) {
        alert('Please enter delivery address');
        return;
    }

    if (!phone) {
        alert('Please enter phone number');
        return;
    }

    // Generate order summary
    const orderSummary = generateOrderSummary(address, phone, paymentMethod);

    // Process based on payment method
    switch(paymentMethod) {
        case 'whatsapp':
            sendWhatsAppOrder(orderSummary);
            break;
        case 'cash':
            processOrder('Cash on Delivery', address, phone, orderSummary);
            break;
        case 'mobile':
            processOrder('Mobile Money', address, phone, orderSummary);
            break;
        case 'card':
            processOrder('Debit/Credit Card', address, phone, orderSummary);
            break;
    }
}

// Generate order summary
function generateOrderSummary(address, phone, paymentMethod) {
    let summary = '';
    summary += '📦 *QuickBite Order Summary*\n\n';
    summary += '🍔 *Items:*\n';
    
    cart.forEach(item => {
        summary += `• ${item.name} x${item.quantity} = Le ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalAmount = subtotalAmount + DELIVERY_FEE;
    
    summary += `\n💰 *Subtotal:* Le ${subtotalAmount.toLocaleString()}\n`;
    summary += `🚗 *Delivery Fee:* Le ${DELIVERY_FEE.toLocaleString()}\n`;
    summary += `*Total: Le ${totalAmount.toLocaleString()}*\n\n`;
    summary += `📍 *Delivery Address:* ${address}\n`;
    summary += `📱 *Phone:* ${phone}\n`;
    summary += `💳 *Payment Method:* ${paymentMethod}`;
    
    return summary;
}

// Send WhatsApp order
function sendWhatsAppOrder(summary) {
    const whatsappNumber = '+23276995101';
    const encodedMessage = encodeURIComponent(summary);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after sending
    setTimeout(() => {
        cart = [];
        updateCart();
        document.getElementById('cartModal').style.display = 'none';
        document.getElementById('address').value = '';
        document.getElementById('phone').value = '';
        alert('Order sent to WhatsApp! Our team will confirm shortly.');
    }, 1000);
}

// Process other payment methods
function processOrder(paymentMethod, address, phone, summary) {
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalAmount = subtotalAmount + DELIVERY_FEE;

    let message = `✅ Thank you for your order!\n\n`;
    message += `Order Details:\n`;
    cart.forEach(item => {
        message += `• ${item.name} x${item.quantity}\n`;
    });
    message += `\nTotal: Le ${totalAmount.toLocaleString()}\n`;
    message += `Delivery Address: ${address}\n`;
    message += `Payment Method: ${paymentMethod}\n\n`;
    message += `We will contact you shortly at ${phone} to confirm your order.`;

    alert(message);

    // Send email/notification (in real app this would call a backend)
    console.log('Order placed:', {
        items: cart,
        total: totalAmount,
        address: address,
        phone: phone,
        paymentMethod: paymentMethod
    });

    // Clear cart
    cart = [];
    updateCart();
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('address').value = '';
    document.getElementById('phone').value = '';
}

// Notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #25D366;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});