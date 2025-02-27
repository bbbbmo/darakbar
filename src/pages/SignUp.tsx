import { Link } from "react-router-dom";
import supabase from "../supabase";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function SignUp() {
  const signUpNewUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "valid.email@supabase.io",
      password: "example-password",
      options: {
        emailRedirectTo: "http://127.0.0.1:5173/",
      },
    });
  };

  const updateNewUser = async () => {
    await supabase.auth.updateUser({ password: new_password });
  };

  return (
    <div className="wrapper flex h-screen w-full flex-col items-center justify-center px-15 pt-15 text-amber-400">
      <form className="md:100 flex flex-col items-center sm:w-80 xl:w-120">
        <div className="flex w-full flex-col gap-2 rounded-xl bg-slate-100 p-10 text-stone-700">
          <h1 className="mb-5 text-4xl font-bold text-amber-400">회원가입</h1>

          <label htmlFor="">
            닉네임 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input-primary mb-3 h-8"
            placeholder="다락바에서 활동할 이름을 정해주세요🍸"
            required
          />

          <div className="flex items-center">
            <label htmlFor="">
              아이디 <span className="text-red-500">*</span>
            </label>
            <button className="btn-secondary ml-auto text-[12px]">
              중복확인
            </button>
          </div>
          <input
            type="text"
            className="input-primary mb-3 h-8"
            placeholder="8자리 이상"
            required
          />

          <label htmlFor="">
            비밀번호 <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="input-primary mb-3 h-8"
            placeholder="문자, 숫자, 특수문자를 포함한 10자 이상"
            required
          />

          <label htmlFor="">
            비밀번호 재입력 <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="input-primary mb-3 h-8"
            placeholder="비밀번호 확인을 위해 재입력해주세요"
            required
          />

          <label htmlFor="">이메일</label>
          <div className="flex gap-2">
            <input
              type="email"
              className="input-primary mb-3 h-8 grow"
              placeholder="example@naver.com"
            />
            <select className="h-8 w-30 rounded-sm">
              <option value="">직접 입력</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.com">daum.com</option>
              <option value="github.com">github.com</option>
              <option value="gmail.com">gmail.com</option>
            </select>
          </div>

          <button className="btn-primary">회원가입</button>
          <Link
            to="/signin"
            className="ml-auto flex cursor-pointer gap-2 hover:text-amber-400"
          >
            <button>회원이신가요?</button>
            <ArrowRightIcon className="size-5" />
          </Link>
        </div>
      </form>
    </div>
  );
}
