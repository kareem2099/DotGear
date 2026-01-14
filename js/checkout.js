// Checkout Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();
});

// 1. Load products from cart and display in summary
function loadOrderSummary() {
    const container = document.getElementById('order-summary-items');
    const totalDisplay = document.getElementById('finalTotal');
    const btnTotalDisplay = document.getElementById('btnTotal');

    const cartItems = getCartItems(); // Function exists in main.js

    if (cartItems.length === 0) {
        container.innerHTML = "<p>السلة فارغة!</p>";
        return;
    }

    let html = '';
    let total = 0;

    cartItems.forEach(item => {
        total += item.price;
        html += `
            <div class="order-item">
                <div style="display:flex; align-items:center;">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="order-info">
                        <h4>${item.name}</h4>
                        <p>الكمية: 1</p>
                    </div>
                </div>
                <div class="order-price">$${item.price}</div>
            </div>
        `;
    });

    container.innerHTML = html;
    totalDisplay.innerText = `$${total}`;
    if(btnTotalDisplay) btnTotalDisplay.innerText = `($${total})`;
}

// 2. Toggle between payment methods (UI Toggle)
function selectPayment(method) {
    const options = document.querySelectorAll('.payment-option');
    const cardDetails = document.getElementById('card-details');

    options.forEach(opt => opt.classList.remove('active'));

    if (method === 'card') {
        options[0].classList.add('active');
        cardDetails.style.display = 'block';
    } else {
        options[1].classList.add('active');
        cardDetails.style.display = 'none';
    }
}

// 3. Handle payment form
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simulate loading
            const btn = document.querySelector('.pay-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري المعالجة...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                alert('🎉 تم الدفع بنجاح! شكراً لطلبك من DotGear.\nرقم الطلب: #' + Math.floor(Math.random() * 10000));
                localStorage.removeItem('cart'); // Empty the cart
                window.location.href = 'index.html';
            }, 2000);
        });
    }
});
