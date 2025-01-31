import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Invoice } from "@/types/invoice.type";
type InvoiceTableProps = {
  invoices: Invoice[];
};
const InvoiceTable = ({ invoices }: InvoiceTableProps) => {
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
              Total
            </th>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
              Due
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
                ${invoice?.cost_summary?.total.toFixed(2)}
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">
                ${invoice?.cost_summary?.total_due.toFixed(2)}
              </td>
              <td className="py-4 px-6 text-sm text-gray-500">
                {format(new Date(invoice?.created_at), "MMM dd, yyyy")}
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    invoice?.cost_summary?.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {invoice?.cost_summary?.status}
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex justify-end space-x-2">
                  <Link href={`/dashboard/invoices/${invoice?._id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
