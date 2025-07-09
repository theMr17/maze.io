import React from "react";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "light" | "dark";
  type?: "button" | "submit" | "reset";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "dark",
  type = "button",
}) => {
  // Variant-based classes
  const baseClasses =
    "text-2xl px-6 py-2 cursor-pointer rounded hover:brightness-110";
  const variantClasses =
    variant === "dark"
      ? "bg-tertiary text-tertiary-foreground"
      : "bg-primary-variant text-primary-foreground";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
