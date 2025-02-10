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
import { PaymentDataType } from "./CreateInvoicePage";
import { useState } from "react";

type Props = {
  closeModal: () => void;
  due_amount: number;
  paymentMethod: string;
  setPaymentData: React.Dispatch<React.SetStateAction<PaymentDataType>>;
  paymentData: PaymentDataType;
  setPaymentMethod: (method: string) => void;
};

const AddPayment = ({
  due_amount,
  closeModal,
  setPaymentData,
  paymentData,
  setPaymentMethod,
  paymentMethod,
}: Props) => {
  // Use state to store tempPaymentData
  const [tempPaymentData, setTempPaymentData] = useState<
    PaymentDataType & { payment_method: string }
  >({
    amount: paymentData.amount,
    payment_method: paymentMethod,
    payment_description: paymentData.payment_description,
  });

  const handleSubmit = async () => {
    const { amount, payment_method, payment_description } = tempPaymentData;

    if (
      amount === null ||
      amount === undefined ||
      amount <= 0 ||
      amount > due_amount
    ) {
      toast.error("Amount must be between 0 and the due amount.");
      return;
    }

    if (!payment_method) {
      toast.error("Please select a payment method.");
      return;
    }


    setPaymentData({
      amount,
      payment_description,
    });

    setPaymentMethod(payment_method);
    closeModal();

    toast.success("Payment Added!");
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="font-medium">Due Amount: </p>
        <p>{due_amount} BDT.</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-4 lg:space-y-6">
          <div className="space-y-1">
            <Label htmlFor="amount">Payment Amount</Label>
            <Input
              id="amount"
              value={tempPaymentData.amount ?? 0}
              name="amount"
              type="number"
              placeholder="Enter payment amount"
              onChange={(e) => {
                setTempPaymentData({
                  ...tempPaymentData,
                  amount: parseFloat(e.target.value) || 0,
                });
              }}
              required
            />
          </div>
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="method">Payment Method</Label>
          <Select
            value={tempPaymentData.payment_method}
            onValueChange={(value) => {
              setTempPaymentData({
                ...tempPaymentData,
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
          <Label htmlFor="payment_description">Payment Description</Label>
          <Textarea
            id="payment_description"
            name="payment_description"
            value={tempPaymentData.payment_description}
            aria-describedby="Payment Description"
            placeholder="Enter payment description"
            onChange={(e) => {
              setTempPaymentData({
                ...tempPaymentData,
                payment_description: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex justify-between">
          <Button type="button" onClick={handleSubmit} className="w-full">
            <Wallet /> Confirm Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPayment;
