import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className={"grid place-items-center"}>
      <SignIn routing={"hash"} />
    </main>
  );
}