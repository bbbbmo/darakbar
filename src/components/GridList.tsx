import React from "react";

type GridListProps<T> = {
  items: T[];
  children: (item: T, index: number) => React.ReactNode;
};

export default function GridList<T>({ items, children }: GridListProps<T>) {
  return (
    <div className="mb-10 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => (
        <div className="" key={index}>
          {children(item, index)}
        </div>
      ))}
    </div>
  );
}
