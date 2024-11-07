import { Button } from "@/components/ui/button";  // Importing button component for UI
import { PageHeader } from "../_component/PageHeader";  // Importing page header component
import Link from "next/link";  // Importing Next.js link component for client-side navigation
import db from "@/db/db";  // Importing database instance to interact with the database

// Importing table and related components for displaying product data in a table format
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";  // Importing icons for status and actions
import { formatCurrency, formatNumber } from "@/lib/formatters";  // Importing formatting functions for currency and numbers

// Importing dropdown menu and related components for product actions
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/ProductActions";  // Importing custom dropdown items for toggling availability and deleting products

// AdminProductsPage component: displays the product header and an "Add Product" button
export default function AdminProductsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>  {/* Page header for "Products" */}
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>  {/* Button linking to new product form */}
        </Button>
      </div>
      <ProductTable />  {/* Renders the product table */}
    </>
  );
}

// ProductTable component: retrieves and displays a list of products in a table
async function ProductTable() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: { select: { Order: true } },  // Counting the number of orders for each product
    },
    orderBy: { name: "asc" },  // Sorting products alphabetically by name
  });

  if (products.length === 0) return <p>No Products Found</p>;  // Display message if no products are available

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>  {/* Hidden header for accessibility */}
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>  {/* Hidden header for accessibility */}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            {/* Availability icon with screen-reader text */}
            <TableCell>
              {product.isAvailableForPurchase ? (
                <>
                  <span className="sr-only">Available</span>
                  <CheckCircle2 />  {/* Available icon */}
                </>
              ) : (
                <>
                  <span className="sr-only">Unavailable</span>
                  <XCircle className="stroke-destructive" />  {/* Unavailable icon */}
                </>
              )}
            </TableCell>
            {/* Displaying product name */}
            <TableCell>{product.name}</TableCell>
            {/* Displaying product price formatted as currency */}
            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
            {/* Displaying the number of orders */}
            <TableCell>{formatNumber(product._count.Order)}</TableCell>
            {/* Action menu for editing, toggling, or deleting product */}
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* Edit product link */}
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/products/${product.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  {/* Toggle product availability */}
                  <ActiveToggleDropdownItem
                    id={product.id}
                    isAvailableForPurchase={product.isAvailableForPurchase}
                  />
                  <DropdownMenuSeparator />  {/* Separator line */}
                  {/* Delete product item, disabled if product has orders */}
                  <DeleteDropdownItem
                    id={product.id}
                    disabled={product._count.Order > 0}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
