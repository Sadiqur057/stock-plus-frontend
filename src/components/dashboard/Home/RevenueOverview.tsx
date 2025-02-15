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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";
import SectionHeader from "./SectionHeader";
import { CustomTooltip } from "./CustomToolTip";
import EmptyMessage from "./EmptyMessage";
import { getCurrency } from "@/lib/utils";

const chartConfig = {
  cost: {
    label: "cost",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type RevenueChartData = {
  month: string;
  cost: number;
  revenue: number;
};

type Props = {
  chartData: RevenueChartData[];
};

export function RevenueOverview({ chartData }: Props) {
  const currency = getCurrency();
  return (
    <div>
      <SectionHeader
        buttonText="View All"
        header="Revenue Overview"
        text={`Hover on bar to get more details`}
        url="/dashboard/revenues"
      />
      {chartData?.length ? (
        <ResponsiveContainer width="100%" height={350}>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
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
                      cost: `Total Cost:(${currency})`,
                      revenue: `Total Revenue:(${currency})`,
                    }}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="cost"
                stackId="a"
                className="fill-blue-800"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="revenue"
                stackId="a"
                className="fill-blue-800/60"
                radius={[4, 4, 0, 0]}
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
