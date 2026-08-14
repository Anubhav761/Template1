// static/js/main.js - OneTech Client-Side E-Commerce Script

document.addEventListener('DOMContentLoaded', () => {
    initCategoriesNav();
    updateBadges();
    initDealsTimer();
    initProductTabs();
    initLiveSearch();
    initShopPage();
    initProductDetailPage();
    initCartPage();
    initCheckoutPage();
    initBlogPage();
});

// --- LocalStorage State Management ---
function getCart() {
    try {
        return JSON.parse(localStorage.getItem('onetech_cart')) || {};
    } catch (e) {
        return {};
    }
}

function saveCart(cart) {
    localStorage.setItem('onetech_cart', JSON.stringify(cart));
    updateBadges();
}

function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem('onetech_wishlist')) || [];
    } catch (e) {
        return [];
    }
}

function saveWishlist(wishlist) {
    localStorage.setItem('onetech_wishlist', JSON.stringify(wishlist));
    updateBadges();
}

function getCartDetails() {
    const cart = getCart();
    const cartItems = [];
    let total = 0;

    for (const [pidStr, qty] of Object.entries(cart)) {
        const pid = parseInt(pidStr, 10);
        const product = (window.PRODUCTS || []).find(p => p.id === pid);
        if (product) {
            const subtotal = product.price * qty;
            total += subtotal;
            cartItems.push({ product, quantity: qty, subtotal });
        }
    }

    return { cartItems, total };
}

function updateBadges() {
    const cart = getCart();
    const count = Object.values(cart).reduce((sum, q) => sum + q, 0);
    const { total } = getCartDetails();
    const wishlist = getWishlist();

    const countElem = document.getElementById('cart_count');
    const priceElem = document.getElementById('cart_total_header');
    const wishCountElem = document.getElementById('wishlist_count');

    if (countElem) countElem.textContent = count;
    if (priceElem) priceElem.textContent = '$' + total.toFixed(2);
    if (wishCountElem) wishCountElem.textContent = wishlist.length;
}

// --- Cart Actions ---
function addToCart(productId, qty = 1) {
    const cart = getCart();
    const pidStr = String(productId);
    cart[pidStr] = (cart[pidStr] || 0) + qty;
    saveCart(cart);
    showToast('Item added to cart!');
}

function updateCartQty(productId, qty) {
    const cart = getCart();
    const pidStr = String(productId);
    if (qty > 0) {
        cart[pidStr] = qty;
    } else {
        delete cart[pidStr];
    }
    saveCart(cart);
    if (window.location.pathname.includes('cart.html')) {
        initCartPage();
    }
}

function removeFromCart(productId) {
    const cart = getCart();
    delete cart[String(productId)];
    saveCart(cart);
    showToast('Item removed from cart');
    if (window.location.pathname.includes('cart.html')) {
        initCartPage();
    }
}

// --- Wishlist Actions ---
function toggleWishlist(productId, btnElem) {
    const wishlist = getWishlist();
    const index = wishlist.indexOf(productId);
    let msg = "";

    if (index > -1) {
        wishlist.splice(index, 1);
        msg = "Item removed from wishlist";
        if (btnElem) btnElem.classList.remove('active');
    } else {
        wishlist.push(productId);
        msg = "Item added to wishlist";
        if (btnElem) btnElem.classList.add('active');
    }

    saveWishlist(wishlist);
    showToast(msg);
}

