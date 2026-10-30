import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-cream">
      <TopBar />
      <main className="mx-auto max-w-md px-4 py-6 pb-24 md:max-w-5xl md:px-10 md:pb-10 md:pt-28">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
