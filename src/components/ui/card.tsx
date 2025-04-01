import React from "react";
import { cn } from "./utils";

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  return <div className={cn("bg-white rounded-xl shadow-md", className)}>{children}</div>;
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  return <div className={cn("p-4", className)}>{children}</div>;
};
