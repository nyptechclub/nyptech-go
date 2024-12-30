"use client";

import LoadingPage from "@/app/(pages)/loading";
import { updateLink } from "@/lib/links";
import { linkSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonMinusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const schema = z.object({
    id: z.string(),
    url: z.string().url().nonempty(),
    clicks: z.number().int(),
  });

  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      await updateLink(params.id as string, values.url);
      router.push("/manage");
    } catch (error) {
      if (error instanceof Error) form.setError("root", { message: `An error had occurred. ${error.message}` });
    }
  }

  function onCancel() {
    router.push("/manage");
  }

  useEffect(() => {
    setLoading(true);
    fetch(`/api/links/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        return linkSchema.parse(data);
      })
      .then((data) => {
        form.reset({
          id: data.id,
          url: data.url,
          clicks: data.clicks ?? 0,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <main className={"grid place-items-center"}>
      <div className={"card w-[400px] bg-base-300"}>
        <div className={"card-body gap-4"}>
          <h2 className={"card-title self-center"}>Manage Link</h2>
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
              render={({ field }) => (
                <label className={"form-control"}>
                  <div className={"label"}>
                    <div className={"label-text"}>ID</div>
                  </div>
                  <input {...field} className={"input input-bordered"} disabled />
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
            <Controller
              control={form.control}
              name={"clicks"}
              render={({ field }) => (
                <label className={"form-control"}>
                  <div className={"label"}>
                    <div className={"label-text"}>Clicks</div>
                  </div>
                  <input {...field} className={"input input-bordered"} disabled />
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
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}