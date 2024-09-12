import { Nav, NavLink } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";

export const dynamic = "force-dynamic"
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
         <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">Sales</NavLink>
      </Nav>
      {/* <Sidebar />  */}
 
      <div className="container my-6">{children}</div>
    </>
  );
}
