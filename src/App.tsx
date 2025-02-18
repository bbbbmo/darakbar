import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import RecipeView from "./routes/RecipeNavigation";
import RecipeRegister from "./routes/RecipeRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recipe-view",
    element: <RecipeView />,
  },
  {
    path: "/recipe-register",
    element: <RecipeRegister />,
  },
]);

function App() {
  return (
    <div className="wrapper h-screen w-full bg-neutral-800">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
