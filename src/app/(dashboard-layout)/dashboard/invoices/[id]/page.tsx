import ViewInvoice from "@/components/dashboard/Invoice/ViewInvoice";
import React from "react";

type InvoicePageProps = {
  params: { id: string };
};
const page: React.FC<InvoicePageProps> = ({ params }) => {
  const { id } = params;
  console.log(id);
  return <ViewInvoice id={id} />;
};

export default page;
