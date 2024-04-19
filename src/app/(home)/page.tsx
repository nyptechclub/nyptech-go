import Image from "next/image";
import Link from "next/link";

// TODO: Optimize page for mobile layout

export default function Page() {
  return (
    <main className={"h-full flex items-center justify-center"}>
      <div className={"text-center"}>
        <Image
          className={"mb-4 mx-auto"}
          src={"/assets/icon.png"}
          alt={"Icon"}
          width={200}
          height={200}
        />
        <h1 className={"text-3xl font-bold"}>NYP Technopreneurship Club</h1>
        <p className={"mt-4 w-[80%] lg:w-[50%] mx-auto "}>
          Our mission is to develop an entrepreneurial mindset across the SIT
          student body through engagements and real-world problem solving with
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