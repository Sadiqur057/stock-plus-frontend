"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import SectionHeader from "./SectionHeader";
import EmptyMessage from "./EmptyMessage";

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
                content={<ChartTooltipContent hideLabel />}
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
        </>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
}
