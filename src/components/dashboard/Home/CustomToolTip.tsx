import { getFormattedPrice } from "@/lib/utils";
import { TooltipProps } from "recharts";

type Labels = { [key: string]: string };

type Formatter = (value: number) => string;

interface CustomTooltipProps extends TooltipProps<number, string> {
  formatter?: Formatter;
  labels: Labels;
  currency?: string;
}

export const CustomTooltip = ({
  payload,
  label,
  formatter = getFormattedPrice,
  labels,
}: CustomTooltipProps) => {
  if (payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip w-full p-2 bg-white border rounded-md">
        <p>
          <span className="font-medium">{labels["month"]}:</span> {label}
        </p>
        {Object.keys(labels).map((key) => {
          if (key !== "month" && typeof data[key] === "number") {
            const currency = labels[key]?.split(":")?.[1] || "";
            const label = labels[key]?.split(":")?.[0] || labels[key];
            return (
              <p key={key}>
                <span className="font-medium">{label}:</span>{" "}
                {formatter(data[key])}
                <span>&nbsp;{currency && currency}</span>
              </p>
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
};
