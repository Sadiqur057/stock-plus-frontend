import { getCurrency, getFormattedPrice } from "@/lib/utils";
import React from "react";

type Props = {
  summary: {
    invoice_count: number;
    total_invoice_amount: number;
    total_paid_amount: number;
    total_due_amount: number;
  };
};

const InvoiceSummary = ({ summary }: Props) => {
  const {
    invoice_count,
    total_invoice_amount,
    total_paid_amount,
    total_due_amount,
  } = summary || {};
  const currency = getCurrency();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 my-4">
        <div className="space-y-2 p-4 border bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-500">Total Invoices</p>
          <p className="text-xl md:text-2xl font-semibold">{invoice_count}</p>
        </div>

        <div className="space-y-2 p-4 border bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-500">Total Amount</p>
          <p className="text-xl md:text-2xl font-semibold">
            {currency} {getFormattedPrice(total_invoice_amount) || 0}
          </p>
        </div>

        <div className="space-y-2 p-4 border bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-500">Paid Amount</p>
          <p className="text-xl md:text-2xl font-semibold text-green-600">
            {currency} {total_paid_amount}
          </p>
        </div>

        <div className="space-y-2 p-4 border bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-500">Pending Amount</p>
          <p className="text-xl md:text-2xl font-semibold text-red-500">
            {currency} {total_due_amount}
          </p>
        </div>
      </div>
    </>
  );
};

export default InvoiceSummary;
