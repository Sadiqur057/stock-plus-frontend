import type React from "react";
import { FileText, DollarSign, CreditCard, AlertCircle } from "lucide-react";
import { getCurrency, getFormattedPrice } from "@/lib/utils";
import { CardTitle } from "@/components/ui/card";

type TData = {
  invoice_count: number;
  total_invoice_amount: number;
  total_paid_amount: number;
  total_due_amount: number;
};

interface SummaryData {
  sales_invoice_summary: TData;
  purchase_invoice_summary: TData;
}

const SummarySection: React.FC<{
  title: string;
  data: TData;
}> = ({ title, data }) => {
  const metrics = [
    {
      label: "Invoices",
      value: data.invoice_count,
      icon: FileText,
      isCurrency: false,
    },
    {
      label: "Total Amount",
      value: data.total_invoice_amount,
      icon: DollarSign,
      isCurrency: true,
    },
    {
      label: "Paid Amount",
      value: data.total_paid_amount,
      icon: CreditCard,
      isCurrency: true,
    },
    {
      label: "Due Amount",
      value: data.total_due_amount,
      icon: AlertCircle,
      isCurrency: true,
    },
  ];
  const currency = getCurrency();
  return (
    <div className="bg-gray-50 rounded-md p-6 border">
      <CardTitle>{title}</CardTitle>
      <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 mt-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="flex items-center gap-4">
              <Icon className="w-5 h-5" />
              <div className="flex-1">
                <p className="text-gray-500 text-sm mb-0.5">{metric.label}</p>
                <p className="text-lg font-semibold">
                  {getFormattedPrice(metric?.value)}{" "}
                  {metric?.label !== "Invoices" ? `${currency}` : ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SalesPurchaseSummary: React.FC<{ summary: SummaryData }> = ({
  summary,
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-6">
      <SummarySection
        title="Sales Summary"
        data={summary.sales_invoice_summary}
      />
      <SummarySection
        title="Purchase Summary"
        data={summary.purchase_invoice_summary}
      />
    </div>
  );
};

export default SalesPurchaseSummary;
