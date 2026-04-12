import CrmLayout from "@/components/CrmLayout";
import LeadsPage from "@/pages/Leads";
import { useLeads } from "@/hooks/useLeads";

const LeadsRoute = () => {
  const { leads, updateStatus, deleteLead } = useLeads();
  return (
    <CrmLayout>
      <LeadsPage leads={leads} updateStatus={updateStatus} deleteLead={deleteLead} />
    </CrmLayout>
  );
};

export default LeadsRoute;