// --- UI Utilities ---
function showToast(msg) {
    const container = document.getElementById('toast_container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'alert alert-success';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => { toast.remove(); }, 3000);
}

function initCategoriesNav() {
    const catMenus = document.querySelectorAll('.cat_menu');
    if (!catMenus.length || !window.CATEGORIES) return;

    catMenus.forEach(catMenu => {
        catMenu.innerHTML = window.CATEGORIES.map(cat => `
            <li>
                <a href="shop.html?category=${cat.id}">
                    <span><i class="fas ${cat.icon} me-2"></i> ${cat.name}</span>
                    <i class="fas fa-chevron-right"></i>
                </a>
            </li>
        `).join('');
    });
}

// --- Countdown Timer ---
function initDealsTimer() {
    const hrElem = document.getElementById('deals_hr');
    const minElem = document.getElementById('deals_min');
    const secElem = document.getElementById('deals_sec');
    if (!hrElem || !minElem || !secElem) return;

    let hours = 47, mins = 58, secs = 12;
    const timer = setInterval(() => {
        if (secs > 0) secs--;
        else {
            secs = 59;
            if (mins > 0) mins--;
            else {
                mins = 59;
                if (hours > 0) hours--;
                else clearInterval(timer);
            }
        }
        hrElem.textContent = String(hours).padStart(2, '0');
        minElem.textContent = String(mins).padStart(2, '0');
        secElem.textContent = String(secs).padStart(2, '0');
    }, 1000);
}

// --- Product Tabs Filter ---
function initProductTabs() {
    const tabBtns = document.querySelectorAll('.tab_btn');
    const productCards = document.querySelectorAll('.product_card');
    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            productCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// --- Live Search ---
function initLiveSearch() {
    const searchInput = document.querySelector('.header_search_input');
    if (!searchInput) return;

    let dropdown = document.getElementById('live_search_results');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.id = 'live_search_results';
        dropdown.style.cssText = 'position:absolute; top:100%; left:0; right:0; background:#fff; border:1px solid #cbd5e1; border-radius:0 0 8px 8px; z-index:1000; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1); display:none; max-height:300px; overflow-y:auto;';
        searchInput.parentElement.style.position = 'relative';
        searchInput.parentElement.appendChild(dropdown);
    }

    searchInput.addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        if (q.length < 2) {
            dropdown.style.display = 'none';
            return;
        }

        const matches = (window.PRODUCTS || []).filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q)
        ).slice(0, 5);

        if (matches.length === 0) {
            dropdown.innerHTML = '<div style="padding:12px; color:#64748b;">No products found</div>';
        } else {
            dropdown.innerHTML = matches.map(p => `
                <a href="product_detail.html?id=${p.id}" style="display:flex; align-items:center; gap:12px; padding:10px; border-bottom:1px solid #f1f5f9; text-decoration:none; color:#1e293b;">
                    <img src="${p.image}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;">
                    <div>
                        <div style="font-weight:600; font-size:14px;">${p.name}</div>
                        <div style="color:#0e8ce4; font-size:13px; font-weight:700;">$${p.price}</div>
                    </div>
                </a>
            `).join('');
        }
        dropdown.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

// --- Render Helper for Product Card ---
function renderProductCard(p) {
    const wishlist = getWishlist();
    const isFav = wishlist.includes(p.id);

    let badge = '';
    if (p.discount_percent) {
        badge = `<span class="badge_tag badge_discount">-${p.discount_percent}%</span>`;
    } else if (p.is_new) {
        badge = `<span class="badge_tag badge_new">NEW</span>`;
    }

    return `
        <div class="product_card ${p.is_featured ? 'is-featured' : ''} ${p.is_on_sale ? 'is-sale' : ''} ${p.is_best_rated ? 'is-best' : ''}">
            ${badge}
            <div class="fav_btn ${isFav ? 'active' : ''}" onclick="toggleWishlist(${p.id}, this)">
                <i class="fas fa-heart"></i>
            </div>
            <div class="product_thumb">
                <a href="product_detail.html?id=${p.id}">
                    <img src="${p.image}" alt="${p.name}">
                </a>
            </div>
            <div class="product_category">${p.brand}</div>
            <div class="product_name">
                <a href="product_detail.html?id=${p.id}">${p.name}</a>
            </div>
            <div class="rating_box">
                <i class="fas fa-star"></i>
                <span>${p.rating}</span>
                <span class="reviews_count">(${p.reviews_count})</span>
            </div>
            <div class="product_price_row">
                <div>
                    <span class="price_now">$${p.price}</span>
                    ${p.original_price > p.price ? `<span class="price_old">$${p.original_price}</span>` : ''}
                </div>
                <button class="btn_add_cart" onclick="addToCart(${p.id})">
                    <i class="fas fa-cart-plus"></i>
                </button>
            </div>
        </div>
    `;
}

