"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function FetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        setloading(false);
      } catch (err) {
        console.log(err);
        setloading(false);
      }
    }
    FetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Product Not Found");

      alert("Product Deleted Successfully");
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading products...</p>;

  return (
    <div className="p-8 text-black">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>

        <Link
          href="/admin/products/new"
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition font-semibold shadow"
        >
          + Add Product
        </Link>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((item) => (
          <div
            key={item._id}
            className="
              bg-white
              rounded-xl 
              border border-gray-200 
              shadow-md 
              hover:shadow-xl 
              hover:-translate-y-1
              transition-all 
              duration-300
              overflow-hidden
            "
          >
            {/* IMAGE SECTION */}
            <div className="w-full h-52 bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* TEXT SECTION */}
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>

              <span className="inline-block bg-black text-white text-sm px-3 py-1 rounded-md shadow">
                ₹{item.price}
              </span>

              {/* BUTTONS */}
              <div className="flex justify-between items-center pt-4">
                <Link
                  href={`/admin/products/${item._id}`}
                  className="
                    bg-blue-600 
                    text-white 
                    px-4 py-2 
                    rounded-lg 
                    hover:bg-blue-700 
                    transition
                    font-medium
                  "
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="
                    bg-red-600 
                    text-white 
                    px-4 py-2 
                    rounded-lg 
                    hover:bg-red-700 
                    transition
                    font-medium
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
