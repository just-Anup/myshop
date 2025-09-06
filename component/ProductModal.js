"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 relative"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>

          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Product Info */}
          <h2 className="text-2xl font-bold mt-4 text-gray-800">{product.name}</h2>
          <p className="text-blue-600 text-xl font-semibold mt-2">${product.price}</p>
          <p className="text-gray-600 mt-3">{product.description}</p>

          {/* Extra Details */}
          <p className="text-sm text-gray-400 mt-2">
            <span className="font-medium">Category:</span> {product.category}
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-medium">Product ID:</span> #{product.id}
          </p>

          {/* Actions */}
          <div className="flex justify-between mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Close
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md transition"
            >
              🛒 Add to Cart
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
