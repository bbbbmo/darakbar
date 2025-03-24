import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import RecipeNavigation from "../pages/RecipeNavigation/RecipeNavigation";
import RecipeRegister from "../pages/RecipeRegister/RecipeRegister";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import UserProfile from "../pages/EditProfile";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/", // 메인
    element: <Home />,
  },
  {
    path: "/signin", // 로그인
    element: <SignIn />,
  },
  {
    path: "/signup", // 회원가입
    element: <SignUp />,
  },
  {
    path: "/edit-profile", // 정보 수정 -> 로그인 필요
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recipe-register", // 나만의 레시피 -> 로그인 필요
    element: (
      <ProtectedRoute>
        <RecipeRegister />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recipe-navigation", // 레시피 탐색
    element: <RecipeNavigation />,
  },
]);

export default router;
