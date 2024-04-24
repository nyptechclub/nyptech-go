"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton(props: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <button className={props.className} type={"submit"} disabled>
        <span className={"loading loading-dots loading-sm"} />
      </button>
    );
  }

  return (
    <button className={props.className} type={"submit"}>
      {props.children}
    </button>
  );
}