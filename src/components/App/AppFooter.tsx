import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
} from "flowbite-react";
import { Link } from "react-router-dom";

export default function AppFooter() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterBrand
            src="/images/logo/logo-whole.png"
            alt="다락바 로고"
            name="다락바"
          >
            <Link to="/"></Link>
          </FooterBrand>
          <div className="mr-20 ml-auto flex flex-col gap-3">
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
          </div>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by="Flowbite™" year={2022} />
      </div>
    </Footer>
  );
}
