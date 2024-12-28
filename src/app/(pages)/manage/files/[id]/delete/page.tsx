"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const schema = z.object({
    id: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  function onSubmit(values: z.infer<typeof schema>) {
    if (values.id !== params.id) {
      // TODO: Use proper toasting
      alert("Invalid ID");
      return;
    }

    return fetch(`/api/files/${params.id}`, {
      method: "DELETE",
    }).then(() => {
      router.push("/manage/files");
    });
  }

  function onCancel() {
    router.push("/manage/files");
  }

  return (
    <main className={"grid place-items-center"}>
      <div className={"card w-[400px] bg-base-300"}>
        <div className={"card-body"}>
          <h2 className={"card-title self-center"}>Delete File</h2>
          <form id={"form"} onSubmit={form.handleSubmit(onSubmit)}>
            <p>Are you sure that you want to delete this file? To confirm, please enter the ID of the file below.</p>
            <p className={"my-2 text-center"}>
              <span className={"text-lg font-bold"}>{params.id}</span>
            </p>
            <Controller
              control={form.control}
              name={"id"}
              render={({ field }) => (
                <label className={"form-control"}>
                  <div className={"label"}>
                    <div className={"label-text"}>Confirmation ID</div>
                  </div>
                  <input {...field} className={"input input-bordered"} disabled={form.formState.isSubmitting} />
                </label>
              )}
            />
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
              {form.formState.isSubmitting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}