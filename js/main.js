// ==========================================
// 1. Data Source (Spare Parts + Cars)
// ==========================================
const products = [
    // --- Spare Parts (Parts) ---
    { id: 1, name: "BMW M3 Rims", price: 500, img: "images/m3-rims.png", category: "Wheels", description: "High-performance rims for your BMW M3." },
    { id: 2, name: "Turbo Kit Stage 2", price: 1200, img: "images/turbo-kit.png", category: "Engine", description: "Stage 2 turbo upgrade for maximum power." },
    { id: 3, name: "Carbon Fiber Spoiler", price: 300, img: "images/carbon-spoiler.png", category: "Body", description: "Aerodynamic spoiler made from carbon fiber." },
    { id: 4, name: "Exhaust System", price: 800, img: "images/exhaust-system.png", category: "Engine", description: "Sport exhaust for better sound and performance." },
    { id: 5, name: "LED Headlights", price: 400, img: "images/led-headlights.png", category: "Body", description: "Bright LED headlights for better visibility." },
    { id: 6, name: "Performance Tires", price: 600, img: "images/performance-tires.png", category: "Wheels", description: "High-grip tires for track and street." },

    // --- Cars ---
    { 
        id: 7, 
        name: "BMW M3 GTR (Most Wanted)", 
        price: 250000, 
        img: "images/car1.webp", 
        category: "Cars", 
        description: "The legendary M3 GTR with V8 engine, race-ready." 
    },
    { 
        id: 8, 
        name: "Nissan Skyline GT-R R34", 
        price: 180000, 
        img: "images/car2.webp", 
        category: "Cars", 
        description: "Godzilla itself. Midnight Purple paint, fully tuned." 
    },
    {
        id: 9,
        name: "Toyota Supra MK4",
        price: 150000,
        img: "images/car3.png",
        category: "Cars",
        description: "2JZ engine with 1000HP setup. Street legal beast."
    },
    {
        id: 10,
        name: "Mazda RX-7 FD",
        price: 120000,
        img: "images/car4.jpg",
        category: "Cars",
        description: "Rotary engine masterpiece. Tuned for drift and track."
    },
    {
        id: 11,
        name: "Subaru WRX STI",
        price: 90000,
        img: "images/car5.jpg",
        category: "Cars",
        description: "AWD beast with turbo power. Rally inspired."
    },
    {
        id: 12,
        name: "Mitsubishi Lancer Evo X",
        price: 85000,
        img: "images/car6.jpg",
        category: "Cars",
        description: "Evolution series finale. Ultimate performance."
    },
    {
        id: 13,
        name: "Honda Civic Type R",
        price: 70000,
        img: "images/car7.jpg",
        category: "Cars",
        description: "Hatchback terror with VTEC fury."
    },
    {
        id: 14,
        name: "Nissan 350Z",
        price: 65000,
        img: "images/car8.jpg",
        category: "Cars",
        description: "Iconic sports car with V6 power and perfect balance."
    },
    {
        id: 15,
        name: "Toyota Celica GT-Four",
        price: 55000,
        img: "images/car9.jpg",
        category: "Cars",
        description: "Rally-inspired coupe with AWD and turbocharged engine."
    },
    {
        id: 16,
        name: "Mitsubishi 3000GT VR-4",
        price: 60000,
        img: "images/car10.jpg",
        category: "Cars",
        description: "Luxury sports car with twin-turbo V6 and all-wheel drive."
    }
];

// Cart functions with quantity support
function addToCart(productId, quantity = 1) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.productId == productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId: productId, quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showCartModal(productId, quantity);
}

function getCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = [];
    cart.forEach(item => {
        let product = products.find(p => p.id == item.productId);
        if (product) {
            cartItems.push({
                ...product,
                quantity: item.quantity,
                totalPrice: product.price * item.quantity
            });
        }
    });
    return cartItems;
}

function calculateTotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
}

function updateCartQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.productId == productId);

    if (itemIndex !== -1) {
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1); // Remove item if quantity is 0
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

function getCartItemCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => total + item.quantity, 0);
}



function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    // Get wishlist to know which products are liked
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    container.innerHTML = products.map(product => {
        const isLiked = wishlist.includes(product.id) ? 'active' : '';
        return `
        <div class="product-card" style="position: relative;">
            <div class="wishlist-heart ${isLiked}"
                 data-product-id="${product.id}"
                 onclick="toggleWishlist(${product.id})">
                <i class="fas fa-heart"></i>
            </div>
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <a href="details.html?id=${product.id}" class="btn">عرض التفاصيل</a>
            <button onclick="addToCart(${product.id})" class="btn">أضف إلى السلة</button>
        </div>
    `}).join('');
}

function renderProductDetails() {
    const container = document.getElementById('product-detail');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const product = products.find(p => p.id == id);

    if (product) {
        container.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <button onclick="addToCart(${product.id})" class="btn">أضف إلى السلة</button>
        `;
    } else {
        container.innerHTML = '<p>المنتج غير موجود.</p>';
    }
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    if (!container || !totalContainer) return;

    const cartItems = getCartItems();
    container.innerHTML = '';
    if (cartItems.length === 0) {
        container.innerHTML = '<p>السلة فارغة.</p>';
        totalContainer.innerHTML = '';
        return;
    }

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1;">
                <h4>${item.name}</h4>
                <p>$${item.price} للوحدة</p>
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})"
                                style="width: 30px; height: 30px; border-radius: 50%; border: none; background: #003399; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">-</button>
                        <span style="color: #ffd700; font-weight: bold;">${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})"
                                style="width: 30px; height: 30px; border-radius: 50%; border: none; background: #003399; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">+</button>
                    </div>
                    <button onclick="updateCartQuantity(${item.id}, 0)" style="background:red; border:none; color:white; padding:5px 10px; border-radius:5px; cursor:pointer; font-size:0.8rem;">حذف</button>
                </div>
                <p style="color: #ff4500; font-weight: bold; margin-top: 8px;">الإجمالي: $${item.totalPrice}</p>
            </div>
        `;
        container.appendChild(itemDiv);
    });

    const total = calculateTotal(cartItems);
    totalContainer.innerHTML = `<p class="cart-total">المجموع الكلي: $${total}</p>`;
}



function handleCheckout() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("تم الدفع بنجاح!");
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });
}

// ==========================================
// Navbar Injection System
// ==========================================

function injectNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) return;

    // Get current page filename to set active class
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const navbarHTML = `
        <nav class="navbar">
            <div class="container">
                <div class="logo">DotGear</div>
                <ul class="nav-links">
                    <li><a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">الرئيسية</a></li>
                    <li><a href="products.html" class="${currentPage === 'products.html' ? 'active' : ''}">المنتجات</a></li>
                    <li><a href="cart.html" class="${currentPage === 'cart.html' ? 'active' : ''}">السلة</a></li>
                    <li><a href="wishlist.html" class="${currentPage === 'wishlist.html' ? 'active' : ''}">المفضلة</a></li>
                    <li><a href="about.html" class="${currentPage === 'about.html' ? 'active' : ''}">من نحن</a></li>
                    <li><a href="contact.html" class="${currentPage === 'contact.html' ? 'active' : ''}">اتصل بنا</a></li>
                    <li><a href="login.html" class="${currentPage === 'login.html' ? 'active' : ''}">تسجيل الدخول</a></li>
                </ul>
            </div>
        </nav>
    `;

    navbarPlaceholder.innerHTML = navbarHTML;
}

// ==========================================
// Wishlist Logic
// ==========================================

// 1. Get wishlist items from LocalStorage
function getWishlistItems() {
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
    // Filter products to return full objects, not just IDs
    return products.filter(p => wishlistIds.includes(p.id));
}

