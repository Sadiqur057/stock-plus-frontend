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

  console.log("trying to see the data", chartData);
  return (
    <div>
      <SectionHeader
        buttonText="View All"
        header="Revenue Overview"
        text={`Hover on bar to get more details`}
        url="/dashboard/transactions"
      />
      <div>
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
                      cost: "Total Cost:(BDT)",
                      revenue: "Total Revenue:(BDT)",
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
      </div>
    </div>
  );
}
