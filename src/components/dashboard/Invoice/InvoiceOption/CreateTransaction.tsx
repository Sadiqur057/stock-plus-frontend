import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import api from "@/interceptors/api";
import { Wallet } from "lucide-react";
import { Invoice } from "@/types/invoice.type";
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
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";
import { getCurrency } from "@/lib/utils";

type Props = {
  closeModal: () => void;
  due_amount: number;
  invoiceId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Invoice[], Error>>;
};

type FormDataType = {
  amount: number | null;
  payment_description: string;
};

type PaymentShape = FormDataType & {
  payment_method: string;
};

const CreateTransaction = ({
  due_amount,
  refetch,
  closeModal,
  invoiceId,
}: Props) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    amount: null,
    payment_description: "",
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "amount") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value === "" ? null : parseFloat(value),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const { mutate } = useMutation({
    mutationFn: async (data: PaymentShape) => {
      try {
        setLoading(true);
        const result = await api.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/create-transaction/${invoiceId}`,
          { data }
        );

        if (!result.data.success) {
          return toast.error(result?.data?.message || "Something went wrong.");
        }
        toast.success(result?.data?.message);
        refetch();
      } catch (error) {
        toast.error("Something went wrong!");
        console.error(error);
      } finally {
        closeModal();
        setLoading(false);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData?.amount === null ||
      isNaN(formData?.amount) ||
      formData?.amount > due_amount ||
      formData?.amount <= 0
    ) {
      return toast.error("Please enter a valid amount.");
    } else if (!paymentMethod) {
      return toast.error("Please select payment method.");
    }
    const data = {
      ...formData,
      payment_method: paymentMethod,
    };
    mutate(data);
  };
const currency = getCurrency();
  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="font-medium">Due Amount: </p>
        <p>{due_amount} {currency}.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4 lg:space-y-6">
          <div className="space-y-1">
            <Label htmlFor="amount">Payment Amount</Label>
            <Input
              id="amount"
              value={formData?.amount ?? 0}
              name="amount"
              type="number"
              placeholder="Enter payment amount"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="method">Payment Method</Label>
          <Select onValueChange={(value) => setPaymentMethod(value)}>
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
            value={formData?.payment_description}
            placeholder="Enter payment description"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-between">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <ButtonLoader />
            ) : (
              <>
                <Wallet /> Confirm Payment
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTransaction;
