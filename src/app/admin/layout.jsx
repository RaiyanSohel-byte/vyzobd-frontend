import AdminSidebar from "@/components/shared/AdminSidebar";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminSidebar />
      {children}
    </div>
  );
};

export default AdminLayout;
