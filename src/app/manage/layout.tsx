import { LayoutProps } from "@/types";
import { Protect, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function ProtectedPage() {
  return (
    <main className={"grid size-full place-items-center"}>
      <div className={"card bg-base-300"}>
        <div className={"card-body items-center"}>
          <h1 className={"card-title"}>Oops!</h1>
          <p>You cannot access this page.</p>
        </div>
      </div>
    </main>
  );
}

export default function Layout(props: LayoutProps) {
  return (
    <Protect fallback={ProtectedPage()}>
      <div className={"grid grid-rows-[auto,1fr]"}>
        <nav className={"navbar bg-base-300"}>
          <div className={"flex-1"}>
            <Link className={"btn btn-ghost"} href={"/"}>
              <h1 className={"text-xl font-bold"}>Logo</h1>
            </Link>
          </div>
          <div>
            <div className={"mr-2 grid aspect-square place-items-center"}>
              <UserButton />
            </div>
          </div>
        </nav>
      </div>
      {props.children}
    </Protect>
  );
}