import type { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-full border border-white/20 px-6 py-3 text-sm transition hover:bg-white hover:text-ink ${props.className ?? ""}`}
    />
  );
}