// --- Shop Page Catalog Logic ---
function initShopPage() {
    const shopContainer = document.getElementById('shop_product_grid');
    if (!shopContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || '';
    const brand = urlParams.get('brand') || '';
    const sort = urlParams.get('sort') || 'popular';
    const q = (urlParams.get('q') || '').toLowerCase();
    const onSale = urlParams.get('on_sale') === 'true';

    let filtered = [...(window.PRODUCTS || [])];

    if (category) filtered = filtered.filter(p => p.category === category);
    if (brand) filtered = filtered.filter(p => p.brand === brand);
    if (q) filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    if (onSale) filtered = filtered.filter(p => p.is_on_sale);

    if (sort === 'price_low') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price_high') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else filtered.sort((a, b) => b.sold - a.sold);

    const countElem = document.getElementById('shop_product_count');
    if (countElem) countElem.textContent = filtered.length;

    if (filtered.length === 0) {
        shopContainer.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 40px; text-align: center; background:#fff; border-radius:8px;">
                <i class="fas fa-search fa-3x" style="color:#94a3b8; margin-bottom:15px;"></i>
                <h3>No Products Found</h3>
                <p style="color:#64748b; margin-top:5px;">Try clearing your filters or searching for another keyword.</p>
                <a href="shop.html" class="btn_primary mt-3" style="display:inline-block;">Reset All Filters</a>
            </div>
        `;
    } else {
        shopContainer.innerHTML = filtered.map(renderProductCard).join('');
    }
}

// --- Product Detail Page ---
function initProductDetailPage() {
    const detailContainer = document.getElementById('product_detail_container');
    if (!detailContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const pid = parseInt(urlParams.get('id'), 10) || 1;
    const product = (window.PRODUCTS || []).find(p => p.id === pid) || window.PRODUCTS[0];

    if (!product) return;

    const wishlist = getWishlist();
    const isFav = wishlist.includes(product.id);

    detailContainer.innerHTML = `
        <div class="container py-4">
            <div style="font-size:14px; color:#64748b; margin-bottom:20px;">
                <a href="index.html">Home</a> &gt; <a href="shop.html">Shop</a> &gt; <span style="color:#0e8ce4; font-weight:600;">${product.name}</span>
            </div>

            <div class="product_detail_row">
                <div>
                    <img id="main_img" class="main_gallery_img" src="${product.image}" alt="${product.name}">
                    <div class="gallery_thumbs">
                        ${(product.gallery || [product.image]).map((img, i) => `
                            <img src="${img}" class="${i === 0 ? 'active' : ''}" onclick="changeGalleryImage(this, '${img}')">
                        `).join('')}
                    </div>
                </div>

                <div>
                    <span class="badge_tag badge_new" style="position:static; display:inline-block; margin-bottom:10px;">In Stock (${product.stock} available)</span>
                    <h1 class="detail_title">${product.name}</h1>

                    <div class="rating_box" style="font-size:16px; margin-bottom:15px;">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                        <span style="font-weight:600; color:#333; margin-left:6px;">${product.rating}</span>
                        <span class="reviews_count">(${product.reviews_count} Verified Buyer Reviews)</span>
                    </div>

                    <div style="font-size:32px; font-weight:700; color:#1e293b; margin-bottom:15px;">
                        $${product.price}
                        ${product.original_price > product.price ? `
                            <span style="font-size:20px; color:#94a3b8; text-decoration:line-through; font-weight:400; margin-left:10px;">$${product.original_price}</span>
                            <span style="font-size:14px; background:#fee2e2; color:#ef4444; padding:4px 8px; border-radius:4px; margin-left:10px;">Save ${product.discount_percent}%</span>
                        ` : ''}
                    </div>

                    <p class="detail_desc">${product.description}</p>

                    ${product.colors ? `
                        <div class="mb-4">
                            <label style="font-weight:600; display:block; margin-bottom:8px;">Select Color:</label>
                            <div style="display:flex; gap:10px;">
                                ${product.colors.map(color => `
                                    <button type="button" style="padding:6px 14px; border:1px solid #cbd5e1; border-radius:4px; background:#fff; cursor:pointer;" onclick="selectColor(this)">${color}</button>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div style="display:flex; align-items:center; gap:20px; margin-top:25px;">
                        <div class="qty_input_group">
                            <button class="qty_btn" onclick="adjustQty(-1)">-</button>
                            <input type="text" id="detail_qty" class="qty_val" value="1" readonly>
                            <button class="qty_btn" onclick="adjustQty(1)">+</button>
                        </div>

                        <button onclick="addCurrentProduct(${product.id})" class="btn_primary" style="padding:14px 40px; font-size:16px;">
                            <i class="fas fa-shopping-bag me-2"></i> Add To Cart
                        </button>

                        <div class="fav_btn ${isFav ? 'active' : ''}" style="position:static; width:48px; height:48px; font-size:20px;" onclick="toggleWishlist(${product.id}, this)">
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>

                    <hr style="margin:30px 0; border:0; border-top:1px solid #e2e8f0;">

                    <h3 style="font-size:18px; font-weight:700; margin-bottom:15px;">Technical Specifications</h3>
                    <table class="specs_table">
                        ${Object.entries(product.specs || {}).map(([key, val]) => `
                            <tr>
                                <td>${key}</td>
                                <td>${val}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            </div>
        </div>
    `;
}

function changeGalleryImage(thumb, url) {
    document.getElementById('main_img').src = url;
    document.querySelectorAll('.gallery_thumbs img').forEach(img => img.classList.remove('active'));
    thumb.classList.add('active');
}

function selectColor(btn) {
    document.querySelectorAll('.mb-4 button').forEach(b => {
        b.style.borderColor = '#cbd5e1';
        b.style.fontWeight = 'normal';
    });
    btn.style.borderColor = '#0e8ce4';
    btn.style.fontWeight = 'bold';
}

function adjustQty(amount) {
    const input = document.getElementById('detail_qty');
    let val = parseInt(input.value) || 1;
    val += amount;
    if (val < 1) val = 1;
    input.value = val;
}

function addCurrentProduct(pid) {
    const qty = parseInt(document.getElementById('detail_qty').value) || 1;
    addToCart(pid, qty);
}

// --- Cart Page ---
function initCartPage() {
    const cartContainer = document.getElementById('cart_page_container');
    if (!cartContainer) return;

    const { cartItems, total } = getCartDetails();

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div style="text-align:center; padding:60px 20px; background:#fff; border-radius:12px; max-width:600px; margin:40px auto; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
                <i class="fas fa-shopping-bag fa-4x" style="color:#cbd5e1; margin-bottom:20px;"></i>
                <h2 style="font-size:24px; font-weight:700; color:#1e293b;">Your Shopping Cart is Empty</h2>
                <p style="color:#64748b; margin-top:8px; margin-bottom:25px;">Explore our catalog to add products to your cart.</p>
                <a href="shop.html" class="btn_primary">Start Shopping Now</a>
            </div>
        `;
        return;
    }

    cartContainer.innerHTML = `
        <div class="container py-4">
            <h1 style="font-size:28px; font-weight:700; margin-bottom:25px;">Shopping Cart</h1>
            <div style="display:grid; grid-template-columns: 1fr 350px; gap:30px;">
                <table class="cart_table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cartItems.map(item => `
                            <tr>
                                <td>
                                    <div style="display:flex; align-items:center; gap:15px;">
                                        <img src="${item.product.image}" style="width:60px; height:60px; object-fit:cover; border-radius:6px;">
                                        <div style="font-weight:600;">
                                            <a href="product_detail.html?id=${item.product.id}" style="color:#1e293b; text-decoration:none;">${item.product.name}</a>
                                        </div>
                                    </div>
                                </td>
                                <td>$${item.product.price}</td>
                                <td>
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <button onclick="updateCartQty(${item.product.id}, ${item.quantity - 1})" class="qty_btn" style="width:28px; height:28px;">-</button>
                                        <span>${item.quantity}</span>
                                        <button onclick="updateCartQty(${item.product.id}, ${item.quantity + 1})" class="qty_btn" style="width:28px; height:28px;">+</button>
                                    </div>
                                </td>
                                <td style="font-weight:700; color:#0e8ce4;">$${item.subtotal.toFixed(2)}</td>
                                <td>
                                    <button onclick="removeFromCart(${item.product.id})" style="background:none; border:none; color:#ef4444; cursor:pointer;">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div style="background:#fff; padding:25px; border-radius:8px; border:1px solid #e2e8f0; height:fit-content;">
                    <h3 style="font-size:20px; font-weight:700; margin-bottom:20px;">Order Summary</h3>
                    <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:15px;">
                        <span>Subtotal:</span>
                        <span style="font-weight:600;">$${total.toFixed(2)}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:15px;">
                        <span>Shipping:</span>
                        <span style="color:#22c55e; font-weight:600;">FREE</span>
                    </div>
                    <hr style="margin:15px 0; border:0; border-top:1px solid #e2e8f0;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:20px; font-size:18px; font-weight:700;">
                        <span>Total:</span>
                        <span style="color:#0e8ce4;">$${total.toFixed(2)}</span>
                    </div>
                    <a href="checkout.html" class="btn_primary" style="display:block; text-align:center; width:100%;">
                        Proceed to Checkout <i class="fas fa-arrow-right ms-2"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

// --- Checkout Page ---
function initCheckoutPage() {
    const checkoutContainer = document.getElementById('checkout_page_container');
    if (!checkoutContainer) return;

    const { cartItems, total } = getCartDetails();
    if (cartItems.length === 0) {
        window.location.href = 'shop.html';
        return;
    }

    checkoutContainer.innerHTML = `
        <div class="container py-4">
            <h1 style="font-size:28px; font-weight:700; margin-bottom:25px;">Checkout</h1>
            <form onsubmit="handleCheckout(event)" style="display:grid; grid-template-columns: 1fr 380px; gap:30px;">
                <div style="background:#fff; padding:30px; border-radius:8px; border:1px solid #e2e8f0;">
                    <h3 style="font-size:20px; font-weight:700; margin-bottom:20px;">Shipping & Billing Information</h3>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
                        <div>
                            <label style="display:block; font-weight:600; margin-bottom:6px;">First Name</label>
                            <input type="text" required style="width:100%; padding:10px; border:1px solid #cbd5e1; border-radius:6px;">
                        </div>
                        <div>
                            <label style="display:block; font-weight:600; margin-bottom:6px;">Last Name</label>
                            <input type="text" required style="width:100%; padding:10px; border:1px solid #cbd5e1; border-radius:6px;">
                        </div>
                    </div>
                    <div style="margin-bottom:15px;">
                        <label style="display:block; font-weight:600; margin-bottom:6px;">Email Address</label>
                        <input type="email" required style="width:100%; padding:10px; border:1px solid #cbd5e1; border-radius:6px;">
                    </div>
                    <div style="margin-bottom:15px;">
                        <label style="display:block; font-weight:600; margin-bottom:6px;">Street Address</label>
                        <input type="text" required style="width:100%; padding:10px; border:1px solid #cbd5e1; border-radius:6px;">
                    </div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                        <div>
                            <label style="display:block; font-weight:600; margin-bottom:6px;">City</label>
                            <input type="text" required style="width:100%; padding:10px; border:1px solid #cbd5e1; border-radius:6px;">
                        </div>
                        <div>
                            <label style="display:block; font-weight:600; margin-bottom:6px;">Zip Code</label>
                            <input type="text" required style="width:100%; padding:10px; border:1px solid #cbd5e1; border-radius:6px;">
                        </div>
                    </div>
                </div>

                <div style="background:#fff; padding:25px; border-radius:8px; border:1px solid #e2e8f0; height:fit-content;">
                    <h3 style="font-size:20px; font-weight:700; margin-bottom:20px;">Your Order</h3>
                    ${cartItems.map(item => `
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; font-size:14px;">
                            <span>${item.product.name} × ${item.quantity}</span>
                            <span style="font-weight:600;">$${item.subtotal.toFixed(2)}</span>
                        </div>
                    `).join('')}
                    <hr style="margin:15px 0; border:0; border-top:1px solid #e2e8f0;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:20px; font-size:18px; font-weight:700;">
                        <span>Total:</span>
                        <span style="color:#0e8ce4;">$${total.toFixed(2)}</span>
                    </div>
                    <button type="submit" class="btn_primary" style="width:100%; padding:14px; font-size:16px;">
                        Place Order <i class="fas fa-check-circle ms-2"></i>
                    </button>
                </div>
            </form>
        </div>
    `;
}

function handleCheckout(e) {
    e.preventDefault();
    localStorage.removeItem('onetech_cart');
    updateBadges();
    alert('Thank you! Your order has been placed successfully. Order #OT-2026-9812.');
    window.location.href = 'index.html';
}

// --- Blog Page ---
function initBlogPage() {
    const blogContainer = document.getElementById('blog_grid_container');
    if (!blogContainer || !window.BLOG_POSTS) return;

    blogContainer.innerHTML = window.BLOG_POSTS.map(post => `
        <div style="background:#fff; border-radius:10px; overflow:hidden; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
            <img src="${post.image}" style="width:100%; height:200px; object-fit:cover;">
            <div style="padding:20px;">
                <div style="font-size:12px; color:#0e8ce4; font-weight:700; text-transform:uppercase; margin-bottom:6px;">${post.category}</div>
                <h3 style="font-size:18px; font-weight:700; color:#1e293b; margin-bottom:10px;">${post.title}</h3>
                <p style="font-size:14px; color:#64748b; margin-bottom:15px;">${post.excerpt}</p>
                <div style="font-size:12px; color:#94a3b8; display:flex; justify-content:space-between;">
                    <span>By ${post.author}</span>
                    <span>${post.date}</span>
                </div>
            </div>
        </div>
    `).join('');
}
