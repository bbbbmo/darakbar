import { Link } from "react-router-dom";
import { navMenuList } from "../nav.config";
import { NavbarCollapse, NavbarLink } from "flowbite-react";

export default function NavMenu() {
  return (
    <NavbarCollapse>
      {navMenuList.map((menu, index) => {
        return (
          <NavbarLink active key={index}>
            <Link to={menu.url}>{menu.text}</Link>
          </NavbarLink>
        );
      })}
    </NavbarCollapse>
  );
}
