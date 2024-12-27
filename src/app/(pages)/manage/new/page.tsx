"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const router = useRouter();

  const schema = z.object({
    id: z.string().nonempty(),
    url: z.string().url().nonempty(),
  });

  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  function onSubmit(values: z.infer<typeof schema>) {
    fetch(`/api/links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: values.id,
        url: values.url,
      }),
    }).then(() => {
      router.push("/manage");
    });
  }

  function onCancel() {
    router.push("/manage");
  }

  return (
    <main className={"grid place-items-center"}>
      <div className={"card w-[400px] bg-base-300"}>
        <div className={"card-body"}>
          <h2 className={"card-title self-center"}>Create Link</h2>
          <form id={"form"} onSubmit={form.handleSubmit(onSubmit)}>
            <label className={"form-control"}>
              <div className={"label"}>
                <div className={"label-text"}>ID</div>
              </div>
              <input {...form.register("id")} className={"input input-bordered"} />
              {form.formState.errors.id && (
                <div className={"label"}>
                  <div className={"label-text-alt text-error"}>{form.formState.errors.id.message}</div>
                </div>
              )}
            </label>
            <label className={"form-control"}>
              <div className={"label"}>
                <div className={"label-text"}>URL</div>
              </div>
              <input {...form.register("url")} className={"input input-bordered"} />
              {form.formState.errors.url && (
                <div className={"label"}>
                  <div className={"label-text-alt text-error"}>{form.formState.errors.url.message}</div>
                </div>
              )}
            </label>
          </form>
          <div className={"card-actions mt-2 justify-end"}>
            <button className={"btn btn-outline btn-sm"} disabled={form.formState.isSubmitting} onClick={onCancel}>
              Cancel
            </button>
            <button
              className={"btn btn-info btn-sm"}
              form={"form"}
              disabled={form.formState.isSubmitting}
              type={"submit"}
            >
              {form.formState.isSubmitting ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}