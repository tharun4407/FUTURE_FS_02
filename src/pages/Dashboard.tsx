import { Users, TrendingUp, Phone, CheckCircle, XCircle, Dumbbell, Target, Activity, Calendar } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line, CartesianGrid,
  AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  RadialBarChart, RadialBar, Legend,
} from "recharts";
import { Link } from "react-router-dom";
import DumbbellIcon from "@/components/DumbbellIcon";
import RegisteredUsers from "@/components/RegisteredUsers";
import type { Lead } from "@/data/leads";

interface DashboardProps {
  leads: Lead[];
}

// Mock data for gym-specific charts
const membershipTrend = [
  { month: "Jan", leads: 12, converted: 4 },
  { month: "Feb", leads: 18, converted: 7 },
  { month: "Mar", leads: 25, converted: 10 },
  { month: "Apr", leads: 30, converted: 14 },
  { month: "May", leads: 22, converted: 9 },
  { month: "Jun", leads: 35, converted: 16 },
];

const gymPopularity = [
  { gym: "Gold's Gym", members: 85 },
  { gym: "Cult.fit", members: 72 },
  { gym: "Anytime", members: 65 },
  { gym: "Fitness First", members: 55 },
  { gym: "PowerHouse", members: 45 },
];

const fitnessCategories = [
  { category: "Weight Training", value: 90 },
  { category: "Cardio", value: 75 },
  { category: "Yoga", value: 60 },
  { category: "CrossFit", value: 70 },
  { category: "Swimming", value: 45 },
  { category: "Zumba", value: 55 },
];

const revenueByPlan = [
  { name: "Monthly", value: 30, fill: "hsl(145, 100%, 45%)" },
  { name: "Quarterly", value: 25, fill: "hsl(200, 80%, 50%)" },
  { name: "Half-Yearly", value: 20, fill: "hsl(35, 100%, 55%)" },
  { name: "Annual", value: 25, fill: "hsl(280, 70%, 55%)" },
];

const tooltipStyle = {
  backgroundColor: "hsl(230,20%,14%)",
  border: "1px solid hsl(230,15%,22%)",
  borderRadius: 8,
  color: "#fff",
};

const Dashboard = ({ leads }: DashboardProps) => {
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const contacted = leads.filter((l) => l.status === "Contacted").length;
  const converted = leads.filter((l) => l.status === "Converted").length;
  const lost = leads.filter((l) => l.status === "Lost").length;
  const conversionRate = totalLeads ? Math.round((converted / totalLeads) * 100) : 0;

  const statCards = [
    { label: "Total Leads", value: totalLeads, icon: Users, color: "text-primary" },
    { label: "New", value: newLeads, icon: TrendingUp, color: "text-blue-400" },
    { label: "Contacted", value: contacted, icon: Phone, color: "text-amber-400" },
    { label: "Converted", value: converted, icon: CheckCircle, color: "text-emerald-400" },
    { label: "Lost", value: lost, icon: XCircle, color: "text-red-400" },
  ];

  const sourceCount: Record<string, number> = {};
  leads.forEach((l) => { sourceCount[l.source] = (sourceCount[l.source] || 0) + 1; });
  const sourceData = Object.entries(sourceCount).map(([name, value]) => ({ name, value }));

  const statusData = [
    { name: "New", value: newLeads, color: "hsl(210, 80%, 55%)" },
    { name: "Contacted", value: contacted, color: "hsl(35, 100%, 55%)" },
    { name: "Converted", value: converted, color: "hsl(145, 100%, 45%)" },
    { name: "Lost", value: lost, color: "hsl(0, 80%, 55%)" },
  ].filter((d) => d.value > 0);

  const axisTickStyle = { fill: "hsl(var(--muted-foreground))", fontSize: 11 };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <DumbbellIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your lead pipeline</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="glass-card neon-border p-5 hover-lift">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div className="text-3xl font-bold text-foreground">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Conversion Rate */}
      <div className="glass-card neon-border p-5 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Conversion Rate</span>
          <span className="text-sm font-bold text-primary">{conversionRate}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${conversionRate}%` }} />
        </div>
      </div>

      {/* Row 1: Source + Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass-card neon-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Leads by Source</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sourceData}>
              <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" fill="hsl(145,100%,45%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card neon-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Leads by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={4}>
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            {statusData.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                {s.name} ({s.value})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Membership Trend + Gym Popularity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass-card neon-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Membership Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={membershipTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230,15%,22%)" />
              <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="leads" stroke="hsl(200,80%,50%)" fill="hsl(200,80%,50%)" fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="converted" stroke="hsl(145,100%,45%)" fill="hsl(145,100%,45%)" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-6 justify-center mt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(200,80%,50%)" }} /> Leads
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(145,100%,45%)" }} /> Converted
            </div>
          </div>
        </div>

        <div className="glass-card neon-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Top Gyms by Leads</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={gymPopularity} layout="vertical">
              <XAxis type="number" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="gym" tick={axisTickStyle} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="members" fill="hsl(145,100%,45%)" radius={[0, 6, 6, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Fitness Categories Radar + Revenue by Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card neon-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Fitness Interest Breakdown</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={fitnessCategories} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="hsl(230,15%,25%)" />
              <PolarAngleAxis dataKey="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Radar dataKey="value" stroke="hsl(145,100%,45%)" fill="hsl(145,100%,45%)" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card neon-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Revenue by Plan Type</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={revenueByPlan} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {revenueByPlan.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="glass-card neon-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Leads</h3>
          <Link to="/leads" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Name</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Gym Interest</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Source</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-foreground">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{lead.gymInterest}</td>
                  <td className="py-3 px-4 text-muted-foreground">{lead.source}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium status-${lead.status.toLowerCase()}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{lead.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registered Users */}
      <RegisteredUsers />
    </div>
  );
};

export default Dashboard;
