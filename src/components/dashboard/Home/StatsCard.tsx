import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  Icon: React.ElementType;
  trend: string;
  value: string;
  comment: string;
};

const StatsCard = ({ title, Icon, trend, value, comment }: Props) => {
  return (
    <div className="bg-gray-50 border rounded-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-sm text-muted-foreground mt-1">
          {trend === "up" ? (
            <ArrowUpRight className="inline h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="inline h-4 w-4 text-red-500" />
          )}
          {comment}
        </p>
      </CardContent>
    </div>
  );
};

export default StatsCard;
