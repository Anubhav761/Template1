// data.js - OneTech Catalog & Mock Database for Standalone Static Web App

const CATEGORIES = [
    { id: "laptops", name: "Computers & Laptops", icon: "fa-laptop" },
    { id: "smartphones", name: "Smartphones & Tablets", icon: "fa-mobile-alt" },
    { id: "cameras", name: "Cameras & Photos", icon: "fa-camera" },
    { id: "audio", name: "TV & Audio", icon: "fa-headphones" },
    { id: "gadgets", name: "Gadgets & Wearables", icon: "fa-plug" },
    { id: "gaming", name: "Video Games & Consoles", icon: "fa-gamepad" },
    { id: "accessories", name: "Accessories", icon: "fa-keyboard" }
];

const BRANDS = ["Apple", "Samsung", "Sony", "Huawei", "Lenovo", "Canon", "Bang & Olufsen"];

const PRODUCTS = [
    {
        id: 1,
        name: "Apple iPhone 15 Pro Max 256GB Titanium",
        category: "smartphones",
        brand: "Apple",
        price: 1199,
        original_price: 1299,
        discount_percent: 8,
        rating: 4.9,
        reviews_count: 142,
        stock: 18,
        sold: 85,
        is_featured: true,
        is_on_sale: true,
        is_best_rated: true,
        is_new: true,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80"
        ],
        description: "Experience the ultimate iPhone with Aerospace-grade titanium design, A17 Pro chip, customizable Action button, and the most powerful iPhone camera system ever.",
        specs: {
            "Display": '6.7" Super Retina XDR OLED',
            "Processor": "A17 Pro chip with 6-core GPU",
            "Camera": "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto",
            "Battery": "Up to 29 hours video playback",
            "Weight": "221 grams"
        },
        colors: ["Natural Titanium", "Blue Titanium", "Black Titanium"]
    },
    {
        id: 2,
        name: "Beoplay H7 Wireless Over-Ear Headphones",
        category: "audio",
        brand: "Bang & Olufsen",
        price: 225,
        original_price: 300,
        discount_percent: 25,
        rating: 4.8,
        reviews_count: 96,
        stock: 6,
        sold: 28,
        is_featured: true,
        is_on_sale: true,
        is_best_rated: true,
        is_deal: true,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80"
        ],
        description: "Premium wireless over-ear headphones with authentic sound performance, intuitive touch control interface, and luxury materials including real lambskin leather.",
        specs: {
            "Connectivity": "Bluetooth 4.2, AAC Codec",
            "Battery Life": "Up to 20 hours",
            "Drivers": "40mm Electro-dynamic driver",
            "Frequency": "20 - 22,000 Hz",
            "Weight": "280g"
        },
        colors: ["Black", "Natural Lambskin", "Grey"]
    },
    {
        id: 3,
        name: "Sony Alpha A7 IV Full-Frame Mirrorless Camera",
        category: "cameras",
        brand: "Sony",
        price: 2498,
        original_price: 2699,
        discount_percent: 7,
        rating: 4.9,
        reviews_count: 64,
        stock: 9,
        sold: 41,
        is_featured: true,
        is_on_sale: false,
        is_best_rated: true,
        is_new: true,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&auto=format&fit=crop&q=80"
        ],
        description: "An ideal all-rounder, the Sony Alpha A7 IV delivers 33MP resolution, 4K 60p video, real-time eye AF for humans, animals, and birds, and 5-axis optical image stabilization.",
        specs: {
            "Sensor": "33MP Full-Frame Exmor R CMOS",
            "Video": "4K 60p 10-bit 4:2:2 Internal",
            "Autofocus": "759 Phase-Detection AF Points",
            "ISO Range": "100 - 51,200 (Expandable to 204,800)",
            "Screen": "3.0-inch Vari-Angle Touchscreen"
        },
        colors: ["Matte Black"]
    },
    {
        id: 4,
        name: "Apple MacBook Pro 16\" M3 Max 36GB / 1TB",
        category: "laptops",
        brand: "Apple",
        price: 3499,
        original_price: 3799,
        discount_percent: 8,
        rating: 5.0,
        reviews_count: 88,
        stock: 12,
        sold: 54,
        is_featured: true,
        is_on_sale: true,
        is_best_rated: true,
        is_new: true,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80"
        ],
        description: "The 16-inch MacBook Pro blasts forward with M3 Max, an insanely advanced chip that brings massive performance for demanding workflows.",
        specs: {
            "Display": "16.2-inch Liquid Retina XDR 120Hz",
            "Processor": "M3 Max (16-core CPU, 40-core GPU)",
            "RAM": "36GB Unified Memory",
            "Storage": "1TB SSD",
            "Battery": "Up to 22 hours"
        },
        colors: ["Space Black", "Silver"]
    },
    {
        id: 5,
        name: "Samsung Galaxy S24 Ultra 5G 512GB",
        category: "smartphones",
        brand: "Samsung",
        price: 1299,
        original_price: 1419,
        discount_percent: 8,
        rating: 4.7,
        reviews_count: 110,
        stock: 15,
        sold: 72,
        is_featured: true,
        is_on_sale: true,
        is_best_rated: false,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80"
        ],
        description: "Meet Galaxy S24 Ultra with Galaxy AI, Titanium exterior, built-in S Pen, and 200MP camera system with Quad Tele System.",
        specs: {
            "Display": '6.8" Dynamic AMOLED 2X 120Hz',
            "Processor": "Snapdragon 8 Gen 3 for Galaxy",
            "Camera": "200MP Main + 50MP + 12MP + 10MP",
            "S Pen": "Built-in with Remote Control",
            "Battery": "5000 mAh 45W Fast Charge"
        },
        colors: ["Titanium Gray", "Titanium Black", "Titanium Violet"]
    },
    {
        id: 6,
        name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
        category: "audio",
        brand: "Sony",
        price: 379,
        original_price: 399,
        discount_percent: 5,
        rating: 4.8,
        reviews_count: 210,
        stock: 25,
        sold: 190,
        is_featured: true,
        is_on_sale: true,
        is_best_rated: true,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80"
        ],
        description: "Industry-leading noise canceling with two processors and 8 microphones for unparalleled sound quality and crystal clear hands-free calling.",
        specs: {
            "Noise Cancellation": "Auto NC Optimizer with V1 processor",
            "Battery": "Up to 30 hours with fast charge",
            "Codec": "LDAC, AAC, SBC",
            "Weight": "250g"
        },
        colors: ["Black", "Silver", "Midnight Blue"]
    },
    {
        id: 7,
        name: "Canon EOS R6 Mark II Mirrorless Body",
        category: "cameras",
        brand: "Canon",
        price: 2299,
        original_price: 2499,
        discount_percent: 8,
        rating: 4.9,
        reviews_count: 45,
        stock: 5,
        sold: 30,
        is_featured: false,
        is_on_sale: true,
        is_best_rated: true,
        image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=600&auto=format&fit=crop&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=600&auto=format&fit=crop&q=80"
        ],
        description: "Full-frame performance for photos and video. Shoot up to 40 fps electronically with Dual Pixel CMOS AF II and 4K 60p oversampled video.",
        specs: {
            "Sensor": "24.2MP Full-Frame CMOS",
            "Continuous Shooting": "Up to 40 fps",
            "Video": "4K 60p Uncropped 6K Oversampled",
            "Stabilization": "In-Body IS up to 8 Stops"
        },
        colors: ["Black"]
    },
    {
        id: 8,
        name: "Lenovo Legion Pro 7i Gen 8 Gaming Laptop",
        category: "laptops",
        brand: "Lenovo",
        price: 2199,
        original_price: 2499,
        discount_percent: 12,
        rating: 4.6,
        reviews_count: 52,
        stock: 8,
        sold: 39,
        is_featured: true,
        is_on_sale: true,
        is_best_rated: false,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80"
        ],
        description: "Dominating AI-tuned gaming laptop powered by 13th Gen Intel Core i9 and NVIDIA GeForce RTX 4080 graphics.",
        specs: {
            "Display": '16" WQXGA 240Hz 500 nits',
            "CPU": "Intel Core i9-13900HX",
            "GPU": "NVIDIA GeForce RTX 4080 12GB",
            "RAM": "32GB DDR5 5600MHz",
            "Storage": "1TB PCIe Gen4 SSD"
        },
        colors: ["Onyx Grey"]
    }
];

