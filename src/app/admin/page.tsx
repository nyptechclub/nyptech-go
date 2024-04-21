import { getAllRedirects } from "@/database";
import { LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const redirects = await getAllRedirects();

  return (
    <main className={"h-full py-4"}>
      <div className={"mx-auto w-[90%] flex flex-col gap-4"}>
        <ul
          className={
            "menu menu-vertical sm:menu-horizontal bg-base-200 rounded-box"
          }
        >
          <li className={"flex-1 flex justify-center"}>
            <span className={"text-lg font-bold"}>
              Welcome back, Administrator!
            </span>
          </li>
          <li>
            <Link href={"/admin/add"}>
              <Plus />
              Add
            </Link>
          </li>
          <li>
            <Link href={"/logout"}>
              <LogOut />
              Logout
            </Link>
          </li>
        </ul>
        <ul className={"flex flex-col gap-2"}>
          {redirects.map((redirect) => (
            <li key={redirect.id} className={"p-4 flex rounded-lg bg-base-200"}>
              <div className={"flex-1"}>
                <div className={"font-bold"}>
                  <span>https://go.tes.club/</span>
                  <Link className={"underline"} href={redirect.url}>
                    {redirect.id}
                  </Link>
                </div>
                <div>{redirect.description}</div>
              </div>
              <div className={"flex-none flex items-center gap-4"}>
                <Link
                  className={"transition hover:opacity-80"}
                  title={"Edit"}
                  href={`/admin/edit/${redirect.id}`}
                >
                  <Pencil />
                </Link>
                <Link
                  className={"transition hover:opacity-80"}
                  title={"Edit"}
                  href={`/admin/delete/${redirect.id}`}
                >
                  <Trash2 />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}