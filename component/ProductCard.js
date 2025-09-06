"use client";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductCard({ product, onView }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(product);   // Add item
    router.push("/cart"); // Navigate to cart page
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h4 className="font-semibold text-lg">{product.name}</h4>
        <p className="text-blue-600 font-bold">{product.price}</p>
        <div className="mt-3 flex justify-between">
          <button
            onClick={onView}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
          >
            👁 View
          </button>
          <button
            onClick={handleAddToCart}
            className="px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
