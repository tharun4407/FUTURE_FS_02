import { ReactNode } from "react";
import CrmSidebar from "./CrmSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

const CrmLayout = ({ children }: { children: ReactNode }) => {
  const { user, signOut } = useAuth();
  const fullName = user?.user_metadata?.full_name || user?.email || "User";
  const initials = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen">
      <CrmSidebar />
      <div className="ml-64">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 flex items-center justify-end gap-3 border-b border-border bg-background/80 backdrop-blur px-8 py-3">
          <span className="text-sm text-muted-foreground hidden sm:block">{fullName}</span>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <button
            onClick={signOut}
            className="text-muted-foreground hover:text-destructive transition-colors"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};

export default CrmLayout;
