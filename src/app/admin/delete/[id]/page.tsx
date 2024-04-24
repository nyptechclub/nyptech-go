import SubmitButton from "@/components/submit-button";
import { deleteRedirect } from "@/database";
import { redirect } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const handleDelete = async () => {
    "use server";
    if (await deleteRedirect(params.id)) {
      redirect("/admin");
    } else {
      redirect("/admin/error");
    }
  };

  return (
    <main className={"h-full grid place-items-center"}>
      <div className={"p-8 rounded-box bg-base-200"}>
        <form
          className={"flex flex-col items-center gap-4"}
          action={handleDelete}
        >
          <h1 className={"text-3xl font-bold"}>Delete Link</h1>
          <p>Are you sure that you want to delete this link?</p>
          <p>
            <span className={"badge badge-warning badge-lg"}>{params.id}</span>
          </p>
          <SubmitButton className={"w-fit btn btn-primary"}>
            Yes, I&apos;m sure!
          </SubmitButton>
        </form>
      </div>
    </main>
  );
}