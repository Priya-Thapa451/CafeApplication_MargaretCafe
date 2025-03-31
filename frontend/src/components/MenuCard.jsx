import React from "react";

export default function MenuCard({
  name,
  description,
  price,
  image,
  onAddToCart,
}) {
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      {/* Image Section */}
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#B47137] mb-2">{name}</h3>
        <p className="text-gray-700 text-sm mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-[#B47137]">${price}</p>
          <button
            onClick={onAddToCart} // Trigger the onAddToCart function passed from the parent
            className="px-4 py-2 bg-[#B47137] text-white rounded-lg shadow-md hover:bg-[#A5612F] transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
