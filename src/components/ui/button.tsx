import React from "react";
import { cn } from "./utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export const Button: React.FC<ButtonProps> = ({ variant = "default", className, ...props }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors",
        variant === "outline"
          ? "border border-gray-300 text-gray-800 bg-white hover:bg-gray-100"
          : "bg-blue-600 text-white hover:bg-blue-700",
        className
      )}
      {...props}
    />
  );
};
