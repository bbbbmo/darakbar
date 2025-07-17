import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { Button, Card, TextInput } from "flowbite-react";
import FormItem from "@/components/Forms/FormItem";

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
    <div className="wrapper flex h-screen w-full flex-col items-center justify-center px-15">
      <Card className="w-lg p-8">
        <h1 className="mb-5 text-4xl font-bold text-amber-400">회원가입</h1>
        <form className="flex flex-col gap-4">
          <FormItem label="닉네임" required>
            <TextInput
              type="text"
              value={name}
              className="grow"
              placeholder="다락바에서 활동할 이름을 정해주세요🍸"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </FormItem>
          <FormItem label="이메일" required>
            <TextInput
              type="email"
              value={email}
              className="grow"
              placeholder="example@naver.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormItem>
          <FormItem label="비밀번호" required>
            <TextInput
              type="password"
              value={password}
              className="grow"
              placeholder="문자, 숫자, 특수문자를 포함한 10자 이상"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormItem>
          {/* <select className="h-8 w-30 rounded-sm">
              <option value="">직접 입력</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.com">daum.com</option>
              <option value="github.com">github.com</option>
              <option value="gmail.com">gmail.com</option>
            </select> */}
          <FormItem label="비밀번호 재입력" required>
            <TextInput
              type="password"
              value={confirmPassword}
              className="grow"
              placeholder="비밀번호 확인을 위해 재입력해주세요"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormItem>
          {error && <p className="text-red-500">{error}</p>} {/* Error 표시 */}
          <Button type="submit" disabled={isLoading} onClick={signUpNewUser}>
            {isLoading ? "가입중..." : "회원가입"}
          </Button>
        </form>
        <Link
          to="/signin"
          className="ml-auto flex cursor-pointer gap-2 text-sm hover:text-amber-400"
        >
          <span className="flex items-center gap-1">
            회원이신가요?
            <ArrowRightIcon className="size-4" />
          </span>
        </Link>
      </Card>
    </div>
  );
}
