import { ArrowRightIcon } from "@heroicons/react/24/solid";
import supabase from "@/supabase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import FormItem from "@/components/Forms/FormItem";
import { Button, Card, TextInput } from "flowbite-react";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const signInWithEmail = async () => {
    if (!email || email === "") {
      setError("이메일을 입력해주세요");
      return;
    }
    // 비밀번호 확인 추가
    if (!password || password === "") {
      setError("비밀번호를 입력해주세요");
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (signInError) {
      setError(signInError.message);
    } else {
      navigate("/"); // 로그인 후 Home으로 리다이렉트
    }

    setIsLoading(false);
  };
  return (
    <div className="wrapper flex h-screen w-full flex-col items-center justify-center">
      <img src="/images/logo/logo-whole.png" alt="logo" className="size-50" />
      <Card className="w-lg p-8">
        <h1 className="mb-5 text-4xl font-bold text-amber-400">로그인</h1>
        <form className="flex flex-col gap-4">
          <FormItem label="이메일">
            <TextInput
              type="email"
              value={email}
              className="grow"
              placeholder="이메일을 입력해주세요"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormItem>
          <FormItem label="비밀번호">
            <TextInput
              type="password"
              value={password}
              className="grow"
              placeholder="비밀번호를 입력해주세요"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormItem>
          {error && <p className="text-red-500">{error}</p>} {/* Error 표시 */}
          <Button type="submit" onClick={signInWithEmail}>
            {isLoading ? "loading..." : "로그인"}
          </Button>
        </form>
        <Link
          to="/signup"
          className="ml-auto flex cursor-pointer gap-2 text-sm hover:text-amber-400"
        >
          <span className="flex items-center gap-1">
            회원이 아니신가요?
            <ArrowRightIcon className="size-4" />
          </span>
        </Link>
      </Card>
    </div>
  );
}
