import { getLinks } from "@/lib/utils";

export default async function Page() {
  const links = await getLinks();
  return (
    <main className={"flex flex-col gap-2 p-4"}>
      {links.map((link) => (
        <div key={link.id} className={"rounded-box bg-base-300 p-4"}>
          <h2 className={"text-lg font-bold"}>{link.id}</h2>
          <p className={"text-sm"}>{link.url}</p>
        </div>
      ))}
    </main>
  );
}