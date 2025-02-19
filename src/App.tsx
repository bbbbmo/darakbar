import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

function App() {
  return (
    <div className="wrapper min-h-screen w-full overflow-y-auto bg-neutral-800">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
