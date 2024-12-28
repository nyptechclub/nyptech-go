"use client";

import LoadingPage from "@/app/(pages)/loading";
import { LinkInfo, linkSchema } from "@/lib/schema";
import { CopyIcon, PencilRulerIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<LinkInfo[]>([]);

  function copyLink(id: string) {
    navigator.clipboard.writeText(`https://go.nyptech.club/${id}`);
  }

  useEffect(() => {
    setLoading(true);
    fetch("/api/links")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        return linkSchema.array().parse(data);
      })
      .then((data) => {
        setLinks(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <main className={"flex flex-col gap-2 p-4"}>
      <Link className={"btn btn-info"} href={"/manage/new"}>
        New Link
      </Link>
      {links.map((link) => (
        <div key={link.id} className={"flex rounded-box bg-base-300 p-4"}>
          <div className={"flex-1"}>
            <h2 className={"text-lg font-bold"}>{link.id}</h2>
            <p className={"line-clamp-1 text-sm"}>{link.url}</p>
          </div>
          <div className={"flex items-center gap-2"}>
            <div className={"tooltip"} data-tip={"Copy"}>
              <button className={"btn btn-square btn-outline"} onClick={() => copyLink(link.id)}>
                <CopyIcon />
              </button>
            </div>
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