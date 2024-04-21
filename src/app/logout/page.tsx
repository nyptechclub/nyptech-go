import SubmitButton from "@/components/submit-button";
import { deleteSession } from "@/session";
import { redirect } from "next/navigation";

export default function Page() {
  const handleLogout = async () => {
    "use server";
    await deleteSession();
    redirect("/");
  };

  return (
    <main className={"h-full grid place-items-center"}>
      <div className={"p-8 rounded-box bg-base-200"}>
        <form
          className={"flex flex-col items-center gap-4"}
          action={handleLogout}
        >
          <h1 className={"text-3xl font-bold"}>Admin Dashboard</h1>
          <p>Are you sure that you want to logout?</p>
          <SubmitButton className={"w-fit btn btn-primary"}>
            Yes, I&apos;m sure!
          </SubmitButton>
        </form>
      </div>
    </main>
  );
}