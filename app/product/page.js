"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    alert("🛒 Added to cart: " + product.title);
  };

  const handleBuyNow = (product) => {
    alert("⚡ Buy Now clicked for: " + product.title);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">

      {/* 🔥 HERO SECTION */}
      <div className="w-full h-56 bg-gradient-to-r from-black to-gray-800 text-white flex flex-col items-center justify-center text-center rounded-b-3xl shadow-lg mb-12">
        
        <h1 className="text-4xl font-bold">Explore All Products</h1>
        <p className="mt-2 text-gray-300">Premium quality items curated for you.</p>

        {/* 🔥 HOME BUTTON */}
        <Link
          href="/"
          className="mt-5 bg-white text-black px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
        >
          ⬅ Back to Home
        </Link>
      </div>

      {/* PRODUCT GRID */}
      <div className="px-8">
        <h2 className="text-3xl font-bold mb-8">Available Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* IMAGE */}
              <div className="w-full h-52 bg-gray-100">
                <img
                  src={p.image}
                  className="w-full h-full object-cover"
                  alt={p.title}
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-gray-600 mt-2 font-semibold">₹{p.price}</p>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleAddToCart(p)}
                    className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => handleBuyNow(p)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
