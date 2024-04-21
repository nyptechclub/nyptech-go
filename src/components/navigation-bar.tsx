import Link from "next/link";

export default function NavigationBar(params: { className?: string }) {
  return (
    <nav className={`navbar bg-base-300 ${params.className}`}>
      <div className={"navbar-start"}>
        <Link className={"btn btn-ghost"} title={"Home"} href={"/"}>
          <i className={"fa-solid fa-house text-xl"}/>
        </Link>
      </div>
      <div className={"navbar-end"}>
        <Link className={"btn btn-ghost"} title={"Admin"} href={"/admin"}>
          <i className={"fa-brands fa-black-tie text-xl"} />
        </Link>
      </div>
    </nav>
  );
}