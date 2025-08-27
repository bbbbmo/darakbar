"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { Button, TextInput } from "flowbite-react";

// TODO: 검색 기능 추가
export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="flex justify-center gap-3">
      <TextInput
        ref={inputRef}
        type="text"
        icon={MagnifyingGlassIcon}
        placeholder="이름 또는 재료 검색"
      />
      <Button
        className="btn-primary flex w-20 items-center justify-center gap-1 rounded-xl font-bold"
        onClick={() => {}}
      >
        검색
      </Button>
    </div>
  );
}
