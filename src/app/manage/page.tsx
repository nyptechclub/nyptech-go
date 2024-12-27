import { getLinks } from "@/lib/utils";
import Link from "next/link";

export default async function Page() {
  const links = await getLinks();
  return (
    <main className={"flex flex-col gap-2 p-4"}>
      <Link className={"btn btn-success"} href={"/manage/new"}>
        New Link
      </Link>
      {links.map((link) => (
        <div key={link.id} className={"flex rounded-box bg-base-300 p-4"}>
          <div className={"flex-1"}>
            <h2 className={"text-lg font-bold"}>{link.id}</h2>
            <p className={"text-sm"}>{link.url}</p>
          </div>
          <div className={"flex items-center gap-2"}>
            <Link className={"btn btn-info btn-sm"} href={`/manage/${link.id}`}>
              Manage
            </Link>
            <Link className={"btn btn-error btn-sm"} href={`/manage/${link.id}/delete`}>
              Delete
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}