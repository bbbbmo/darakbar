import React from "react";

interface MenuProps {
  isOpen: boolean;

  children: React.ReactNode;
}

export default function Menu({ isOpen, children }: MenuProps) {
  if (!isOpen) {
    return null;
  }

  // children 배열로 반환
  const childArray = React.Children.toArray(children);
  return (
    <menu className="menu-container absolute top-full right-0 z-30 mt-5 w-48 rounded-lg bg-neutral-600 p-4 shadow-lg">
      <ul>
        {childArray.map((child, index) => (
          <li className="border-b border-stone-400" key={index}>
            {child}
          </li> // 각 자식 요소를 <li>로 감쌈
        ))}
      </ul>
    </menu>
  );
}
