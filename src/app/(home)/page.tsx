/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function Page() {
  return (
    <main className={"h-full flex items-center justify-center"}>
      <div className={"w-[90%] text-center"}>
        <img
          className={"mb-4 size-[200px] mx-auto"}
          src={"https://nyptech.vercel.app/favicon.ico"}
          alt={"Icon"}
        />
        <h1 className={"text-3xl font-bold truncate"}>NYP Technopreneurship Club</h1>
        <p className={"mt-4 mx-auto"}>
          Developing an entrepreneurial mindset across the SIT student body with
          the application of technology.
        </p>
        <div className={"mt-6"}>
          <Link
            className={"btn btn-primary"}
            href={"https://nyptech.vercel.app"}
          >
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}