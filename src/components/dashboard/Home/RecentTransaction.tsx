import { Wallet } from "lucide-react";
import { getFormattedDate, getFormattedPrice } from "@/lib/utils";
import SectionHeader from "./SectionHeader";
import EmptyMessage from "./EmptyMessage";

interface Transaction {
  _id: string;
  customer: {
    name: string;
    email: string;
  };
  added_by: string;
  created_at: string;
  amount: number;
  payment_method: string;
  payment_description: string;
  user_name: string;
}

type Props = {
  transactions: Transaction[];
};
export function RecentTransactions({ transactions }: Props) {
  return (
    <>
      <SectionHeader
        buttonText="View All"
        header="Recent Transaction"
        text={`You got ${transactions?.length} Transaction this month.`}
        url="/dashboard/transactions"
      />

      {transactions?.length ? (
        <>
          <div className="space-y-8">
            {transactions?.slice(0, 5)?.map((transaction: Transaction) => (
              <div key={transaction?._id} className="flex items-center">
                <div className="flex items-center flex-1 gap-4">
                  <div className="h-9 w-9 rounded-full bg-emerald-600 flex items-center justify-center">
                    <Wallet className="text-white w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {transaction?.customer?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getFormattedDate(transaction?.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end flex-col">
                  <p className="px-2.5 py-0.5 rounded-full text-sm font-semibold text-end">
                    +{getFormattedPrice(transaction?.amount)} BDT
                  </p>
                  <p className="text-xs text-muted-foreground leading-none">
                    {transaction?.payment_method}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <EmptyMessage />
      )}
    </>
  );
}
