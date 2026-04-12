import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, UserPlus, Settings } from "lucide-react";
import DumbbellIcon from "./DumbbellIcon";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/leads", icon: Users, label: "Leads" },
  { to: "/add-lead", icon: UserPlus, label: "Add Lead" },
];

const CrmSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <DumbbellIcon className="h-8 w-8 text-primary" />
          <div>
            <span className="text-xl font-bold text-foreground">Gym</span>
            <span className="text-xl font-bold text-primary">Kart</span>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">CRM</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/15 text-primary neon-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </div>
      </div>
    </aside>
  );
};

export default CrmSidebar;
