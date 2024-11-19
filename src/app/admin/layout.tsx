import { Nav, NavLink } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";

export const dynamic = "force-dynamic"
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
         {/* <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customer</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Nav> */}
      <Sidebar /> 
 
      {/* <div className="container my-6">{children}</div> */}
    </>
  );
}
