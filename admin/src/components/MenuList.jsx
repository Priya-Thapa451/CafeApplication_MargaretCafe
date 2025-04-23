import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in again.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/admin/menu", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenuItems(response.data);
    } catch (err) {
      setError("Error fetching menu items");
      console.error("Error:", err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in again.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/admin/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMenuItems();
    } catch (err) {
      console.error("Error deleting menu item:", err);
      setError("Failed to delete menu item.");
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setImageFile(null);
    setEditModalOpen(true);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("name", editItem.name);
    formData.append("description", editItem.description);
    formData.append("price", parseFloat(editItem.price));
    formData.append("category", editItem.category);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/admin/menu/${editItem.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEditModalOpen(false);
      fetchMenuItems();
    } catch (err) {
      console.error("Error updating menu item:", err);
      setError("Failed to update menu item.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f4f0] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-lg border border-[#e4dfd9]">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#3b2f2f]">
          Cafe Menu
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-[#ece6dd] text-[#3b2f2f]">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id} className="border-t border-gray-200 text-gray-700">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">
                  {item.imageUrl ? (
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">Rs.{item.price}</td>
                <td className="px-4 py-2 capitalize">{item.category}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-[#6b4f4f] hover:text-[#4f3838]"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 border border-[#e4dfd9]">
            <h2 className="text-xl font-semibold text-[#3b2f2f] mb-4">Edit Menu Item</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="block text-sm text-[#3b2f2f]">Name</label>
                <input
                  type="text"
                  value={editItem.name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm text-[#3b2f2f]">Description</label>
                <input
                  type="text"
                  value={editItem.description}
                  onChange={(e) =>
                    setEditItem({ ...editItem, description: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm text-[#3b2f2f]">Price</label>
                <input
                  type="number"
                  value={editItem.price}
                  onChange={(e) =>
                    setEditItem({ ...editItem, price: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm text-[#3b2f2f]">Category</label>
                <select
                  value={editItem.category}
                  onChange={(e) =>
                    setEditItem({ ...editItem, category: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="APPETIZER">Appetizer</option>
                  <option value="MAIN_COURSE">Main Course</option>
                  <option value="DESSERT">Dessert</option>
                  <option value="BEVERAGE">Beverage</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-sm text-[#3b2f2f]">Current Image</label>
                {editItem.imageUrl && !imageFile && (
                  <img
                    src={`http://localhost:5000${editItem.imageUrl}`}
                    alt="Current"
                    className="w-20 h-20 object-cover mt-2 rounded"
                  />
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm text-[#3b2f2f]">Upload New Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#6b4f4f] text-white py-2 px-4 rounded-md hover:bg-[#4f3838]"
              >
                Update Item
              </button>
            </form>
            <button
              onClick={() => setEditModalOpen(false)}
              className="mt-3 w-full text-red-600 hover:text-red-800 border border-red-200 py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuList;
