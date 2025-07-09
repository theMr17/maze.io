import React from "react";

interface PlayButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const PlayButton: React.FC<PlayButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded bg-secondary text-secondary-foreground text-3xl border-border border-6 mt-10 cursor-pointer hover:bg-secondary-variant ${className}`}
    >
      {children}
    </button>
  );
};

export default PlayButton;
