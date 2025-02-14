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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CustomTooltip } from "../Home/CustomToolTip";
import EmptyMessage from "../Home/EmptyMessage";

const chartConfig = {
  expense: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  sales: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type TProps = {
  chartData: {
    name: string;
    sales: number;
    expense: number;
  }[];
};

export function AccountingChart({ chartData }: TProps) {
  return (
    <div className="border rounded-md p-6 overflow-auto custom-scrollbar">
      <div className="p-0 mb-4 lg:mb-6 flex gap-3 items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Accounting Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            Hover on bar to get more details
          </p>
        </div>
        <div className="flex gap-4">
          <Link href={"/dashboard/inventory/reports"}>
            <Button variant="outline" size="sm" className="text-xs h-8">
              Purchase Details
            </Button>
          </Link>
          <Link href={"/dashboard/invoices"}>
            <Button variant="default" size="sm" className="text-xs h-8">
              Sales Details
            </Button>
          </Link>
        </div>
      </div>
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
                      sales: "Sales:BDT",
                      expense: "Expense:BDT",
                    }}
                  />
                }
              />
              <Bar dataKey="expense" className="fill-[#2563ea]" radius={4} />
              <Bar
                dataKey="sales"
                className="fill-[#5fa9f8]"
                fill="var(--color-sales)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
}
