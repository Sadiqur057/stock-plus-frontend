import {  Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  icon: JSX.Element;
  name: string;
  date: string;
  amount: number;
}

const transactions: Transaction[] = [
  {
    icon: <Wallet className="h-4 w-4 text-white" />,
    name: "Salary Payment",
    date: "20 Sep, 2022",
    amount: -62.45,
  },
  {
    icon: <Wallet className="h-4 w-4 text-white" />,
    name: "Online Product",
    date: "28 Mar, 2022",
    amount: 45.84,
  },
  {
    icon: <Wallet className="h-4 w-4 text-white" />,
    name: "Maintenance",
    date: "18 Sep, 2022",
    amount: 25.52,
  },
  {
    icon: <Wallet className="h-4 w-4 text-white" />,
    name: "Bus Booking",
    date: "30 Nov, 2022",
    amount: -84.45,
  },
  {
    icon: <Wallet className="h-4 w-4 text-white" />,
    name: "Flight Booking",
    date: "12 Feb, 2022",
    amount: 53.23,
  },
  {
    icon: <Wallet className="h-4 w-4 text-white" />,
    name: "Bus Booking",
    date: "30 Nov, 2022",
    amount: -84.45,
  },
];

export function RecentTransactions() {
  return (
    <>
      <div className="mb-4 lg:mb-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Recent Transaction
        </h2>
        <p className="text-sm text-muted-foreground mb-4 lg:mb-6">
          You got 290 Transaction this month.
        </p>
      </div>
      <div className="space-y-8">
        {transactions.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="flex items-center flex-1">
              <div className="h-9 w-9 rounded-full bg-emerald-600 flex items-center justify-center mr-4">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-medium leading-none">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </div>
            </div>
            <div
              className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                item.amount > 0
                  ? "bg-purple-100 text-purple-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              {item.amount > 0 ? "+" : ""}
              {item.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
