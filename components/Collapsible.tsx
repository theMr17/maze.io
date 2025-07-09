"use client";

import React, { useState } from "react";

interface CollapsibleProps {
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  title: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  className = "",
  defaultOpen = false,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className={`rounded overflow-clip ${className}`}>
      <div
        className="bg-tertiary-variant-2 p-1 flex justify-between items-center cursor-pointer hover:brightness-110"
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
      >
        <h6 className="text-tertiary-foreground text-xl w-full text-center">
          {title}
        </h6>

        <img
          src={isOpen ? "arrow-down.svg" : "arrow-up.svg"}
          alt={isOpen ? "Collapse" : "Expand"}
        />
      </div>

      {isOpen && (
        <div className="p-3 border-t-4 border-border-variant bg-tertiary max-h-[35vh] overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default Collapsible;
