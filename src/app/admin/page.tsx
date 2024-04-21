import { getAllRedirects } from "@/database";
import Link from "next/link";

export default async function Page() {
  const redirects = await getAllRedirects();

  return (
    <main className={"h-full py-4"}>
      <div className={"mx-auto w-fit flex flex-col gap-2"}>
        {redirects.map((redirect) => (
          <div key={redirect.id} className={"p-4 bg-base-200"}>
            <div className={"font-bold"}>
              <span>https://go.tes.club/</span>
              <Link className={"underline"} href={redirect.url}>
                {redirect.id}
              </Link>
            </div>
            <div>{redirect.description}</div>
          </div>
        ))}
      </div>
    </main>
  );
}