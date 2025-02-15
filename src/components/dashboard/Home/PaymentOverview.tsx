"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
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
  paid_amount: {
    label: "Paid",
    color: "hsl(var(--chart-1))",
  },
  due_amount: {
    label: "Due",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type Data = {
  month: string;
  paid_amount: number;
  due_amount: number;
};

type Props = {
  chartData: Data[];
};

export function PaymentOverview({ chartData }: Props) {
  const currency = getCurrency();
  return (
    <div className="flex flex-col justify-between h-full">
      <SectionHeader
        buttonText="View All"
        header="Payment overview"
        text={`Hover on dot to get more details`}
        url="/dashboard/transactions"
      />
      {chartData?.length ? (
        <>
          <ResponsiveContainer width="100%" height={350}>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <CustomTooltip
                      labels={{
                        month: "Month",
                        paid_amount: `Paid:${currency}`,
                        due_amount: `Due:${currency}`,
                      }}
                    />
                  }
                />

                <Line
                  dataKey="paid_amount"
                  type="natural"
                  stroke="#16826b"
                  strokeWidth={2}
                  dot={{
                    fill: "#16826b",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
                <Line
                  dataKey="due_amount"
                  type="natural"
                  stroke="#f95825"
                  strokeWidth={2}
                  dot={{
                    fill: "#f95825",
                  }}
                />
              </LineChart>
            </ChartContainer>
          </ResponsiveContainer>
        </>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
}
