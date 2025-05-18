import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import ModalRoot from "./components/ModalRoot";

function App() {
  return (
    <>
      <div className="wrapper h-screen w-full overflow-y-auto bg-neutral-800">
        <RouterProvider router={router} />
      </div>
      <ModalRoot />
    </>
  );
}

export default App;
