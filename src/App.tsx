import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const init = async () => {
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="wrapper min-h-screen w-full overflow-y-auto bg-neutral-800">
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </div>
  );
}

export default App;
