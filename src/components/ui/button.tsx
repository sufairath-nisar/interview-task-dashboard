"use client";

import { cn } from "@/components/ui/utils";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  children: ReactNode;
}

const variantStyles = {
  default: "bg-blue-500 text-white hover:bg-blue-600",
  outline: "border border-blue-500 text-blue-500 hover:bg-blue-50",
  destructive: "bg-red-500 text-white hover:bg-red-600",
};

const sizeStyles = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export function Button({ variant = "default", size = "md", asChild = false, className = "", children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn("rounded font-medium focus:outline-none focus:ring cursor-pointer", variantStyles[variant], sizeStyles[size], className)} {...props}>
      {children}
    </Comp>
  );
}
