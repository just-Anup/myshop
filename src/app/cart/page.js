"use client";
import { useCart } from "../../../context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../../../lib/Firebase"; 
import { onAuthStateChanged } from "firebase/auth";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();
  const [user, setUser] = useState(null);

  // ✅ Track Firebase login status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Fix: Ensure price is a number
  const getTotal = () => {
    return cart.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold">Your Cart is Empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow rounded-lg p-4"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-blue-600 font-bold">
                    ${Number(item.price).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Item Price & Remove */}
              <div className="flex items-center gap-4">
                <p className="font-bold">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-white shadow rounded-lg p-6 h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span className="text-green-600">Free</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>

          {/* ✅ Redirect based on login status */}
          <button
            onClick={() => {
              if (user) {
                router.push("/checkout"); // Logged in → checkout page
              } else {
                router.push("/login"); // Not logged in → login page
              }
            }}
            className="mt-6 w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            {user ? "Proceed to Checkout" : "Login to Buy"}
          </button>
        </div>
      </div>
    </div>
  );
}
