import { useState } from "react";
import { X, MessageSquarePlus, Clock, User, Mail, Phone, MapPin, Tag, FileText } from "lucide-react";
import type { Lead, LeadStatus, FollowUp } from "@/data/leads";

interface LeadDetailDialogProps {
  lead: Lead;
  open: boolean;
  onClose: () => void;
  onAddFollowUp: (leadId: string, note: string) => void;
  onUpdateNotes: (leadId: string, notes: string) => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
}

const statuses: LeadStatus[] = ["New", "Contacted", "Converted", "Lost"];

const LeadDetailDialog = ({ lead, open, onClose, onAddFollowUp, onUpdateNotes, onUpdateStatus }: LeadDetailDialogProps) => {
  const [newFollowUp, setNewFollowUp] = useState("");
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState(lead.notes);

  if (!open) return null;

  const handleAddFollowUp = () => {
    if (!newFollowUp.trim()) return;
    onAddFollowUp(lead.id, newFollowUp.trim());
    setNewFollowUp("");
  };

  const handleSaveNotes = () => {
    onUpdateNotes(lead.id, notesValue);
    setEditingNotes(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="glass-card neon-border w-full max-w-2xl max-h-[85vh] overflow-y-auto mx-4 p-0" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">{lead.name}</h2>
            <p className="text-sm text-muted-foreground">Lead since {lead.createdAt}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm text-foreground">{lead.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm text-foreground">{lead.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Gym Interest</p>
                <p className="text-sm text-foreground">{lead.gymInterest}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Tag className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Source</p>
                <p className="text-sm text-foreground">{lead.source}</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
            <div className="flex gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdateStatus(lead.id, s)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    lead.status === s
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" /> Notes
              </label>
              {!editingNotes && (
                <button onClick={() => { setNotesValue(lead.notes); setEditingNotes(true); }} className="text-xs text-primary hover:underline">
                  Edit
                </button>
              )}
            </div>
            {editingNotes ? (
              <div className="space-y-2">
                <textarea
                  value={notesValue}
                  onChange={(e) => setNotesValue(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <div className="flex gap-2">
                  <button onClick={handleSaveNotes} className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium">Save</button>
                  <button onClick={() => setEditingNotes(false)} className="px-4 py-1.5 rounded-lg bg-secondary text-muted-foreground text-xs font-medium">Cancel</button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground bg-secondary/50 rounded-lg p-3">{lead.notes || "No notes yet"}</p>
            )}
          </div>

          {/* Follow-ups */}
          <div>
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-primary" /> Follow-ups ({lead.followUps.length})
            </h3>

            {/* Add follow-up */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newFollowUp}
                onChange={(e) => setNewFollowUp(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddFollowUp()}
                placeholder="Add a follow-up note..."
                className="flex-1 h-10 rounded-lg bg-secondary px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleAddFollowUp}
                disabled={!newFollowUp.trim()}
                className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <MessageSquarePlus className="h-4 w-4" /> Add
              </button>
            </div>

            {/* Follow-up list */}
            <div className="space-y-3">
              {lead.followUps.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No follow-ups yet. Add one above.</p>
              )}
              {[...lead.followUps].reverse().map((f) => (
                <div key={f.id} className="bg-secondary/50 rounded-lg p-3 border-l-2 border-primary/50">
                  <p className="text-sm text-foreground">{f.note}</p>
                  <p className="text-xs text-muted-foreground mt-1">{f.createdAt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailDialog;
