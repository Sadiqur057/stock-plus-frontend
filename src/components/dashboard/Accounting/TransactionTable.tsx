import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateShort, getCurrency } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Transaction = {
  created_at: string;
  created_by_name: string;
  transaction_desc: string;
  transaction_type: string;
  amount: number;
  invoice_id: string;
};

type Props = {
  transactions: Transaction[];
};

const TransactionTable = ({ transactions }: Props) => {
  return (
    <Table className="border mb-8">
      <TableHeader>
        <TableRow>
          <TableHead>Created by</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>
            Amount
            <span className="text-[10px] text-muted-foreground">
              ({getCurrency()})
            </span>
          </TableHead>
          <TableHead>Type</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell>{transaction?.created_by_name}</TableCell>
            <TableCell>{formatDateShort(transaction?.created_at)}</TableCell>

            <TableCell>{transaction?.amount}</TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  transaction?.transaction_desc === "sales"
                    ? "bg-green-100 text-green-700"
                    : transaction?.transaction_desc === "purchase"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {transaction?.transaction_desc}
              </span>
            </TableCell>
            <TableCell>
              {transaction?.invoice_id && (
                <Link
                  href={`/dashboard/${
                    transaction?.transaction_desc === "purchases"
                      ? "inventory/reports/"
                      : "invoices/"
                  }/${transaction?.invoice_id}`}
                >
                  <Button variant="outline" size="sm">
                    view
                  </Button>
                </Link>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
