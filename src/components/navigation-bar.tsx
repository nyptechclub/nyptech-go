import { Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function NavigationBar(params: { className?: string }) {
  return (
    <nav className={`navbar bg-base-300 ${params.className}`}>
      <div className={"navbar-start"}>
        <Link className={"btn btn-ghost"} title={"Home"} href={"/"}>
          <Home />
        </Link>
      </div>
      <div className={"navbar-end"}>
        <Link className={"btn btn-ghost"} title={"Admin"} href={"/admin"}>
          <LayoutDashboard />
        </Link>
      </div>
    </nav>
  );
}