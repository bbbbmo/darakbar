import { Link } from "react-router-dom";

export default function GlobalFooter() {
  return (
    <>
      <div className="divider w-full bg-neutral-800 px-7">
        <hr className="border-t border-zinc-700"></hr>
      </div>
      <footer className="footer w-full bg-neutral-800 p-5">
        <span className="rounded-3xl bg-neutral-700 p-2 text-xl">Contact</span>
        <div className="mt-3 flex w-full">
          <p className="footer-content"></p>
          <div className="mr-3 ml-auto flex flex-col gap-2">
            <Link to="" className="flex cursor-pointer gap-1 hover:underline">
              Instagram
              <img src="/images/instagram.png" alt="instagram" />
            </Link>

            <Link
              to="https://github.com/bbbbmo"
              className="flex cursor-pointer gap-1 hover:underline"
            >
              GitHub
              <img src="/images/github.png" alt="github" />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
