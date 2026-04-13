import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserCheck, RefreshCw } from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  city: string | null;
  created_at: string;
}

const RegisteredUsers = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();

    // Realtime subscription
    const channel = supabase
      .channel("profiles-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        fetchUsers();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="glass-card neon-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-primary" /> Registered Users
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{users.length} total</span>
          <button onClick={fetchUsers} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {loading && users.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">No registered users yet</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-muted-foreground font-medium text-xs">Name</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium text-xs">Phone</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium text-xs">City</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium text-xs">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 10).map((u) => (
                <tr key={u.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                        {(u.full_name || "U")[0].toUpperCase()}
                      </div>
                      <span className="text-foreground font-medium">{u.full_name || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-muted-foreground">{u.phone || "—"}</td>
                  <td className="py-2 px-3 text-muted-foreground">{u.city || "—"}</td>
                  <td className="py-2 px-3 text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegisteredUsers;
