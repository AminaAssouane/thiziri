import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-cream pb-20">
      <Sidebar />
      <main className="mx-auto max-w-md px-4 py-6">{children}</main>
      <BottomNav />
    </div>
  );
}
