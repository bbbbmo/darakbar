"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { Button, TextInput } from "flowbite-react";
import clsx from "clsx";
import { basicTheme } from "@/lib/flowbite/themes/basicTheme";

type SearchBarProps = {
  className?: string;
};

// TODO: 검색 기능 추가
export default function SearchBar({ className }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <section className={clsx("flex gap-3", className)}>
      <TextInput
        ref={inputRef}
        type="text"
        theme={basicTheme.textInput}
        color="primary"
        icon={MagnifyingGlassIcon}
        placeholder="이름 또는 재료 검색"
      />
      <Button className="btn-primary flex w-20 items-center justify-center gap-1 rounded-xl font-bold">
        검색
      </Button>
    </section>
  );
}
