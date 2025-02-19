import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import RecipeNavigation from "../pages/RecipeNavigation/RecipeNavigation";
import RecipeRegister from "../pages/RecipeRegister/RecipeRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recipe-navigation",
    element: <RecipeNavigation />,
  },
  {
    path: "/recipe-register",
    element: <RecipeRegister />,
  },
]);

export default router;
