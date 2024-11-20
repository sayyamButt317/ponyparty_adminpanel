import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";  // Import Card components for displaying dashboard data
import db from "@/db/dbConnect";  // Import database connection
import { formatCurrency, formatNumber } from "@/lib/formatters";  // Import helper functions for formatting

// Fetch sales data by aggregating total price and sales count from the orders
async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: {
      PricePaidInCents: true,  // Sum of total price paid in cents
    },
    _count: true,  // Count of total sales
  });
  await wait(2000);  // Simulate a delay (2 seconds)
  return {
    amount: (data._sum.PricePaidInCents || 0) / 100,  // Convert cents to dollars
    numberofSales: data._count,  // Total number of sales
  };
}

// Fetch user data and calculate average value per user
async function getUserData() {
  const [userCount, totalSales] = await Promise.all([
    db.user.count(),  // Count of total users
    db.order.aggregate({
      _sum: {
        PricePaidInCents: true,  // Sum of total price paid by all users
      },
    }),
  ]);
  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (totalSales._sum.PricePaidInCents || 0) / userCount / 100,  // Calculate average value per user
  };
}

// Fetch product data, including counts of active and inactive products
async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),  // Count of active products
    db.product.count({ where: { isAvailableForPurchase: false } }),  // Count of inactive products
  ]);
  return {
    activeCount,
    inactiveCount,
  };
}

// Utility function to simulate a delay
function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// Main AdminDashboard component to display sales, user, and product data
export default async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Display sales data in a DashboardCard */}
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberofSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      {/* Display user data in a DashboardCard */}
      <DashboardCard
        title="Customer"
        subtitle={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        body={formatCurrency(userData.userCount)}
      />
      {/* Display product data in a DashboardCard */}
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatCurrency(productData.activeCount)}
      />
    </div>
  );
}

// Type definition for DashboardCard component props
type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

// Reusable DashboardCard component for displaying individual data cards
function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
