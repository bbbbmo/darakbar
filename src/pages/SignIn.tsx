import { ArrowRightIcon } from "@heroicons/react/24/solid";
import supabase from "../supabase";
import { Link } from "react-router-dom";

export default function SignIn() {
  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "valid.email@supabase.io",
      password: "example-password",
    });
  }
  return (
    <div className="wrapper flex h-screen w-full flex-col items-center justify-center px-15 pt-15">
      <form className="md:100 flex flex-col items-center sm:w-80 xl:w-120">
        <div className="flex w-full flex-col gap-2 rounded-xl bg-slate-100 p-10 text-stone-700">
          <h1 className="mb-5 text-4xl font-bold text-amber-400">로그인</h1>
          <label htmlFor="">아이디</label>
          <input type="text" className="input-primary mb-3 h-8" />
          <label htmlFor="">비밀번호</label>
          <input type="password" className="input-primary mb-3 h-8" />

          <button className="btn-primary">로그인</button>
          <Link
            to="/signup"
            className="ml-auto flex cursor-pointer gap-2 hover:text-amber-400"
          >
            <button>회원이 아니신가요?</button>
            <ArrowRightIcon className="size-5" />
          </Link>
        </div>
      </form>
    </div>
  );
}
