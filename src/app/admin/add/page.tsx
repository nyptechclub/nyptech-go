import SubmitButton from "@/components/submit-button";
import { setRedirect } from "@/database";
import { redirect } from "next/navigation";

export default function Page() {
  const handleAdd = async (data: FormData) => {
    "use server";

    const id = data.get("id") as string;
    const url = data.get("url") as string;
    const description = data.get("description") as string;
    const success = await setRedirect({ id, url, description });

    if (success) {
      redirect("/admin");
    } else {
      redirect("/admin/error");
    }
  };

  return (
    <main className={"h-full grid place-items-center"}>
      <div className={"p-8 rounded-box bg-base-200"}>
        <form className={"flex flex-col gap-4"} action={handleAdd}>
          <h1 className={"text-3xl text-center font-bold"}>Add Link</h1>
          <input
            className={"input input-bordered"}
            placeholder={"ID"}
            type={"text"}
            name={"id"}
            required={true}
          />
          <input
            className={"input input-bordered"}
            placeholder={"URL"}
            type={"url"}
            name={"url"}
            required={true}
          />
          <textarea
            className={"textarea textarea-bordered"}
            placeholder={"Description"}
            name={"description"}
          />
          <SubmitButton className={"btn btn-outline"}>Add</SubmitButton>
        </form>
      </div>
    </main>
  );
}