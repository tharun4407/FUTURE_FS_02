import { ReactNode } from "react";
import CrmSidebar from "./CrmSidebar";

const CrmLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen">
    <CrmSidebar />
    <main className="ml-64 p-8">{children}</main>
  </div>
);

export default CrmLayout;
