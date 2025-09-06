"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const products = [
  {
    id: 1,
    name: "Premium T-Shirt",
    price: "$29.99",
    image: "/images/shirt.jpg",
    description:
      "Comfortable cotton t-shirt perfect for everyday wear. Made with high-quality materials.",
    category: "t-shirt",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: "$89.99",
    image: "/images/shoe.jpg",
    description:
      "Lightweight and durable running shoes designed for maximum performance and comfort.",
    category: "shoes",
  },
  {
    id: 3,
    name: "Casual Lowers",
    price: "$39.99",
    image: "/images/lower.jpeg",
    description:
      "Stylish and comfortable lowers for casual outings and daily wear.",
    category: "pants",
  },
  {
    id: 4,
    name: "Classic shoe",
    price: "$59.99",
    image: "/images/shoe.jpg",
    description: "Classic denim jeans that never go out of style.",
    category: "jeans",
  },
];

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-bold text-center mb-12">
          Featured Products
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onView={() => setSelectedProduct(p)}
            />
          ))}
        </div>

        {/* ✅ Show Modal when product is selected */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </section>
  );
}
