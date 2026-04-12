import CrmLayout from "@/components/CrmLayout";
import Dashboard from "@/pages/Dashboard";
import { useLeads } from "@/hooks/useLeads";

const Index = () => {
  const { leads } = useLeads();
  return (
    <CrmLayout>
      <Dashboard leads={leads} />
    </CrmLayout>
  );
};

export default Index;
