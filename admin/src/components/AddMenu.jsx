import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMenu = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreateMenuItem = async (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (!name || !description || !category) {
      setError("Please fill out all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", parsedPrice);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:5000/api/admin/menu", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Menu item created successfully!");
      setError("");

      setTimeout(() => navigate("/menu"), 1500);
    } catch (err) {
      console.error("Error creating menu item:", err);
      setError(err.response?.data?.message || "Failed to create menu item.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fef9f5] to-[#f7f1eb]">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-[#e8ddd3] w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-[#4b372e] mb-6 tracking-wide">
          Add New Menu Item
        </h1>

        {error && <p className="text-red-600 text-sm text-center mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center mb-3">{success}</p>}

        <form onSubmit={handleCreateMenuItem} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#6b4c3b] mb-1">
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g., Vanilla Latte"
              required
              className="w-full px-4 py-2 border border-[#d6c3b5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c6a78e]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#6b4c3b] mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., Creamy espresso with vanilla"
              required
              className="w-full px-4 py-2 border border-[#d6c3b5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c6a78e]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#6b4c3b] mb-1">
              Price ($)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="4.50"
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-[#d6c3b5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c6a78e]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#6b4c3b] mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-2 border border-[#d6c3b5] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#c6a78e]"
            >
              <option value="">Choose a category</option>
              <option value="BEVERAGES">Beverages</option>
              <option value="PASTRIES_BAKED_GOODS">Pastries & Baked Goods</option>
              <option value="SANDWICHES_WRAP">Sandwiches & Wraps</option>
              <option value="BREAKFAST_ITEMS">Breakfast Items</option>
              <option value="SALADS">Salads</option>
              <option value="DESSERTS">Desserts</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#6b4c3b] mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-[#d6c3b5] rounded-lg bg-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8d5c42] text-white py-2 rounded-lg hover:bg-[#7a4f39] transition duration-300"
          >
            Add Menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
