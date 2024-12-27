import { getLinks } from "@/lib/utils";
import { PencilRulerIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const links = await getLinks();
  return (
    <main className={"flex flex-col gap-2 p-4"}>
      <Link className={"btn btn-info"} href={"/manage/new"}>
        New Link
      </Link>
      {links.map((link) => (
        <div key={link.id} className={"flex rounded-box bg-base-300 p-4"}>
          <div className={"flex-1"}>
            <h2 className={"text-lg font-bold"}>{link.id}</h2>
            <p className={"text-sm"}>{link.url}</p>
          </div>
          <div className={"flex items-center gap-2"}>
            <div className={"tooltip"} data-tip={"Manage"}>
              <Link className={"btn btn-square btn-info"} href={`/manage/${link.id}`}>
                <PencilRulerIcon />
              </Link>
            </div>
            <div className={"tooltip"} data-tip={"Delete"}>
              <Link className={"btn btn-square btn-error"} href={`/manage/${link.id}/delete`}>
                <TrashIcon />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}