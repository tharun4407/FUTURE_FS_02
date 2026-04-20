import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, UserPlus, Settings, Sun, Moon, Dumbbell, LogOut } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/leads", icon: Users, label: "Leads" },
  { to: "/add-lead", icon: UserPlus, label: "Add Lead" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const SidebarNav = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { signOut } = useAuth();

  const renderIcon = (icon: React.ComponentType<{ className?: string }>) => React.createElement(icon, { className: "h-5 w-5 shrink-0" });

  return (
    <>
      <SidebarHeader className="p-0">
        <Button variant="ghost" size="lg" className="w-full h-16 justify-start gap-2 p-0 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-0">
          <Link to="/" className="flex items-center gap-2 p-3 md:p-2">
            <Dumbbell className="h-5 w-5 flex-shrink-0 text-primary md:h-6 md:w-6" />
            <div className="hidden md:flex flex-col items-start truncate">
              <span className="text-base font-bold leading-none tracking-tight text-foreground truncate">
                Gym<span className="text-primary">Kart</span>
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">CRM</span>
            </div>
            <Dumbbell className="h-5 w-5 flex-shrink-0 text-primary md:hidden" />
          </Link>
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <Link to={item.to}>
                      {renderIcon(item.icon)}
                      <span>{item.label}</span>
                      {isActive && (
                        <SidebarMenuBadge>●</SidebarMenuBadge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={toggleTheme}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={signOut}>
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
};

export default SidebarNav;
