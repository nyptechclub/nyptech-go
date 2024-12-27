import Link from "next/link";

export default function Page() {
  return (
    <main className={"grid size-full place-items-center"}>
      <div className={"card bg-base-300"}>
        <div className={"card-body items-center"}>
          <h1 className={"card-title text-center"}>NYP Technopreneurship Club</h1>
          <p>Welcome to the club&apos;s links and files service!</p>
          <div className={"card-actions mt-2 justify-center"}>
            <Link className={"btn btn-primary btn-sm"} href={"/auth"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}