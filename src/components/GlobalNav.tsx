import { UserIcon } from "@heroicons/react/24/solid";

export default function GlobalNav() {
  return (
    <div className="fixed top-0 z-50 flex h-10 w-full justify-center bg-sky-500">
      <div className="flex">
        <a href="">메뉴 1</a>
        <a href="">메뉴 2</a>
        <a href="">메뉴 3</a>
      </div>
      <UserIcon className="size-6" />
    </div>
  );
}
