import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const signUpNewUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name === "") {
      setError("닉네임을 입력해주세요");
      return;
    }
    // 비밀번호 확인 추가
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Supabase 회원가입 처리
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name, // 사용자 이름 설정
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      console.log("회원가입 성공!", data);

      navigate("/signin"); // 회원가입 후 리다이렉트
    }

    setIsLoading(false);
  };

  return (
    <div className="wrapper flex h-screen w-full flex-col items-center justify-center px-15 text-amber-400">
      <form className="md:100 flex flex-col items-center sm:w-80 xl:w-120">
        <div className="flex w-full flex-col gap-2 rounded-xl bg-slate-100 p-10 text-stone-700">
          <h1 className="mb-5 text-4xl font-bold text-amber-400">회원가입</h1>
          <label htmlFor="">
            닉네임 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            className="input-primary mb-3 h-8"
            placeholder="다락바에서 활동할 이름을 정해주세요🍸"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">
            이메일 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              className="input-primary mb-3 h-8 grow"
              placeholder="example@naver.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <select className="h-8 w-30 rounded-sm">
              <option value="">직접 입력</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.com">daum.com</option>
              <option value="github.com">github.com</option>
              <option value="gmail.com">gmail.com</option>
            </select> */}
          </div>
          <label htmlFor="">
            비밀번호 <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={password}
            className="input-primary mb-3 h-8"
            placeholder="문자, 숫자, 특수문자를 포함한 10자 이상"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="">
            비밀번호 재입력 <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={confirmPassword}
            className="input-primary mb-3 h-8"
            placeholder="비밀번호 확인을 위해 재입력해주세요"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>} {/* Error 표시 */}
          <button
            className="btn-primary"
            disabled={isLoading}
            onClick={signUpNewUser}
          >
            {isLoading ? "가입중..." : "회원가입"}
          </button>
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
