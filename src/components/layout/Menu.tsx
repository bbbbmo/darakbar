import React from "react";

interface MenuProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Menu({ isOpen, children }: MenuProps) {
  if (!isOpen) {
    return null;
  }
  return <menu className="flex-col">{children}</menu>;
}
