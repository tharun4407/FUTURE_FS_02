import CrmLayout from "@/components/CrmLayout";
import AddLeadPage from "@/pages/AddLead";
import { useLeads } from "@/hooks/useLeads";

const AddLeadRoute = () => {
  const { addLead } = useLeads();
  return (
    <CrmLayout>
      <AddLeadPage addLead={addLead} />
    </CrmLayout>
  );
};

export default AddLeadRoute;
