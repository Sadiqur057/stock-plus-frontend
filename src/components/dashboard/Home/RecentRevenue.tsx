"use client";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SectionHeader from "./SectionHeader";
import { Invoice } from "@/types/invoice.type";
import { formatDate } from "@/lib/utils";
import EmptyMessage from "./EmptyMessage";

type Props = {
  revenues: Invoice[];
};

export default function RecentRevenue({ revenues }: Props) {
  return (
    <div className="w-full max-w-3xl">
      <SectionHeader
        buttonText="View All"
        header="Recent Revenues"
        text={`All the revenue generated from invoices`}
        url="/dashboard/revenues"
      />

      {revenues?.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>
                Amount <span className="text-[10px]">(BDT)</span>
              </TableHead>
              <TableHead>Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenues?.slice(0, 5)?.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.customer?.name}</TableCell>
                <TableCell>{formatDate(item?.created_at)}</TableCell>
                <TableCell>{item?.total_cost?.revenue}</TableCell>
                <TableCell>
                  <div
                    className={`flex items-center ${
                      item?.total_cost?.revenue_percentage >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item?.total_cost?.revenue_percentage >= 0 ? (
                      <ArrowUpIcon className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="mr-1 h-4 w-4" />
                    )}
                    {Math.abs(item?.total_cost?.revenue_percentage).toFixed(
                      2
                    )}
                    %
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
}
