import React from "react";
import Link from "next/link";  // Import Link component for internal navigation
import Image from "next/image";  // Import Image component for optimized image loading
import { ProductCard } from "@/components/ProductCard";  // Import custom ProductCard component
import db from "@/db/db";  // Import database connection or instance
import { Product } from "@prisma/client";  // Import Product type from Prisma schema
import "./globals.css";  

// Function to fetch the newest available products from the database
async function getNewestProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },  // Filter products available for purchase
    orderBy: { Order: { _count: "asc" } },  // Sort products by 'Order' count in ascending order
    take: 12,  // Limit the result to 12 products
  });
}

// Main Home component
export default async function Home() {
  // Fetch newest products to display on the homepage
  const products = await getNewestProducts();

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {/* Grid layout for displaying products, responsive for different screen sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Map through products and render a ProductCard for each */}
          {products.map((product: Product) => (
            <ProductCard key={product.id} {...product} />  // Pass product data as props
          ))}
        </div>
      </div>
    </div>
  );
}
