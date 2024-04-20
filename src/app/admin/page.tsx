import { getAllRedirects } from "@/database";
import Link from "next/link";

export default async function Page() {
  const redirects = await getAllRedirects();
  return (
    <main className={"mx-auto my-4 w-[50%]"}>
      <form className={"mb-4 flex gap-2"}>
        <input
          className={"flex-1 input input-bordered"}
          type="text"
          placeholder="Search"
        />
        <button className={"flex-none btn btn-primary"} type={"submit"}>
          Add
        </button>
      </form>
      <div className={"flex flex-col gap-2"}>
        {redirects.map((redirect) => (
          <div
            key={redirect.url}
            className={"px-4 py-2 flex rounded-lg bg-base-200"}
          >
            <div className={"flex-1"}>
              <Link className={"underline"} href={redirect.url}>
                {redirect.url}
              </Link>
              <div>{redirect.description}</div>
            </div>
            <div className={"flex-none flex items-center gap-4"}>
              <span
                className={"cursor-pointer transition hover:opacity-90"}
                title={"Edit"}
              >
                <i className="fa-solid fa-pen" />
              </span>
              <span
                className={"cursor-pointer transition hover:opacity-90"}
                title={"Delete"}
              >
                <i className="fa-solid fa-trash" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}