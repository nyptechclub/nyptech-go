export default function Page() {
  return (
    <main className={"h-full flex items-center justify-center"}>
      <form className={"px-12 py-16 flex flex-col gap-4 rounded-lg bg-base-200"}>
        <h1 className={"text-3xl font-bold text-center"}>Login</h1>
        <input className={"input input-bordered"} type="text" placeholder="Key" />
        <button className={"btn btn-primary"} type={"submit"}>
          Login
        </button>
      </form>
    </main>
  );
}