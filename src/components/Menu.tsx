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
    <menu className="menu-container w-40 rounded-lg bg-neutral-600 p-2 text-sm shadow-lg">
      <ul className="flex flex-col gap-2">
        {childArray.map((child, index) => (
          <li
            className="cursor-pointer rounded-sm p-2 hover:bg-neutral-700"
            key={index}
          >
            {child}
          </li> // 각 자식 요소를 <li>로 감쌈
        ))}
      </ul>
    </menu>
  );
}
