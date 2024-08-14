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
          src={"https://nyptech.vercel.app/assets?id=logo"}
          alt={"Icon"}
        />
        <h1 className={"text-2xl font-bold break-words m-5"}>
          NYP Technopreneurship Club
        </h1>
        <p className={"mx-auto max-w-[50%] max-lg:max-w-[90%] text-base"}>
          Develop an entrepreneurial mindset across the SIT student body through
          engagements and real-world problem solving with the application of
          technology.
        </p>

        <div className={"mt-6"}>
          <Link
            className={"btn btn-primary"}
            href={"https://nyptech.vercel.app"}
          >
            Learn more!
          </Link>
        </div>
      </div>
    </main>
  );
}