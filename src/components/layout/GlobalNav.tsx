import { UserIcon } from "@heroicons/react/24/solid";

export default function GlobalNav() {
  return (
    <nav className="border-b-white-100 fixed top-0 z-10 flex h-15 w-full items-center justify-center bg-neutral-800 px-5 text-lg">
      <div className="mr-auto">🍸</div>
      <div className="flex gap-5">
        <a href="">Home</a>
        <a href="">레시피 등록</a>
        <a href="">레시피 보기</a>
      </div>
      <div className="ml-auto">
        <UserIcon className="size-6" />
      </div>
    </nav>
  );
}
