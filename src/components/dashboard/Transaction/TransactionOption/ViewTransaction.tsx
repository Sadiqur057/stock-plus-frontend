import { Separator } from "@/components/ui/separator";
import { Clock, CreditCard, User, Mail, DollarSign } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { TransactionType } from "../TransactionPage";
import { formatDate } from "@/lib/utils";
type TransactionProps = {
  transactionData: TransactionType;
  isLoading: boolean;
};
const ViewTransaction = ({ transactionData, isLoading }: TransactionProps) => {
  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <h4 className="text-xl font-semibold">Transaction Details</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {formatDate(transactionData?.created_at)}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Customer Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span>{transactionData?.customer?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span>{transactionData?.customer?.email}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Created By
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span>{transactionData?.created_by_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span>{transactionData?.created_by_email}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Payment Details
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-600" />
                  <span className="capitalize">
                    {transactionData?.payment_method}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-600" />
                  <span className="font-semibold">
                    {transactionData?.amount} BDT.
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Description
              </h3>
              <p className="text-sm">{transactionData?.payment_description}</p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="text-xs text-muted-foreground">
          Transaction ID: {transactionData?._id}
        </div>
      </div>
    </>
  );
};

export default ViewTransaction;
