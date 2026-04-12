import { Sun, Moon, Bell, Globe, Shield, Database } from "lucide-react";
import DumbbellIcon from "@/components/DumbbellIcon";
import { useTheme } from "@/hooks/useTheme";

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();

  const settingSections = [
    {
      title: "Appearance",
      icon: theme === "dark" ? Moon : Sun,
      items: [
        {
          label: "Theme",
          description: "Switch between light and dark mode",
          action: (
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/15 text-primary border border-primary/30 text-sm font-medium hover:bg-primary/25 transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            </button>
          ),
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          label: "Email Notifications",
          description: "Receive email alerts for new leads",
          action: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-foreground after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          ),
        },
        {
          label: "Push Notifications",
          description: "Get browser push notifications",
          action: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-foreground after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          ),
        },
      ],
    },
    {
      title: "General",
      icon: Globe,
      items: [
        {
          label: "Language",
          description: "Set your preferred language",
          action: (
            <select className="px-3 py-2 rounded-lg bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>English</option>
              <option>Hindi</option>
              <option>Kannada</option>
            </select>
          ),
        },
        {
          label: "Currency",
          description: "Set default currency for pricing",
          action: (
            <select className="px-3 py-2 rounded-lg bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>₹ INR</option>
              <option>$ USD</option>
            </select>
          ),
        },
      ],
    },
    {
      title: "Data & Privacy",
      icon: Shield,
      items: [
        {
          label: "Export Data",
          description: "Download all your leads as CSV",
          action: (
            <button className="px-4 py-2 rounded-lg bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
              Export
            </button>
          ),
        },
        {
          label: "Clear All Data",
          description: "Remove all leads from local storage",
          action: (
            <button
              onClick={() => {
                localStorage.removeItem("gymkart-crm-leads");
                window.location.reload();
              }}
              className="px-4 py-2 rounded-lg bg-destructive/15 text-destructive text-sm font-medium hover:bg-destructive/25 transition-colors border border-destructive/30"
            >
              Clear Data
            </button>
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <DumbbellIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your CRM preferences</p>
        </div>
      </div>

      <div className="space-y-6">
        {settingSections.map((section) => (
          <div key={section.title} className="glass-card neon-border p-6">
            <div className="flex items-center gap-2 mb-5">
              <section.icon className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
            </div>
            <div className="space-y-5">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-foreground">{item.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
                  </div>
                  {item.action}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
