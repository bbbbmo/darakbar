import { ArrowRightIcon } from "@heroicons/react/24/solid";
import supabase from "../supabase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "") {
      setError("이메일을 입력해주세요");
      return;
    }
    // 비밀번호 확인 추가
    if (password === "") {
      setError("비밀번호를 입력해주세요");
      return;
    }

    setIsLoading(true);
    setError(null);

    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email: email,
        password: password,
      },
    );

    if (signInError) {
      setError(signInError.message);
    } else {
      console.log("로그인 성공!", data);

      navigate("/"); // 로그인 후 Home으로 리다이렉트
    }

    setIsLoading(false);
  };
  return (
    <div className="wrapper flex h-screen w-full flex-col items-center justify-center px-15">
      <img src="/images/logo/logo-whole.png" alt="logo" className="size-50" />
      <form className="md:100 flex flex-col items-center sm:w-80 xl:w-120">
        <div className="flex w-full flex-col gap-2 rounded-xl bg-slate-100 p-10 text-stone-700">
          <h1 className="mb-5 text-4xl font-bold text-amber-400">로그인</h1>
          <label htmlFor="">이메일</label>
          <input
            type="text"
            value={email}
            className="input-primary mb-3 h-8"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">비밀번호</label>
          <input
            type="password"
            value={password}
            className="input-primary mb-3 h-8"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>} {/* Error 표시 */}
          <button className="btn-primary" onClick={signInWithEmail}>
            {isLoading ? "loading..." : "로그인"}
          </button>
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
