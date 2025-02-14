import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <div className="h-screen w-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
