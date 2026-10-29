import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Thiziri",
  description: "Health Tracker App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
