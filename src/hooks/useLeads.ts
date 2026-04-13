import { useState, useCallback } from "react";
import { Lead, FollowUp, initialLeads, LeadStatus } from "@/data/leads";

const STORAGE_KEY = "gymkart-crm-leads";

function loadLeads(): Lead[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure followUps array exists on all leads (backward compat)
      return parsed.map((l: any) => ({ ...l, followUps: l.followUps || [] }));
    }
    return initialLeads;
  } catch {
    return initialLeads;
  }
}

function saveLeads(leads: Lead[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(loadLeads);

  const addLead = useCallback((lead: Omit<Lead, "id" | "createdAt" | "followUps">) => {
    setLeads((prev) => {
      const newLeads = [
        { ...lead, id: crypto.randomUUID(), createdAt: new Date().toISOString().split("T")[0], followUps: [] },
        ...prev,
      ];
      saveLeads(newLeads);
      return newLeads;
    });
  }, []);

  const updateStatus = useCallback((id: string, status: LeadStatus) => {
    setLeads((prev) => {
      const newLeads = prev.map((l) => (l.id === id ? { ...l, status } : l));
      saveLeads(newLeads);
      return newLeads;
    });
  }, []);

  const deleteLead = useCallback((id: string) => {
    setLeads((prev) => {
      const newLeads = prev.filter((l) => l.id !== id);
      saveLeads(newLeads);
      return newLeads;
    });
  }, []);

  const addFollowUp = useCallback((leadId: string, note: string) => {
    setLeads((prev) => {
      const newLeads = prev.map((l) => {
        if (l.id !== leadId) return l;
        const followUp: FollowUp = {
          id: crypto.randomUUID(),
          note,
          createdAt: new Date().toISOString().split("T")[0],
        };
        return { ...l, followUps: [...l.followUps, followUp] };
      });
      saveLeads(newLeads);
      return newLeads;
    });
  }, []);

  const updateLeadNotes = useCallback((id: string, notes: string) => {
    setLeads((prev) => {
      const newLeads = prev.map((l) => (l.id === id ? { ...l, notes } : l));
      saveLeads(newLeads);
      return newLeads;
    });
  }, []);

  return { leads, addLead, updateStatus, deleteLead, addFollowUp, updateLeadNotes };
}
