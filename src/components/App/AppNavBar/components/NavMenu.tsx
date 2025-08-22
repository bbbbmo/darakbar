import { NavLink } from "react-router-dom";
import { navMenuList } from "../AppNavBar.const";
import { NavbarCollapse } from "flowbite-react";

export default function NavMenu() {
  return (
    <NavbarCollapse>
      {navMenuList.map((menu, index) => {
        return (
          <NavLink key={index} to={menu.url} className="active">
            {menu.text}
          </NavLink>
        );
      })}
    </NavbarCollapse>
  );
}