const DEALS_OF_THE_WEEK = [
    {
        product_id: 2,
        hours: 47,
        mins: 58,
        secs: 12
    }
];

const BLOG_POSTS = [
    {
        id: 1,
        title: "The Future of Mobile Technology in 2026",
        author: "Tech Editor",
        date: "August 2, 2026",
        category: "Smartphones",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
        excerpt: "Discover how AI chips and titanium unibodies are shaping the next generation of handheld computing..."
    },
    {
        id: 2,
        title: "Top 5 ANC Headphones for Audiophiles",
        author: "Audio Enthusiast",
        date: "July 28, 2026",
        category: "Audio & Sound",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
        excerpt: "We review the highest fidelity wireless headphones with active noise cancelling available today..."
    },
    {
        id: 3,
        title: "Selecting the Perfect Mirrorless Camera for 4K Video",
        author: "Creative Director",
        date: "July 15, 2026",
        category: "Photography",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80",
        excerpt: "A comprehensive guide on sensor sizes, autofocus phase detection points, and color science..."
    }
];

if (typeof window !== 'undefined') {
    window.CATEGORIES = CATEGORIES;
    window.BRANDS = BRANDS;
    window.PRODUCTS = PRODUCTS;
    window.DEALS_OF_THE_WEEK = DEALS_OF_THE_WEEK;
    window.BLOG_POSTS = BLOG_POSTS;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CATEGORIES, BRANDS, PRODUCTS, DEALS_OF_THE_WEEK, BLOG_POSTS };
}
