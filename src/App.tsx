import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import AppNavBar from "./components/App/AppNavBar/AppNavBar";
import AppFooter from "./components/App/AppFooter";

function App() {
  return (
    <>
      <AppNavBar />
      <RouterProvider router={router} />
      <AppFooter />
    </>
  );
}

export default App;
