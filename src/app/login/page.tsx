import SubmitButton from "@/components/submit-button";
import { createSession } from "@/session";
import { redirect } from "next/navigation";

export default function Page() {
  const handleLogin = async (event: FormData) => {
    "use server";
    const key = event.get("key") as string;
    if (await createSession(key)) {
      redirect("/admin");
    } else {
      // TODO: Alert user that login failed
    }
  };

  return (
    <main className={"h-full grid place-items-center"}>
      <div className={"p-8 rounded-box bg-base-200"}>
        <form className={"flex flex-col gap-4"} action={handleLogin}>
          <h1 className={"text-3xl font-bold"}>Admin Dashboard</h1>
          <input
            className={"input input-bordered"}
            type={"password"}
            name={"key"}
            placeholder={"Key"}
          />
          <SubmitButton className={"btn btn-primary"}>Login</SubmitButton>
        </form>
      </div>
    </main>
  );
}