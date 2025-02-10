import InventoryReport from "@/components/dashboard/Inventory/Report/InventoryReport";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return <InventoryReport id={id} />;
};

export default page;
