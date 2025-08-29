"use client";

import { ArrowLeftIcon } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const goToBack = () => {
    router.back();
  };
  return (
    <ArrowLeftIcon
      className="absolute top-6 left-6 size-7 cursor-pointer fill-zinc-600"
      onClick={goToBack}
    />
  );
}
