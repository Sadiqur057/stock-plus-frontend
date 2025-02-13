import React from "react";
import { format } from "date-fns";
import { Invoice } from "@/types/invoice.type";
import InvoiceOption from "./InvoiceOption/InvoiceOption";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
type InvoiceTableProps = {
  invoices: Invoice[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Invoice[], Error>>;
};
const InvoiceTable = ({ invoices, refetch }: InvoiceTableProps) => {
  return (
    <div className="min-w-max">
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Invoice To</TableHead>
            <TableHead>
              Total <span className="text-[10px]">(BDT)</span>
            </TableHead>
            <TableHead>
              Due <span className="text-[10px]">(BDT)</span>
            </TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <th className="py-4 px-6 text-right text-sm font-semibold text-gray-900">
              Actions
            </th>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices?.map((invoice, index) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <p className="text-sm font-medium text-gray-900">
                  {invoice?.customer.name}
                </p>
                <p className="text-sm text-gray-500">
                  {invoice?.customer.email}
                </p>
              </TableCell>
              <TableCell>{invoice?.total_cost?.total}</TableCell>
              <TableCell>{invoice?.total_cost?.total_due}</TableCell>
              <TableCell>
                {format(new Date(invoice?.created_at), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    invoice?.total_cost?.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {invoice?.total_cost?.status}
                </span>
              </TableCell>
              <TableCell>
                <InvoiceOption
                  invoiceId={invoice?._id}
                  refetch={refetch}
                  due_amount={invoice?.total_cost?.total_due}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceTable;
