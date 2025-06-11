import React from "react";
import {
    FaShoppingCart,
    FaHeart,
    FaSearch,
    FaPhoneAlt,
    FaUser,
    FaGlobe,
} from "react-icons/fa";

function Product() {
    return (
        <div className="bg-white font-sans">
            {/* Header */}
            <header className="border-b text-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 py-2 gap-2 md:gap-0">
                    <div className="flex items-center gap-2 text-gray-600">
                        <FaPhoneAlt className="text-green-600" />
                        <span>Hotline 24/7</span>
                        <span>(025) 9888 2518</span>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 text-gray-600">
                        <span>Sell on Swoo</span>
                        <span>Order Track</span>
                        <div className="flex items-center gap-1">
                            <FaUser /> <span>Login / Register</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaGlobe /> <span>Eng</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navbar */}
            <nav className="border-b py-3 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:justify-between items-center px-4">
                    <h1 className="text-xl font-bold text-green-600">SWOO TECH MART</h1>
                    <div className="flex flex-wrap justify-center gap-4 items-center w-full md:w-auto">
                        <select className="border rounded p-2 text-sm">
                            <option>All Categories</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="border rounded p-2 w-full md:w-60 text-sm"
                        />
                        <button className="bg-green-600 text-white px-4 py-2 rounded">Search</button>
                    </div>
                    <div className="hidden md:flex gap-4 text-xs text-gray-600">
                        <span>FREE SHIPPING OVER $199</span>
                        <span>30 DAYS MONEY BACK</span>
                        <span>100% SECURE PAYMENT</span>
                    </div>
                </div>
            </nav>

            {/* Breadcrumb */}
            <div className="bg-gray-50 text-xs text-gray-600 px-4 py-2">
                <div className="max-w-7xl mx-auto">Home / Shop / Top Cell Phones & Tablets / Somseng Galatero X6...</div>
            </div>

            {/* Product Section */}
            <section className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 flex justify-center">
                    <img
                        src="/public/3 → prod1.jpg.svg"
                        alt="Product"
                        className="rounded-xl shadow"
                    />
                </div>

                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Somseng Galatero X6 Ultra LTE 4G/128 GB Black Smartphone
                    </h2>
                    <div className="text-xl text-green-600 mt-2">$569.00 - $609.00</div>
                    <ul className="text-sm text-gray-600 mt-4 space-y-1">
                        <li>• Intel LGA 1700 Socket: Supports 12th & 13th Gen Intel Core</li>
                        <li>• DDR5 Compatible • 4*DIMM DDR4 with XMP 3.0 Memory</li>
                        <li>• Commanding Power Design: Twin 16+1+2 Phases Digital VRM</li>
                    </ul>
                    <div className="flex gap-2 mt-4">
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">FREE SHIPPING</span>
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">FREE GIFT</span>
                    </div>

                    <div className="mt-6">
                        <div className="text-sm font-semibold">COLOR: Midnight Blue</div>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {["Midnight Blue", "Deep Purple", "Space Black"].map((color) => (
                                <button
                                    key={color}
                                    className="border px-3 py-1 rounded-full text-sm hover:bg-gray-100"
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="text-sm font-semibold">MEMORY SIZE:</div>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {["128GB", "256GB", "512GB"].map((size) => (
                                <button
                                    key={size}
                                    className="border px-3 py-1 rounded-full text-sm hover:bg-gray-100"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <div className="text-2xl font-bold text-gray-800">$609.00</div>
                        <div className="mt-4 flex flex-wrap gap-4">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2">
                                <FaShoppingCart /> Add to Cart
                            </button>
                            <button className="bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600">
                                Buy with PayPal
                            </button>
                        </div>
                        <div className="mt-4 text-sm text-gray-500">Ships from United States</div>
                    </div>
                </div>
            </section>

            {/* Description */}
            <section className="bg-gray-50 py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-xl font-bold mb-4">Description</h3>
                    <p className="text-gray-700 mb-6">
                        Built for ultra-fast performance, the thin and lightweight Samsung Galaxy Tab S2 goes anywhere you go.
                        Photos, movies and documents pop on a crisp, clear Super AMOLED display. Expandable memory lets you enjoy more
                        of your favorite content. And connecting and sharing between all your Samsung devices is easier than ever.
                        Welcome to life with the reimagined Samsung Galaxy Tab S2.
                    </p>
                    <img
                        src="/public/3 → prod1.jpg.svg"
                        alt="Tablet display"
                        className="w-full rounded-xl shadow"
                    />
                </div>
            </section>

            {/* Related Products */}
            <section className="py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-xl font-bold mb-6">Related Products</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[...Array(6)].map((_, idx) => (
                            <div key={idx} className="border rounded-lg p-4 shadow hover:shadow-lg">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Related product"
                                    className="w-full h-32 object-cover mb-2"
                                />
                                <div className="text-sm font-medium text-gray-800">Product Name</div>
                                <div className="text-green-600 text-sm font-semibold">$579.00</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recently Viewed */}
            <section className="bg-gray-100 py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-xl font-bold mb-6">Your Recently Viewed</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {[...Array(6)].map((_, idx) => (
                            <div key={idx} className="bg-white border rounded-lg p-4 shadow">
                                <img
                                    src="/public/3 → prod1.jpg.svg"
                                    alt="Viewed product"
                                    className="w-full h-24 object-cover mb-2"
                                />
                                <div className="text-xs text-gray-600">Product {idx + 1}</div>
                                <div className="text-sm font-medium text-gray-800">$579.00</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Product;