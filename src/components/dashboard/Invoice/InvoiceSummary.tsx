import React from "react";

const InvoiceSummary = () => {
  const totalInvoices = 12;
  const totalAmount = 1200;
  const paidInvoices = 7;
  const pendingInvoices = 5;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 my-4 lg:my-8">
        <div className="space-y-2 p-4 border bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-500">Total Invoices</p>
          <p className="text-xl md:text-2xl font-semibold">{totalInvoices}</p>
        </div>

        <div className="space-y-2 p-4 border bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-500">Total Amount</p>
          <p className="text-xl md:text-2xl font-semibold">${totalAmount.toFixed(2)}</p>
        </div>

        <div className="space-y-2 p-4 border bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-500">Paid Invoices</p>
          <p className="text-xl md:text-2xl font-semibold text-green-600">{paidInvoices}</p>
        </div>

        <div className="space-y-2 p-4 border bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-500">Pending Invoices</p>
          <p className="text-xl md:text-2xl font-semibold text-yellow-600">
            {pendingInvoices}
          </p>
        </div>
      </div>
    </>
  );
};

export default InvoiceSummary;
