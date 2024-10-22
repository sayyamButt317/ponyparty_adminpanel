
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import db from "@/db/db";
import { Product } from "@prisma/client";
import "./globals.css";
type ProductGridSectionProps = {
    productsFetcher: () => Promise<Product[]>;
  };
  
  export async function ProductGridSection({ productsFetcher }:{productsFetcher:any}) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(await productsFetcher()).map((product: React.JSX.IntrinsicAttributes & { id: string; name: string; priceInCents: number; description: string; imagePath: string; }) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  export function getNewestProducts() {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { Order: { _count: "asc" } },
      take: 12,
    });
  }
  export default function Home() {
    return (
  <ProductGridSection productsFetcher={getNewestProducts} />
    )
}