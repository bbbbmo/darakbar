import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import GlobalNav from "./components/layout/GlobalNav";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <div className="h-screen w-full">
      <GlobalNav />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
