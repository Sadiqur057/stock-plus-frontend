"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  TooltipProps,  
} from "recharts";
import SectionHeader from "./SectionHeader";
import { getFormattedPrice } from "@/lib/utils";
import EmptyMessage from "./EmptyMessage";

type Data = {
  name: string;
  total_invoice_created: number;
  total_invoice_amount: number;
};

type Props = {
  chartData: Data[];
};

const CustomTooltip = ({
  payload,
  label,
}: TooltipProps<number, string>) => {  
  if (payload && payload.length > 0) {
    const { total_invoice_created, total_invoice_amount } = payload[0].payload;
    return (
      <div
        className="custom-tooltip"
        style={{
          padding: "10px",
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <p>
          <span className="font-medium">Month:</span> {label}
        </p>
        <p>
          <span className="font-medium">Invoice Created:</span> {total_invoice_created}
        </p>
        <p>
          <span className="font-medium">Total Amount:</span>{" "}
          {total_invoice_amount.toLocaleString()} BDT
        </p>
      </div>
    );
  }
  return null;
};

export function InvoiceOverview({ chartData }: Props) {
  return (
    <>
      <SectionHeader
        buttonText="View All"
        header="Invoice Overview"
        text={`Hover on bar to get more details`}
        url="/dashboard/invoices"
      />

      {chartData?.length ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value.slice(0,3)}`}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${getFormattedPrice(value)}`}
            />
            <RechartsTooltip content={CustomTooltip} />
            <Bar
              dataKey="total_invoice_amount"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <EmptyMessage />
      )}
    </>
  );
}
