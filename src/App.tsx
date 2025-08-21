import AppNavBar from "./app/components/App/AppNavBar/AppNavBar";
import AppFooter from "./app/components/App/AppFooter";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppWrapper from "./app/components/App/AppWrapper";

type AppProps = {
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App({ header, body, footer }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        {header || <AppNavBar />}
        <main className="flex-grow">{body}</main>
        {footer || <AppFooter />}
      </AppWrapper>
    </QueryClientProvider>
  );
}

export default App;
