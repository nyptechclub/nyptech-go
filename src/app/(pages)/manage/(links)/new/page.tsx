"use client";

import { checkLinkExists, createLink } from "@/lib/links";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonMinusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const router = useRouter();

  const schema = z.object({
    id: z.string().nonempty(),
    url: z.string().url().nonempty(),
  });

  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      // Check if the link ID already exists
      const exists = await checkLinkExists(values.id);
      if (exists) {
        form.setError("id", { message: "ID is already in use." });
        return;
      }

      // Create the link
      await createLink(values.id, values.url);
      router.push("/manage");
    } catch (error) {
      if (error instanceof Error) form.setError("root", { message: `An error had occurred. ${error.message}` });
    }
  }

  function onCancel() {
    router.push("/manage");
  }

  return (
    <main className={"grid place-items-center"}>
      <div className={"card w-[400px] bg-base-300"}>
        <div className={"card-body gap-4"}>
          <h2 className={"card-title self-center"}>Create Link</h2>
          <form id={"form"} className={"space-y-2"} onSubmit={form.handleSubmit(onSubmit)}>
            {form.formState.errors.root?.message && (
              <div className={"alert alert-error"} role={"alert"}>
                <OctagonMinusIcon className={"size-6"} />
                <span>{form.formState.errors.root.message}</span>
              </div>
            )}
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
              name={"url"}
              render={({ field, fieldState }) => (
                <label className={"form-control"}>
                  <div className={"label"}>
                    <div className={"label-text"}>URL</div>
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