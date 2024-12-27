"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const schema = z.object({
    id: z.string(),
    url: z.string().url(),
  });

  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  function onSubmit(values: z.infer<typeof schema>) {
    fetch(`/api/links/${params.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: values.url,
      }),
    }).then(() => {
      router.push("/manage");
    });
  }

  function onCancel() {
    router.push("/manage");
  }

  useEffect(() => {
    fetch(`/api/links/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        form.reset(data);
      });
  }, []);

  return (
    <main className={"grid place-items-center"}>
      <div className={"card w-[400px] bg-base-300"}>
        <div className={"card-body"}>
          <h2 className={"card-title self-center"}>Manage Link</h2>
          <form id={"form"} onSubmit={form.handleSubmit(onSubmit)}>
            <label className={"form-control"}>
              <div className={"label"}>
                <div className={"label-text"}>ID</div>
              </div>
              <input {...form.register("id")} className={"input input-bordered"} disabled />
            </label>
            <label className={"form-control"}>
              <div className={"label"}>
                <div className={"label-text"}>URL</div>
              </div>
              <input {...form.register("url")} className={"input input-bordered"} />
            </label>
          </form>
          <div className={"card-actions mt-2 justify-end"}>
            <button
              className={"btn btn-outline btn-sm"}
              disabled={form.formState.isSubmitting}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className={"btn btn-info btn-sm"}
              form={"form"}
              disabled={form.formState.isSubmitting}
              type={"submit"}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}