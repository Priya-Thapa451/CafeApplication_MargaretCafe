import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  // Fetch Profile Data
  const fetchProfile = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");

      const response = await axios.get(
        "http://localhost:5000/api/customer/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setProfile(response.data);
      setLoading(false);
      setEditing(false); // Exit edit mode after fetching data

      // Set default values in form
      setValue("name", response.data.name);
      setValue("address", response.data.address);
      setValue("phone", response.data.phone);
      setValue("dob", response.data.dob);
      setValue("gender", response.data.gender);
    } catch (err) {
      setProfile(null);
      setLoading(false);
    }
  };

  // Create or Update Profile
  const onSubmit = async (data) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");

      if (profile) {
        await axios.put("http://localhost:5000/api/customer/profile", data, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        toast.success("Profile updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/customer/profile", data, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        toast.success("Profile created successfully!");
      }

      fetchProfile();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save profile");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : profile && !editing ? (
        // Show Profile Details
        <div>
          <div className="space-y-2 mb-4">
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Address:</strong> {profile.address}
            </p>
            <p>
              <strong>Phone:</strong> {profile.phone}
            </p>
            <p>
              <strong>Date of Birth:</strong> {profile.dob}
            </p>
            <p>
              <strong>Gender:</strong> {profile.gender}
            </p>
          </div>

          <button
            onClick={() => setEditing(true)}
            className="w-full bg-yellow-800 text-white py-2 rounded hover:bg-orange-800transition duration-300"
          >
            Edit Profile
          </button>
        </div>
      ) : profile === null && !editing ? (
        // No Profile Found - Show Create Button
        <div className="text-center">
          <p>No profile found.</p>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Create Profile
          </button>
        </div>
      ) : (
        // Show Create/Edit Form
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-xl font-bold text-center">
            {profile ? "Edit Profile" : "Create Profile"}
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              {...register("address")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              {...register("phone")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              {...register("dob")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              {...register("gender")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-900 text-white rounded-lg hover: bg-amber-800transition duration-300"
          >
            {profile ? "Update Profile" : "Create Profile"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
