"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import SectionHeader from "./SectionHeader";
import EmptyMessage from "./EmptyMessage";
import { CustomTooltip } from "./CustomToolTip";
import { getCurrency } from "@/lib/utils";

const chartConfig = {
  total_invoice_amount: {
    label: "Total Invoice Amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type Data = {
  name: string;
  total_invoice_created: number;
  total_invoice_amount: number;
};

type Props = {
  chartData: Data[];
};

export function InvoiceOverview({ chartData }: Props) {
  const currency = getCurrency();
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
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <CustomTooltip
                    labels={{
                      month: "Month",
                      total_invoice_created: "Invoices Created",
                      total_invoice_amount: `Total Amount:${currency}`,
                    }}
                  />
                }
              />
              <Bar
                dataKey="total_invoice_amount"
                className="fill-blue-800"
                radius={8}
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      ) : (
        <EmptyMessage />
      )}
    </>
  );
}
