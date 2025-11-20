"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [loading, setloading] = useState(true);
  const [product, setproduct] = useState(null);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    async function FetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error("Failed");
        setproduct(data);

        setForm({
          title: data.title,
          price: data.price,
          description: data.description,
          image: data.image,
        });

        setloading(false);
      } catch (err) {
        console.log(err);
        setloading(false);
      }
    }
    FetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Update Failed");
      alert("Product Updated Successfully");
      router.push("/admin/products");
    } catch (err) {
      console.log(err);
      alert("Update failed!");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure about deleting this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Product Not Found");
      alert("Product Deleted");
      router.push("/admin/products");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading...</p>;

  if (!product)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        Product not found.
      </p>
    );

  return (
    <div className="p-8 max-w-2xl mx-auto text-black">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">
        Edit Product
      </h2>

      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-5">

        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Product title"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input
            name="price"
            value={form.price}
            type="number"
            onChange={handleChange}
            placeholder="₹ Price"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Product image URL"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write short product description..."
            className="w-full border p-3 h-32 rounded-lg focus:ring-2 focus:ring-black outline-none"
          ></textarea>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3 pt-4">
          <button
            onClick={handleUpdate}
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
          >
            Update Product
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}
