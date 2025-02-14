import { UserIcon } from "@heroicons/react/24/solid";

export default function GlobalNav() {
  return (
    <nav className="border-b-white-100 fixed top-0 z-10 flex h-15 w-full items-center justify-center bg-neutral-800 px-5 text-lg">
      <div className="nav-title mr-auto cursor-pointer">🍸</div>
      <ul className="flex gap-5">
        <li>
          <a href="">Home</a>
        </li>
        <span className="border-r border-stone-400"></span>
        <li>
          <a href="">레시피 등록</a>
        </li>
        <span className="border-r border-stone-400"></span>
        <li>
          <a href="">레시피 보기</a>
        </li>
      </ul>
      <div className="ml-auto">
        <UserIcon className="size-6" />
      </div>
    </nav>
  );
}
