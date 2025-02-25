import { Link } from "react-router-dom";

export default function GlobalFooter() {
  return (
    <>
      <div className="divider w-full bg-neutral-800 px-7">
        <hr className="border-t border-zinc-700"></hr>
      </div>
      <footer className="footer w-full bg-neutral-800 px-10 py-5 text-neutral-400">
        <div className="flex w-full">
          <Link to="/">
            <img src="/images/logo/logo-whole.png" className="size-18" />
          </Link>
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
      </footer>
    </>
  );
}
