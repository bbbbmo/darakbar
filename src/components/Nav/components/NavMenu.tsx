import React from "react";
import { Link } from "react-router-dom";

const navMenuList = [
  {
    text: "Home",
    url: "/",
  },
  {
    text: "나만의 레시피",
    url: "/recipe-register",
  },
  {
    text: "레시피 탐색",
    url: "/recipe-navigation",
  },
  {
    text: "다락바 탐방",
    url: "/bar-search",
  },
];

export default function NavMenu() {
  return (
    <ul className="nav-menu flex flex-grow justify-center gap-5">
      {navMenuList.map((menu, index) => {
        return (
          <React.Fragment key={menu.text}>
            <li>
              <Link to={menu.url}>{menu.text}</Link>
            </li>
            {index !== navMenuList.length - 1 && (
              <span className="border-r border-stone-400"></span>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
}
