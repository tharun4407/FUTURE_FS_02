export type LeadStatus = "New" | "Contacted" | "Converted" | "Lost";
export type LeadSource = "Website" | "Referral" | "Social Media" | "Walk-in" | "Cold Call" | "Email";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  gymInterest: string;
  notes: string;
  createdAt: string;
}

export const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 98765 43210",
    source: "Website",
    status: "New",
    gymInterest: "Gold's Gym Koramangala",
    notes: "Interested in 6-month membership",
    createdAt: "2026-04-10",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.p@outlook.com",
    phone: "+91 87654 32109",
    source: "Referral",
    status: "Contacted",
    gymInterest: "Cult.fit Indiranagar",
    notes: "Looking for group fitness classes",
    createdAt: "2026-04-08",
  },
  {
    id: "3",
    name: "Arjun Reddy",
    email: "arjun.r@yahoo.com",
    phone: "+91 76543 21098",
    source: "Social Media",
    status: "Converted",
    gymInterest: "Anytime Fitness HSR",
    notes: "Signed up for annual plan",
    createdAt: "2026-04-05",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    email: "sneha.g@gmail.com",
    phone: "+91 65432 10987",
    source: "Walk-in",
    status: "New",
    gymInterest: "Fitness First Whitefield",
    notes: "Wants personal trainer",
    createdAt: "2026-04-11",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.s@hotmail.com",
    phone: "+91 54321 09876",
    source: "Cold Call",
    status: "Contacted",
    gymInterest: "PowerHouse Gym MG Road",
    notes: "Budget conscious, comparing prices",
    createdAt: "2026-04-09",
  },
  {
    id: "6",
    name: "Ananya Krishnan",
    email: "ananya.k@gmail.com",
    phone: "+91 43210 98765",
    source: "Email",
    status: "Lost",
    gymInterest: "Snap Fitness BTM",
    notes: "Found cheaper alternative",
    createdAt: "2026-04-03",
  },
  {
    id: "7",
    name: "Karthik Nair",
    email: "karthik.n@gmail.com",
    phone: "+91 32109 87654",
    source: "Website",
    status: "Contacted",
    gymInterest: "Gold's Gym Jayanagar",
    notes: "Interested in crossfit programs",
    createdAt: "2026-04-07",
  },
];
