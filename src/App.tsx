import { Outlet } from "react-router-dom";
import AppNavBar from "./components/App/AppNavBar/AppNavBar";
import AppFooter from "./components/App/AppFooter";
import { ReactNode } from "react";

type AppProps = {
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
};

function App({ header, body, footer }: AppProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {header || <AppNavBar />}
      <main className="flex-grow">{body || <Outlet />}</main>
      {footer || <AppFooter />}
    </div>
  );
}

export default App;
