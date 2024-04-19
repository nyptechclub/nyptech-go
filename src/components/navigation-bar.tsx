import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className={"navbar bg-base-300"}>
      <Link className={"btn btn-ghost"} href={"/"}>TES Club</Link>
    </nav>
  )
}