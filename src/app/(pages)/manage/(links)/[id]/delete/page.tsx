"use client";

import { deleteLink } from "@/lib/links";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonMinusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const schema = z.object({
    id: z.string().nonempty("Please enter the confirmation ID."),
  });

  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  async function onSubmit(values: z.infer<typeof schema>) {
    if (values.id !== params.id) {
      form.setError("id", { message: "The confirmation ID does not match." });
      return;
    }

    try {
      await deleteLink(params.id);
      router.push("/manage");
    } catch (error) {
      if (error instanceof Error) form.setError("id", { message: error.message });
    }
  }

  function onCancel() {
    router.push("/manage");
  }

  return (
    <main className={"grid place-items-center"}>
      <div className={"card w-[400px] bg-base-300"}>
        <div className={"card-body gap-4"}>
          <h2 className={"card-title self-center"}>Delete Link</h2>
          <form id={"form"} className={"space-y-2"} onSubmit={form.handleSubmit(onSubmit)}>
            {form.formState.errors.root?.message && (
              <div className={"alert alert-error"} role={"alert"}>
                <OctagonMinusIcon className={"size-6"} />
                <span>{form.formState.errors.root.message}</span>
              </div>
            )}
            <div>
              <p>Are you sure that you want to delete this link? To confirm, please enter the ID of the link below.</p>
              <p className={"text-center"}>
                <span className={"text-lg font-bold"}>{params.id}</span>
              </p>
            </div>
            <Controller
              control={form.control}
              name={"id"}
              render={({ field }) => (
                <label className={"form-control"}>
                  <div className={"label"}>
                    <div className={"label-text"}>Confirmation ID</div>
                  </div>
                  <input {...field} className={"input input-bordered"} />
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