// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/components/Providers/AuthProvider";
import { useState } from "react";
import { ThemeProvider } from "flowbite-react";
import { basicTheme } from "@/lib/flowbite/themes/basicTheme";

export function Providers({ children }: { children: React.ReactNode }) {
  // useState로 감싸야 Client HMR 시 QueryClient가 재생성되지 않음
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={basicTheme}>{children}</ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
