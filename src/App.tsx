import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import GlobalNav from "./components/GlobalNav";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <div className="w-full h-screen">
      <GlobalNav />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
