import { useState } from "react";
import { Search, Trash2, Eye } from "lucide-react";
import DumbbellIcon from "@/components/DumbbellIcon";
import LeadDetailDialog from "@/components/LeadDetailDialog";
import type { Lead, LeadStatus } from "@/data/leads";

interface LeadsProps {
  leads: Lead[];
  updateStatus: (id: string, status: LeadStatus) => void;
  deleteLead: (id: string) => void;
  addFollowUp: (leadId: string, note: string) => void;
  updateLeadNotes: (id: string, notes: string) => void;
}

const statuses: LeadStatus[] = ["New", "Contacted", "Converted", "Lost"];

const Leads = ({ leads, updateStatus, deleteLead, addFollowUp, updateLeadNotes }: LeadsProps) => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "All">("All");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.gymInterest.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || l.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Keep selected lead in sync with leads state
  const activeLead = selectedLead ? leads.find((l) => l.id === selectedLead.id) || null : null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <DumbbellIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads</h1>
          <p className="text-sm text-muted-foreground">Manage all your gym leads</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card neon-border p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 rounded-lg bg-secondary pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          {["All", ...statuses].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s as LeadStatus | "All")}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                filterStatus === s
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card neon-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Name</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Phone</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Gym Interest</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Source</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Follow-ups</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-foreground">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{lead.phone}</td>
                  <td className="py-3 px-4 text-muted-foreground">{lead.gymInterest}</td>
                  <td className="py-3 px-4 text-muted-foreground">{lead.source}</td>
                  <td className="py-3 px-4">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer status-${lead.status.toLowerCase()}`}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs text-muted-foreground">
                      {lead.followUps.length} note{lead.followUps.length !== 1 ? "s" : ""}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        title="View details & follow-ups"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Dialog */}
      {activeLead && (
        <LeadDetailDialog
          lead={activeLead}
          open={!!activeLead}
          onClose={() => setSelectedLead(null)}
          onAddFollowUp={addFollowUp}
          onUpdateNotes={updateLeadNotes}
          onUpdateStatus={updateStatus}
        />
      )}
    </div>
  );
};

export default Leads;
