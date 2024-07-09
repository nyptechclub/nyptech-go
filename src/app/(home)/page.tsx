import Link from "next/link";

export default function Page() {
  return (
    <main className={"h-full flex items-center justify-center"}>
      <div
        className={
          "text-center flex flex-col container break-words w-96 m-5 md:w-full"
        }
      >
        <img
          className={"mb-4 size-[200px] mx-auto"}
          src={"/assets/logo.png"}
          alt={"Icon"}
        />
        <h1 className={"text-2xl font-bold break-words m-5"}>
          NYP Technopreneurship Club
        </h1>
        <p className={"text-base"}>
          Develop an entrepreneurial mindset across the SIT student body through
          engagements and real-world problem solving with the application of
          technology.
        </p>

        <div className={"mt-6"}>
          <Link
            className={"btn btn-accent"}
            href={"https://nyptech.vercel.app"}
          >
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}