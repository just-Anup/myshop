"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { auth } from "../lib/Firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckoutClick = () => {
    if (user) {
      router.push("/checkout");
    } else {
      router.push("/login");
    }
  };

  const handleAuthClick = async () => {
    if (user) {
      await signOut(auth);
      alert("Logged out successfully!");
    } else {
      router.push("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
     
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MyShop
        </Link>

 
        <div className="flex space-x-6 items-center">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/shop" className="hover:text-blue-600">
            Shop
          </Link>

          <button
            onClick={handleAuthClick}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {user ? `Hello, ${user.email.split("@")[0]} | Logout` : "Login"}
          </button>

          
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center text-blue-600"
          >
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

 
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto">
     
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

     
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty 🛒</p>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-blue-600 font-bold">${item.price}</p>
                    </div>
                  </div>

               
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>

         
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}


          {cart.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-bold">
                Total: <span className="text-blue-600">${getTotal()}</span>
              </h3>
              <button
                onClick={handleCheckoutClick}
                className="mt-4 w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {user ? "✅ Checkout" : "Login to Checkout"}
              </button>
            </div>
          )}
        </div>
      </Dialog>
    </nav>
  );
}
