"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";

const data = [
  {
    name: "Jan",
    total: 3200,
  },
  {
    name: "Feb",
    total: 4000,
  },
  {
    name: "Mar",
    total: 2200,
  },
  {
    name: "Apr",
    total: 3000,
  },
  {
    name: "May",
    total: 3500,
  },
  {
    name: "Jun",
    total: 4800,
  },
  {
    name: "Jul",
    total: 2800,
  },
  {
    name: "Aug",
    total: 1900,
  },
  {
    name: "Sep",
    total: 3800,
  },
  {
    name: "Oct",
    total: 4100,
  },
  {
    name: "Nov",
    total: 2500,
  },
  {
    name: "Dec",
    total: 4900,
  },
];

export function Overview() {
  return (
    <>
      <div className="flex items-center justify-between p-4 lg:p-6 ">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Invoice Overview
          </h2>
          <p className="text-sm text-muted-foreground">June 20, 2023</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="text-xs h-8">
            Weekly
          </Button>
          <Button variant="outline" className="text-xs h-8">
            Monthly
          </Button>
          <Button variant="default" className="text-xs h-8">
            Yearly
          </Button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350} className="pr-2 pb-3">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}k`}
          />
          <Tooltip formatter={(value) => `${value} USD`} />
          <Bar
            dataKey="total"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
            barSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
