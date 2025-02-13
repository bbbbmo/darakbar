import { UserIcon } from "@heroicons/react/24/solid";

export default function GlobalNav() {
  return (
    <div className="border-b-white-100 fixed top-0 z-50 flex h-15 w-full items-center justify-center bg-neutral-800 px-5">
      <div className="mr-auto">🍸</div>
      <div className="flex gap-5">
        <a href="">메뉴 1</a>
        <a href="">메뉴 2</a>
        <a href="">메뉴 3</a>
      </div>
      <UserIcon className="ml-auto size-6" />
    </div>
  );
}
