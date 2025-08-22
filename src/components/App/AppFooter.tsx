import { Footer, FooterCopyright, FooterIcon } from "flowbite-react";
import { BsFacebook, BsInstagram, BsGithub, BsDribbble } from "react-icons/bs";

export default function AppFooter() {
  return (
    <Footer container className="!bg-zinc-900 !opacity-95">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          {/* <FooterBrand
            src="/images/logo/logo-whole.png"
            alt="다락바 로고"
            name="다락바"
          >
            <Link to="/"></Link>
          </FooterBrand> */}
          {/* <div className="mr-20 ml-auto flex flex-col gap-3">
            <div>aqw20501@naver.com</div>
            <div className="flex gap-3">
              <Link to="" className="flex cursor-pointer gap-1 hover:underline">
                <img src="/images/instagram.png" alt="instagram" />
              </Link>
              <Link
                to="https://github.com/bbbbmo"
                className="flex cursor-pointer gap-1 hover:underline"
              >
                <img src="/images/github.png" alt="github" />
              </Link>
            </div>
          </div> */}
        </div>

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
