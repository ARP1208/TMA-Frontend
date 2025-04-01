import React from "react";
import { cn } from "./utils";

export const Separator: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn("h-px bg-gray-300", className)} />;
};
