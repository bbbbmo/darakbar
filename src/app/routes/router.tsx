import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import BasicRecipe from "../pages/BasicRecipe/BasicRecipe";
import PersonalRecipe from "../pages/PersonalRecipe/PersonalRecipe";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import EditProfile from "../pages/EditProfile/EditProfile";
import App from "../../App";
import AuthProvider from "@/app/components/Auth/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signin", // 로그인
        element: <SignIn />,
      },
      {
        path: "signup", // 회원가입
        element: <SignUp />,
      },
      {
        path: "edit-profile", // 정보 수정 -> 로그인 필요
        element: (
          <AuthProvider>
            <EditProfile />
          </AuthProvider>
        ),
      },
      {
        path: "personal-recipe", // 나만의 레시피 -> 로그인 필요
        element: (
          <AuthProvider>
            <PersonalRecipe />
          </AuthProvider>
        ),
      },
      {
        path: "basic-recipe", // 레시피 탐색
        element: <BasicRecipe />,
      },
    ],
  },
]);

export default router;
