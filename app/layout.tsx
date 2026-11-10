import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import FireflyBackground from "@/components/FireflyBackground";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Thiziri",
  description: "Health Tracker App",
};

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body className={`${inter.className} relative min-h-screen`}>
        <FireflyBackground />
        {children}
      </body>
    </html>
  );
}
