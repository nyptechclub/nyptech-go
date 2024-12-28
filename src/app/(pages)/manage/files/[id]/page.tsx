"use client";

import LoadingPage from "@/app/(pages)/loading";
import { fileSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
    key: z.string(),
    hash: z.string(),
    url: z.string().url(),
  });

  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  function onCancel() {
    router.push("/manage/files");
  }

  useEffect(() => {
    setLoading(true);
    fetch(`/api/files/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        return fileSchema.parse(data);
      })
      .then((data) => {
        form.reset({
          id: data.id,
          key: data.key,
          hash: data.hash,
          url: data.url,
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
        <div className={"card-body"}>
          <h2 className={"card-title self-center"}>Manage File</h2>
          <form id={"form"} onSubmit={form.handleSubmit(() => {})}>
            <Controller
              control={form.control}
              name={"id"}
              render={({ field, fieldState }) => (
                <label className={"form-control"}>
                  <div className={"label"}>
                    <div className={"label-text"}>ID</div>
                  </div>
                  <input {...field} className={"input input-bordered"} disabled />
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
              name={"key"}
              render={({ field, fieldState }) => (
                <label className={"form-control"}>
                  <div className={"label"}>
                    <div className={"label-text"}>Key</div>
                  </div>
                  <input {...field} className={"input input-bordered"} disabled />
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
              name={"hash"}
              render={({ field, fieldState }) => (
                <label className={"form-control"}>
                  <div className={"label"}>
                    <div className={"label-text"}>Hash</div>
                  </div>
                  <input {...field} className={"input input-bordered"} disabled />
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
                  <input {...field} className={"input input-bordered"} disabled />
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
            <button className={"btn btn-outline btn-sm"} onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}