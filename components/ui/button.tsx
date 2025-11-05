import * as React from "react";
import { cn } from "@/components/ui/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "ghost" | "default"; size?: "icon" | "default" };

export function Button({ className, variant = "default", size = "default", ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";
  const variants = variant === "ghost"
    ? "bg-transparent hover:bg-slate-800/60 border"
    : "bg-slate-800 hover:bg-slate-700 border border-slate-700";
  const sizes = size === "icon" ? "h-10 w-10" : "h-10 px-4 py-2";
  return <button className={cn(base, variants, sizes, className)} {...props} />;
}
export default Button;
