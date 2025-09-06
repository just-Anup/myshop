"use client";
import "./globals.css";
import { CartProvider } from "../../context/CartContext"; 
import Navbar from "../../component/Navbar"; // adjust path if needed

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {/* Navbar will appear on every page */}
          <Navbar />

          {/* Page content */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
