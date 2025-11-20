"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {  signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);

  // Fetch latest products for homepage
  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.slice(0, 6)); // show latest 6
    }
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black">

      {/* NAVBAR */}
      <nav className="w-full bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">MyStore 🛒</Link>

        <div className="flex items-center gap-4">
          {!session ? (
            <button
              onClick={() => signIn()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          ) : (
            <>
             <>
  <span className="font-bold">
    Hi, {session.user.name}
  </span>

  <Link
    href="/dashboard"
    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
  >
    Dashboard
  </Link>

  <button
    onClick={() => signOut()}
    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
  >
    Logout
  </button>
</>

            </>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="px-8 py-16 bg-gradient-to-r from-black to-gray-800 text-white text-center rounded-b-3xl">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to MyStore
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Shop the latest premium products right here.
        </p>

        <Link
          href="/product"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Browse Products
        </Link>
      </section>

      {/* PRODUCT SECTION */}
      <section id="products" className="px-8 py-14">
        <h2 className="text-3xl font-bold mb-8">Latest Products</h2>

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition p-4"
              >
                <img
                  src={p.image}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <div className="mt-3">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="text-gray-600 mt-1">₹{p.price}</p>

                  <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
