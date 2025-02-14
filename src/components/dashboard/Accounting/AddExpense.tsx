import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Wallet } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import api from "@/interceptors/api";
import { useMutation } from "@tanstack/react-query";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";

type Props = {
  closeModal: () => void;
};

type TTransaction = {
  payment_method: string;
  payment_description: string;
  transaction_desc: string;
  transaction_type: string;
  created_at: Date;
  amount: number;
};

const AddExpense = ({ closeModal }: Props) => {
  const [loading, setLoading] = useState(false);
  const [transactionData, setTransactionData] = useState<TTransaction>({
    payment_method: "",
    amount: 0,
    payment_description: "",
    transaction_desc: "other",
    transaction_type: "out",
    created_at: new Date(),
  });

  const { mutate } = useMutation({
    mutationFn: async (data: TTransaction) => {
      try {
        setLoading(true);
        const result = await api.post(`/add-transaction`, data);
        console.log("checking result", result);
        if (!result.data.success) {
          return toast.error(result?.data?.message || "Something went wrong.");
        }
        toast.success(result?.data?.message);
        closeModal();
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSubmit = async () => {
    if (!transactionData?.payment_method) {
      toast.error("Please select a payment method.");
      return;
    }
    console.log(transactionData);
    mutate(transactionData);
  };

  return (
    <div>
      <div className="space-y-4">
        <div className="space-y-4 lg:space-y-6">
          <div className="space-y-1">
            <Label htmlFor="amount">Transaction Amount</Label>
            <Input
              id="amount"
              value={transactionData.amount ?? 0}
              name="amount"
              type="number"
              placeholder="Enter transaction amount"
              onChange={(e) => {
                setTransactionData({
                  ...transactionData,
                  amount: parseFloat(e.target.value) || 0,
                });
              }}
              required
            />
          </div>
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="method">Transaction Method</Label>
          <Select
            value={transactionData.payment_method}
            onValueChange={(value) => {
              setTransactionData({
                ...transactionData,
                payment_method: value,
              });
            }}
          >
            <SelectTrigger className="!py-5 w-full">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Payment Method</SelectLabel>
                <SelectItem value="Cash Payment">Cash</SelectItem>
                <SelectItem value="Online Payment">Online Payment</SelectItem>
                <SelectItem value="Cheque Payment">Cheque</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="transaction_description">
            Transaction Description
          </Label>
          <Textarea
            id="transaction_description"
            name="transaction_description"
            value={transactionData.payment_description}
            aria-describedby="Transaction Description"
            placeholder="Enter transaction description"
            onChange={(e) => {
              setTransactionData({
                ...transactionData,
                payment_description: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <ButtonLoader />
            ) : (
              <>
                <Wallet /> Confirm
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
