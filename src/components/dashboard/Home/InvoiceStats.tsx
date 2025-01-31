import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Users,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    icon: DollarSign,
    change: "+20.1%",
    trend: "up",
  },
  {
    title: "Active Customers",
    value: "2,350",
    icon: Users,
    change: "+10.5%",
    trend: "up",
  },
  {
    title: "Pending Invoices",
    value: "18",
    icon: FileText,
    change: "-5.3%",
    trend: "down",
  },
  {
    title: "Paid Invoices",
    value: "642",
    icon: FileText,
    change: "+12.7%",
    trend: "up",
  },
];

export function InvoiceStats() {
  return (
    <section className="grid grid-cols-1 md:grid-col-2 xl:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div className="bg-gray-50 border rounded-md" key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.trend === "up" ? (
                <ArrowUpRight className="inline h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="inline h-4 w-4 text-red-500" />
              )}
              {stat.change} from last month
            </p>
          </CardContent>
        </div>
      ))}
    </section>
  );
}
