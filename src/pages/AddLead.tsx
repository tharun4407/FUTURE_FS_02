import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DumbbellIcon from "@/components/DumbbellIcon";
import type { Lead, LeadSource, LeadStatus } from "@/data/leads";

interface AddLeadProps {
  addLead: (lead: Omit<Lead, "id" | "createdAt">) => void;
}

const sources: LeadSource[] = ["Website", "Referral", "Social Media", "Walk-in", "Cold Call", "Email"];
const statuses: LeadStatus[] = ["New", "Contacted", "Converted", "Lost"];

const AddLead = ({ addLead }: AddLeadProps) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    source: "Website" as LeadSource,
    status: "New" as LeadStatus,
    gymInterest: "",
    notes: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Name and email are required");
      return;
    }
    addLead(form);
    toast.success("Lead added successfully!");
    navigate("/leads");
  };

  const fields = [
    { label: "Full Name", key: "name", type: "text", placeholder: "Enter full name", required: true },
    { label: "Email", key: "email", type: "email", placeholder: "Enter email address", required: true },
    { label: "Phone", key: "phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
    { label: "Gym Interest", key: "gymInterest", type: "text", placeholder: "Which gym are they interested in?" },
  ];

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <DumbbellIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add New Lead</h1>
          <p className="text-sm text-muted-foreground">Capture a new gym membership lead</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-card neon-border p-8 space-y-6">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-foreground mb-2">
              {f.label} {f.required && <span className="text-primary">*</span>}
            </label>
            <input
              type={f.type}
              value={(form as any)[f.key]}
              onChange={(e) => update(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="w-full h-11 rounded-lg bg-secondary px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Source</label>
            <select
              value={form.source}
              onChange={(e) => update("source", e.target.value)}
              className="w-full h-11 rounded-lg bg-secondary px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {sources.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className="w-full h-11 rounded-lg bg-secondary px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Additional notes about the lead..."
            rows={3}
            className="w-full rounded-lg bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="h-11 px-8 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Add Lead
          </button>
          <button
            type="button"
            onClick={() => navigate("/leads")}
            className="h-11 px-8 rounded-lg border border-border text-muted-foreground font-medium hover:text-foreground hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLead;
