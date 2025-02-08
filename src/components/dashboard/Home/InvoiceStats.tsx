import { CircleDollarSign, FileText, HandCoins, Wallet } from "lucide-react";
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
    total_revenue_amount: number;
  };
};

export function InvoiceStats({ summary }: Props) {
  return (
    <section className="grid grid-cols-1 md:grid-col-2 xl:grid-cols-4 gap-4 lg:gap-6">
      <StatsCard
        title="Total Invoice Created"
        Icon={FileText}
        value={summary?.invoice_count || "0"}
        comment={`Total sell is ${
          getFormattedPrice(summary?.total_sell) || 0
        } BDT.`}
        trend="up"
      />
      <StatsCard
        title="Total Paid"
        Icon={HandCoins}
        value={`${getFormattedPrice(summary?.total_payment) || 0}  BDT.`}
        comment={`${summary?.transaction_count} transactions so far`}
        trend="up"
      />
      <StatsCard
        title="Total Due"
        Icon={CircleDollarSign}
        value={`${getFormattedPrice(summary?.due_invoice_amount) || 0}  BDT.`}
        comment={`${summary?.due_invoice_count} invoice need to be cleared`}
        trend="up"
      />
      <StatsCard
        title="Total Revenue"
        Icon={Wallet}
        value={`${getFormattedPrice(summary?.total_revenue_amount) || 0}  BDT.`}
        comment={`From ${summary?.invoice_count || 0} invoices`}
        trend="up"
      />
      {/* <StatsCard
        title="Total Customer"
        Icon={Users}
        value={summary?.customer_count}
        comment={`${
          getFormattedPrice(summary?.total_sell) || 0
        } BDT. purchased so far`}
        trend="up"
      /> */}
    </section>
  );
}
