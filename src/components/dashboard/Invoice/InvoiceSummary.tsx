import { getFormattedPrice } from "@/lib/utils";
import React from "react";

type Props = {
  summary: {
    invoice_count: number;
    total_invoice_amount: number;
    paid_invoice_count: number;
    due_invoice_count: number;
  };
};

const InvoiceSummary = ({ summary }: Props) => {
  const {
    invoice_count,
    total_invoice_amount,
    paid_invoice_count,
    due_invoice_count,
  } = summary || {};
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 my-4 lg:my-8">
        <div className="space-y-2 p-4 border bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-500">Total Invoices</p>
          <p className="text-xl md:text-2xl font-semibold">{invoice_count}</p>
        </div>

        <div className="space-y-2 p-4 border bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-500">Total Amount</p>
          <p className="text-xl md:text-2xl font-semibold">
            BDT. {getFormattedPrice(total_invoice_amount) || 0}
          </p>
        </div>

        <div className="space-y-2 p-4 border bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-500">Paid Invoices</p>
          <p className="text-xl md:text-2xl font-semibold text-green-600">
            {paid_invoice_count}
          </p>
        </div>

        <div className="space-y-2 p-4 border bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-500">Pending Invoices</p>
          <p className="text-xl md:text-2xl font-semibold text-yellow-600">
            {due_invoice_count}
          </p>
        </div>
      </div>
    </>
  );
};

export default InvoiceSummary;
