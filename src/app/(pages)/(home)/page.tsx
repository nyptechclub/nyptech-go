import Image from "next/image";

export default function Page() {
  return (
    <main className={"grid size-full place-items-center"}>
      <div className={"card relative bg-base-300"}>
        <div className={"h-4"}>
          <Image
            className={"absolute -top-16 left-1/2 -translate-x-1/2 transform"}
            src={"/logo.png"}
            alt={"Logo"}
            width={100}
            height={100}
          />
        </div>
        <div className={"card-body items-center"}>
          <h2 className={"card-title text-center"}>NYP Technopreneurship Club</h2>
          <p>Welcome to the club&apos;s links and files service!</p>
        </div>
      </div>
    </main>
  );
}