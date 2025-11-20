"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddProductsPage(){

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const router = useRouter()
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: ""
  })

  // CLOUDINARY UPLOAD
  const handleImageUpload = async () => {
    if (!imageFile) return alert("Select an image first!");

    setUploading(true);

    const formData = new FormData();
    formData.append("file", imageFile);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setUploading(false);

    if (!res.ok) return alert("Upload failed!");

    setForm({ ...form, image: data.url });
    alert("Image uploaded successfully!");
  };

  // TEXT FORM CHANGE
  const handleChange = (e) =>{
    setForm({...form,[e.target.name]: e.target.value})
  }

  // SAVE PRODUCT
  const handleSubmit = async () => {
    try{
      const res =  await fetch("/api/products",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(form)
      })
      if(!res.ok) throw new Error("Faild To Create Product")

      alert("Product added successfully");
      router.push("/admin/products");

    }catch(err){
      console.log(err);
      alert("Add product failed!");
    }
  }

  return( 
    <div className="p-8 max-w-xl mx-auto text-black">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <div className="space-y-4">

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />

        {/* PRICE */}
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="w-full border p-2 rounded"
        />

        {/* CLOUDINARY UPLOAD INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleImageUpload}
          className="bg-purple-600 text-white px-4 py-2 rounded w-full"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        {/* PREVIEW */}
        {form.image && (
          <img 
            src={form.image} 
            className="w-32 h-32 object-cover rounded border" 
            alt="preview"
          />
        )}

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        ></textarea>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
  