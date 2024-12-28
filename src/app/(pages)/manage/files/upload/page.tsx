"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const router = useRouter();

  const schema = z.object({
    id: z.string().nonempty(),
    file: z.any().refine((file) => file instanceof File, "A file is required."),
  });

  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  function onSubmit(values: z.infer<typeof schema>) {
    return fetch("/api/files", {
      method: "POST",
      body: (() => {
        const formData = new FormData();
        formData.append("id", values.id);
        formData.append("file", values.file);
        return formData;
      })(),
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
          <h2 className={"card-title self-center"}>Upload File</h2>
          <form id={"form"} onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              control={form.control}
              name={"id"}
              render={({ field, fieldState }) => (
                <label className={"form-control"}>
                  <div className={"label"}>
                    <div className={"label-text"}>ID</div>
                  </div>
                  <input {...field} className={"input input-bordered"} disabled={form.formState.isSubmitting} />
                  {fieldState.error?.message && (
                    <div className={"label"}>
                      <div className={"label-text-alt text-error"}>{fieldState.error.message}</div>
                    </div>
                  )}
                </label>
              )}
            />
            <Controller
              control={form.control}
              name={"file"}
              render={({ field, fieldState }) => (
                <label className={"form-control"}>
                  <div className={"label"}>
                    <div className={"label-text"}>File</div>
                  </div>
                  <input
                    className={"file-input file-input-bordered"}
                    type={"file"}
                    disabled={form.formState.isSubmitting}
                    onChange={(e) => {
                      if (e.target.files) field.onChange({ target: { value: e.target.files[0], name: field.name } });
                    }}
                  />
                  {fieldState.error?.message && (
                    <div className={"label"}>
                      <div className={"label-text-alt text-error"}>{fieldState.error.message}</div>
                    </div>
                  )}
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
              {form.formState.isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}