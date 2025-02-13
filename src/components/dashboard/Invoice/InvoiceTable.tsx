import React from "react";
import { format } from "date-fns";
import { Invoice } from "@/types/invoice.type";
import InvoiceOption from "./InvoiceOption/InvoiceOption";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
type InvoiceTableProps = {
  invoices: Invoice[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Invoice[], Error>>;
};
const InvoiceTable = ({ invoices, refetch }: InvoiceTableProps) => {
  return (
    <div className="rounded-md border min-w-max">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="border-b">
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
              #
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
              Invoice To
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
              Total <span className="text-[10px]">(BDT)</span>
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
              Due <span className="text-[10px]">(BDT)</span>
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
              Created At
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th className="py-4 px-6 text-right text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices?.map((invoice, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-4 px-6 text-sm text-gray-500">{index + 1}</td>
              <td className="py-4 px-6">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {invoice?.customer.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {invoice?.customer.email}
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">
                {invoice?.total_cost?.total}
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">
              {invoice?.total_cost?.total_due}
              </td>
              <td className="py-4 px-6 text-sm text-gray-500">
                {format(new Date(invoice?.created_at), "MMM dd, yyyy")}
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    invoice?.total_cost?.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {invoice?.total_cost?.status}
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <InvoiceOption
                  invoiceId={invoice?._id}
                  refetch={refetch}
                  due_amount={invoice?.total_cost?.total_due}
                />

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
