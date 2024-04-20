"use client";

import { AdminKey } from "@/environment";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();

  const [key, setKey] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (key === AdminKey) {
      setCookie("key", key);
      router.push("/admin");
    } else {
      alert("Invalid key!");
    }
  };

  return (
    <main className={"h-full flex items-center justify-center"}>
      <form
        className={"px-12 py-16 flex flex-col gap-4 rounded-lg bg-base-200"}
        onSubmit={handleSubmit}
      >
        <h1 className={"text-3xl font-bold text-center"}>Login</h1>
        <input
          className={"input input-bordered"}
          type="text"
          placeholder="Key"
          value={key}
          onChange={(event) => setKey(event.target.value)}
        />
        <button className={"btn btn-primary"} type={"submit"}>
          Login
        </button>
      </form>
    </main>
  );
}