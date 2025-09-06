"use client";
import { useCart } from "../../../context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../../../lib/Firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold">Your Cart is Empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              1
            </div>
            <span className="font-semibold text-gray-700">Cart</span>
            <span className="mx-2">→</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              2
            </div>
            <span className="font-semibold text-gray-700">Checkout</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Cart Summary */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Product</th>
                  <th className="py-2">Qty</th>
                  <th className="py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2 flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      {item.name}
                    </td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT: Total & Checkout */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4">Total</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!user) {
                  router.push("/login");
                } else {
                  alert("Order placed successfully!");
                }
              }}
              className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