// 2. Add/Remove from Wishlist (Toggle)
function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.indexOf(productId);

    if (index === -1) {
        // Not found -> add it
        wishlist.push(productId);
        showNotification("تمت الإضافة للمفضلة ❤️");
    } else {
        // Found -> remove it
        wishlist.splice(index, 1);
        showNotification("تم الحذف من المفضلة 💔");
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Update heart icon on current page if present
    updateHeartIcon(productId);
}

// 3. Update Heart Icon (Active Class)
function updateHeartIcon(productId) {
    const hearts = document.querySelectorAll(`.wishlist-heart[data-product-id="${productId}"]`);
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    hearts.forEach(heart => {
        if (wishlist.includes(productId)) {
            heart.classList.add('active');
        } else {
            heart.classList.remove('active');
        }
    });
}

// 4. Notification System (Toast)
function showNotification(message) {
    // Remove existing notification if present
    const oldNotif = document.querySelector('.notification');
    if(oldNotif) oldNotif.remove();

    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.style.background = '#333';
    notif.style.color = '#fff';
    notif.style.borderLeft = '5px solid #ff4500';

    notif.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-info-circle" style="color:#ffd700"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notif);

    // Hide after 3 seconds
    setTimeout(() => {
        notif.style.animation = 'slideOutToRight 0.3s ease-out forwards';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// ==========================================
// Cart Modal System
// ==========================================

function showCartModal(productId, initialQuantity = 1) {
    const product = products.find(p => p.id == productId);
    if (!product) return;

    // Remove existing modal
    const existingModal = document.querySelector('.cart-modal-overlay');
    if (existingModal) existingModal.remove();

    let currentQuantity = initialQuantity;
    let currentPrice = product.price * currentQuantity;

    const modalHTML = `
        <div class="cart-modal-overlay" onclick="closeCartModal()">
            <div class="cart-modal" onclick="event.stopPropagation()">
                <div class="cart-modal-header">
                    <h3>تم إضافة المنتج بنجاح! 🛒</h3>
                    <button class="modal-close" onclick="closeCartModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="cart-modal-content">
                    <div class="product-info">
                        <img src="${product.img}" alt="${product.name}" class="product-image">
                        <div class="product-details">
                            <h4>${product.name}</h4>
                            <p class="product-description">${product.description}</p>
                            <div class="price-display">
                                <span class="unit-price">$${product.price} للوحدة</span>
                            </div>
                        </div>
                    </div>

                    <div class="quantity-selector">
                        <label>الكمية:</label>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="adjustQuantity(-1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-display" id="modal-quantity">${currentQuantity}</span>
                            <button class="quantity-btn" onclick="adjustQuantity(1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>

                    <div class="total-price">
                        <span>الإجمالي: </span>
                        <span class="total-amount" id="modal-total">$${currentPrice}</span>
                    </div>
                </div>

                <div class="cart-modal-actions">
                    <button class="action-btn secondary" onclick="closeCartModal()">
                        <i class="fas fa-shopping-bag"></i>
                        متابعة التسوق
                    </button>
                    <button class="action-btn primary" onclick="goToCart()">
                        <i class="fas fa-shopping-cart"></i>
                        عرض السلة
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Make functions available globally for modal buttons
    window.adjustQuantity = function(change) {
        currentQuantity = Math.max(1, Math.min(10, currentQuantity + change)); // Min 1, Max 10
        currentPrice = product.price * currentQuantity;

        document.getElementById('modal-quantity').textContent = currentQuantity;
        document.getElementById('modal-total').textContent = `$${currentPrice}`;
    };

    window.closeCartModal = function() {
        // Update cart with final quantity
        addToCart(productId, currentQuantity - initialQuantity); // Add the difference
        const modal = document.querySelector('.cart-modal-overlay');
        if (modal) modal.remove();
    };

    window.goToCart = function() {
        // Update cart with final quantity and navigate
        addToCart(productId, currentQuantity - initialQuantity);
        window.location.href = 'cart.html';
    };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    injectNavbar(); // Inject navbar first
    renderProducts();
    renderProductDetails();
    renderCart();
    handleCheckout();
});
