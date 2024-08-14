import clsx from "clsx";
import { Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function NavigationBar(props: { className?: string }) {
  return (
    <nav className={clsx("navbar bg-base-300", props.className)}>
      <div className={"navbar-start"}>
        <Link className={"btn btn-ghost"} title={"Home"} href={"/"}>
          <Home />
        </Link>
      </div>
      <div className={"navbar-end"}>
        <Link
          className={"btn btn-ghost"}
          title={"Admin"}
          href={"http://nyptech-admin.vercel.app/microservices/go"}
        >
          <LayoutDashboard />
        </Link>
      </div>
    </nav>
  );
}