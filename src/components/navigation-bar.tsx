import Link from "next/link";

export default function NavigationBar(params: { className?: string }) {
  return (
    <nav className={`navbar bg-base-300 ${params.className}`}>
      <div className={"navbar-start"}>
        <Link className={"btn btn-ghost text-xl"} href={"/"}>
          NYP Technopreneurship Club
        </Link>
      </div>
      <div className={"navbar-end"}>
        <Link className={"btn btn-ghost"} href={"/admin"}>
          Admin
        </Link>
      </div>
    </nav>
  );
}