"use client";

import { navMenuList } from "../AppNavBar.const";
import { NavbarCollapse } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMenu() {
  const pathname = usePathname();
  return (
    <NavbarCollapse>
      {navMenuList.map((menu, index) => {
        return (
          <Link
            key={index}
            href={menu.url}
            className={`${pathname === menu.url ? "active" : ""}`}
          >
            {menu.text}
          </Link>
        );
      })}
    </NavbarCollapse>
  );
}
