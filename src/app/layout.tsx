import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppWrapper from "@/components/App/AppWrapper";
import AppNavBar from "@/components/App/AppNavBar/AppNavBar";
import AppFooter from "@/components/App/AppFooter";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "다락바",
  description: "칵테일 레시피 공유 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          <AppWrapper>
            <AppNavBar />
            <main className="flex-grow">{children}</main>
            <AppFooter />
          </AppWrapper>
        </Providers>
      </body>
    </html>
  );
}
