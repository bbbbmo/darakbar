import { Outlet } from "react-router-dom";
import AppNavBar from "./components/App/AppNavBar/AppNavBar";
import AppFooter from "./components/App/AppFooter";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type AppProps = {
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
};

const queryClient = new QueryClient();
function App({ header, body, footer }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-zinc-900">
        {header || <AppNavBar />}
        <main className="flex-grow">{body || <Outlet />}</main>
        {footer || <AppFooter />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
