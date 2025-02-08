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
import { getReadableDate } from "@/lib/utils";

type Props = {
  revenues: Invoice[];
};

export default function RecentRevenue({ revenues }: Props) {
  return (
    <div className="w-full max-w-3xl">
      <SectionHeader
        buttonText="View All"
        header="Revenue Overview"
        text={`Hover on bar to get more details`}
        url="/dashboard/transactions"
      />
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
          {revenues.map((item) => (
            <TableRow key={item?._id}>
              <TableCell>{item?.customer?.name}</TableCell>
              <TableCell>{getReadableDate(item?.created_at)}</TableCell>
              <TableCell>{item?.cost_summary?.revenue}</TableCell>
              <TableCell>
                <div
                  className={`flex items-center ${
                    item?.cost_summary?.revenue_percentage >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item?.cost_summary?.revenue_percentage >= 0 ? (
                    <ArrowUpIcon className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="mr-1 h-4 w-4" />
                  )}
                  {Math.abs(item?.cost_summary?.revenue_percentage).toFixed(2)}%
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
