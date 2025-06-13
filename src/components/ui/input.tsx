"use client";

import { cn } from "@/components/ui/utils";
import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500",
        props.className
      )}
      {...props}
    />
  );
}
