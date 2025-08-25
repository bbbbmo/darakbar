import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner color="warning" aria-label="spinner" size="xl" />
    </div>
  );
}
