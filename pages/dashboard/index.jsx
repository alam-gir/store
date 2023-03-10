import AddProductForm from "@/components/AddProductForm";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="p-4">
        <AddProductForm />
      </div>
    </div>
  );
};

export default Dashboard;
