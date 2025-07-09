import React from "react";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-tertiary text-tertiary-foreground text-2xl px-6 py-2 cursor-pointer hover:bg-tertiary-variant rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
