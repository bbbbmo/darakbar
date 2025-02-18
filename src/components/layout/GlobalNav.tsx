import { UserIcon } from "@heroicons/react/24/solid";
import Menu from "./Menu";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function GlobalNav() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleUserMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-b-white-100 fixed top-0 z-10 flex h-15 w-full items-center justify-center bg-neutral-700 px-5 text-lg">
      <div className="nav-title mr-auto cursor-pointer hover:animate-bounce">
        <Link to="/">
          <span>🍸 </span>
          <span className="nav-title-name font-custom">다락바</span>
        </Link>
      </div>
      <ul className="flex gap-5">
        <li>
          <Link to="/">Home</Link>
        </li>
        <span className="border-r border-stone-400"></span>
        <li>
          <Link to="/recipe-register">나만의 레시피</Link>
        </li>
        <span className="border-r border-stone-400"></span>
        <li>
          <Link to="/recipe-view">레시피 탐색</Link>
        </li>
      </ul>
      <div className="relative ml-auto">
        <UserIcon className="size-6 cursor-pointer" onClick={toggleUserMenu} />
        <Menu isOpen={isMenuOpen}>
          <div>메뉴 항목 1</div>
          <div>메뉴 항목 2</div>
          <div>메뉴 항목 3</div>
        </Menu>
      </div>
    </nav>
  );
}
