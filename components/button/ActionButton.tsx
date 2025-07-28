import React from "react";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "light" | "dark";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "dark",
  type = "button",
  disabled = false,
}) => {
  const baseClasses =
    "text-2xl px-6 py-2 cursor-pointer rounded hover:brightness-110 transition duration-150";
  const variantClasses =
    variant === "dark"
      ? "bg-tertiary text-tertiary-foreground"
      : "bg-primary-variant text-primary-foreground";
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed hover:brightness-100"
    : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
