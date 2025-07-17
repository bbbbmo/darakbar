import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "./LoadingScreen";

// 로그인한 경우 이 페이지, 로그인 하지 않은 경우는 로그인 페이지로 가게 함
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />; // 세션 정보를 가져오는 동안 로딩 표시
  }

  return <>{session === null ? <Navigate to="/signin" /> : <>{children}</>}</>;
}
