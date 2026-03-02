import { Header } from "@/components/admin/Header";
import { Sidebar } from "@/components/admin/Sidebar";

export function AdminLayout({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header title={title} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
