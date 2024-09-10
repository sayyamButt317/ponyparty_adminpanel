import { Button } from "@/components/ui/button";
import { PageHeader } from "../_component/PageHeader";
import Link from "next/link";
import db from "@/db/db";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";

export default function AdminProductsPage() {

  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductTable />
    </>
  );

    return (
        <>
            <div className="flex justify-between items-center gap-4">
                <PageHeader>Products</PageHeader>
                <Button asChild>
                    <Link href="/admin/products/new">Add Product</Link>
                </Button>
            </div>
            <div className="px-6"> <ProductTable /></div>
           
        </>
    )

}

async function ProductTable() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: { select: { Order: true } },
    },
    orderBy: { name: "asc" },
  });
  if (products.length === 0) return <p>No Products Found</p>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actons</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((products) => (
          <TableRow key={products.id}>
            <TableCell>
              {products.isAvailableForPurchase ? (
                <>
                  <span className="sr-only">Available</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                 <span className="sr-only">UnAvailable</span>
                <XCircle /></>
                
              )}
            </TableCell>
            <TableCell>{products.name}</TableCell>
            <TableCell>{formatCurrency(products.priceInCents /100)}</TableCell>
            <TableCell>{formatNumber(products._count.Order)}</TableCell>
            <TableCell><MoreVertical/>
            <span className="sr-only">Actions</span></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
