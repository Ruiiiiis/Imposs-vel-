import * as React from "react";
import { cn } from "@/components/ui/utils";

export function Separator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("h-px w-full", className)} {...props} />;
}
export default Separator;
