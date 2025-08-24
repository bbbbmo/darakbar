"use client";

import { Footer, FooterCopyright, FooterIcon } from "flowbite-react";
import { BsFacebook, BsInstagram, BsGithub, BsDribbble } from "react-icons/bs";

export default function AppFooter() {
  return (
    <Footer container className="!bg-zinc-900 !opacity-95">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between"></div>

        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="/" by="다락바™" year={2025} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="https://github.com/bbbbmo" icon={BsGithub} />
            <FooterIcon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
