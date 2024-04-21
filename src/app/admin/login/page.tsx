import { getSession, login } from "@/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  const handleLogin = async (event: FormData) => {
    "use server";
    const key = event.get("key") as string;
    const success = await login(key);
    if (success) {
      redirect("/admin");
    } else {
      // TODO: Alert user that login failed
    }
  };

  return (
    <main className={"h-full flex items-center justify-center"}>
      <form
        className={"px-8 py-12 flex flex-col bg-base-200"}
        action={handleLogin}
      >
        <h1 className={"mb-4 font-bold text-3xl text-center"}>Admin Login</h1>
        <input
          className={"input input-bordered"}
          type="password"
          name="key"
          placeholder="Admin Key"
        />
        <button className={"mt-4 btn btn-primary"} type="submit">
          Login
        </button>
      </form>
    </main>
  );
}