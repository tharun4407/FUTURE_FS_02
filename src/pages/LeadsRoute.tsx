import CrmLayout from "@/components/CrmLayout";
import LeadsPage from "@/pages/Leads";
import { useLeads } from "@/hooks/useLeads";

const LeadsRoute = () => {
  const { leads, updateStatus, deleteLead, addFollowUp, updateLeadNotes } = useLeads();
  return (
    <CrmLayout>
      <LeadsPage leads={leads} updateStatus={updateStatus} deleteLead={deleteLead} addFollowUp={addFollowUp} updateLeadNotes={updateLeadNotes} />
    </CrmLayout>
  );
};

export default LeadsRoute;
