import { useState, useCallback } from "react";
import { Lead, initialLeads, LeadStatus } from "@/data/leads";

const STORAGE_KEY = "gymkart-crm-leads";

function loadLeads(): Lead[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialLeads;
  } catch {
    return initialLeads;
  }
}

function saveLeads(leads: Lead[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(loadLeads);

  const addLead = useCallback((lead: Omit<Lead, "id" | "createdAt">) => {
    setLeads((prev) => {
      const newLeads = [
        { ...lead, id: crypto.randomUUID(), createdAt: new Date().toISOString().split("T")[0] },
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

  return { leads, addLead, updateStatus, deleteLead };
}
