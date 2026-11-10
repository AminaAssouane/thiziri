import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import type { ReactNode } from "react";
import FireflyBackground from "@/components/FireflyBackground";

type DashboardLayoutProps = { children: ReactNode };

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="mx-auto max-w-md px-4 py-6 pb-24 md:max-w-5xl md:px-10 md:pb-10 md:pt-28">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
