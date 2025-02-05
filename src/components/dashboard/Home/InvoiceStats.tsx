import { DollarSign, Users, FileText } from "lucide-react";
import StatsCard from "./StatsCard";
import { getFormattedPrice } from "@/lib/utils";

type Props = {
  summary: {
    invoice_count: string;
    total_sell: number;
    total_payment: number;
    due_invoice_amount: number;
    due_invoice_count: number;
    transaction_count: number;
    customer_count: string;
  };
};

export function InvoiceStats({ summary }: Props) {
  return (
    <section className="grid grid-cols-1 md:grid-col-2 xl:grid-cols-4 gap-4 lg:gap-6">
      <StatsCard
        title="Total Invoice Created"
        Icon={FileText}
        value={summary?.invoice_count}
        comment={`Total sell is ${getFormattedPrice(summary?.total_sell)} BDT.`}
        trend="up"
      />
      <StatsCard
        title="Total Paid"
        Icon={DollarSign}
        value={`${getFormattedPrice(summary?.total_payment)}  BDT.`}
        comment={`${summary?.transaction_count} transactions so far`}
        trend="up"
      />
      <StatsCard
        title="Total Due"
        Icon={DollarSign}
        value={`${getFormattedPrice(summary?.due_invoice_amount)}  BDT.`}
        comment={`${summary?.due_invoice_count} invoice need to be cleared`}
        trend="up"
      />
      <StatsCard
        title="Total Customer"
        Icon={Users}
        value={summary?.customer_count}
        comment={`${getFormattedPrice(summary?.total_sell)} BDT. purchased so far`}
        trend="up"
      />
    </section>
  );
}
