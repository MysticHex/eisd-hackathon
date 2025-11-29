import { ReactNode, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export function DashboardLayout({ children }: { children?: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Drawer */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex-1 flex flex-col min-w-0">
          <TopNav onMenuClick={() => setMobileOpen(true)} />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
