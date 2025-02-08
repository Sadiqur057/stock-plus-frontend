import { Label } from "@/components/ui/label";
import Select from "react-select";
import api from "@/interceptors/api";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
type OptionType = {
  value: string;
  label: string;
};
export type Customer = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

type Props = {
  setCustomer: (customer: Customer) => void;
  label?: boolean;
};
const CustomerDropdown = ({ setCustomer, label = true }: Props) => {
  const [customerOptions, setCustomerOptions] = useState<OptionType[]>([]);

  const { data: customerList } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/customers`
      );
      if (!result?.data?.success) {
        toast.error(result?.data?.message || "Something went wrong");
        return [];
      }
      const customers = result?.data?.data;
      if (customers && Array.isArray(customers)) {
        const formattedOptions = customers.map((customer: Customer) => ({
          value: customer._id,
          label: customer.name,
        }));

        setCustomerOptions(formattedOptions);
      }
      return result?.data?.data;
    },
  });

  const handleCustomerChange = (option: OptionType | null) => {
    if (!option) return;

    const selectedCustomer = customerList?.find(
      (cust: Customer) => cust._id === option.value
    );
    if (selectedCustomer) {
      setCustomer(selectedCustomer);
    }
  };
  return (
    <div className="flex flex-col gap-2.5 flex-1">
      {label && <Label htmlFor="customer-select">Customer</Label>}
      <Select
        id="customer-select"
        instanceId="customer-select"
        options={customerOptions}
        onChange={handleCustomerChange}
        placeholder="Select customer"
        className="react-select-container max-w-[280px] min-w-[200px] w-full"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default CustomerDropdown;
