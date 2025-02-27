import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../supabase";

// 로그인한 경우 이 페이지, 로그인 하지 않은 경우는 로그인 페이지로 가게 함
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null); // 유저가 로그인 했는지 여부를 알려줌

  useEffect(() => {
    const checkUser = async () => {
      const { data, error: userError } = await supabase.auth.getUser(); // 현재 로그인된 사용자 가져오기
      if (data) {
        setUser(data); // 로그인된 유저가 있으면 setUser로 상태 업데이트
      } else if (userError) {
        console.log(userError);
      } else {
        setUser(null); // 유저가 없으면 null로 설정
      }
    };

    // 컴포넌트 마운트 시 현재 로그인된 사용자 확인
    checkUser();

    // 로그인 상태 변화 감지
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user); // 유저가 로그인 상태이면 user 상태 업데이트
        } else {
          setUser(null); // 유저가 로그아웃된 상태라면 null로 설정
        }
      },
    );

    // 클린업 함수: 컴포넌트 언마운트 시 리스너 제거
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  // user가 null이면 로그인 페이지로 리다이렉트
  if (user === null) {
    return <Navigate to="/signin" />;
  }

  // 로그인된 유저가 있으면 children을 렌더링
  return <>{children}</>;
}
