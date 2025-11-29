import { LayoutDashboard, FileText, Factory, Package, ChevronLeft } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useSidebar } from '@/components/ui/sidebar';
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'OCR Documents', url: '/ocr', icon: FileText },
  { title: 'TICS Efficiency', url: '/tics', icon: Factory },
  { title: 'Traceability', url: '/trace', icon: Package },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { open, setOpen } = useSidebar();

  return (
    <SidebarRoot className={open ? 'w-64' : 'w-16'} collapsible="icon">
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {open && (
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            DIP Platform
          </h2>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors"
        >
          <ChevronLeft
            className={`h-5 w-5 text-sidebar-foreground transition-transform ${
              !open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary-foreground font-medium"
                      onClick={onNavigate}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarRoot>
  );
}
