import { Label } from "@/components/ui/label";
import Select from "react-select";
import api from "@/interceptors/api";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { Customer } from "@/types/invoice.type";

// Option and Customer types
type OptionType = {
  value: string;
  label: string;
  phone?: string;
};

type Props = {
  setCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  label?: boolean;
  customer: Customer | null;
};

const CustomerDropdown = ({ setCustomer, label = true, customer }: Props) => {
  const [customerOptions, setCustomerOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch customers with optional search term
  const fetchCustomers = async (search = "") => {
    setIsLoading(true);
    try {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/customers`,
        {
          params: { search },
        }
      );

      if (!result?.data?.success) {
        toast.error(result?.data?.message || "Something went wrong");
        return;
      }

      const customers = result?.data?.data;
      if (Array.isArray(customers)) {
        const formattedOptions = customers.map((customer: Customer) => ({
          value: customer._id,
          label: customer.name,
          phone: customer?.phone,
        }));
        setCustomerOptions(formattedOptions);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load customers");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle customer selection
  const handleCustomerChange = (option: OptionType | null) => {
    if (!option) return;
    setCustomer({
      _id: option.value,
      name: option.label,
      email: "",
      phone: option?.phone || "",
      address: "",
    });
  };

  // Handle input change with manual debounce (only on user input)
  const handleInputChange = (
    inputValue: string,
    { action }: { action: string }
  ) => {
    if (action === "input-change") {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(() => {
        fetchCustomers(inputValue);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col gap-2.5 min-w-[210px]">
      {label && <Label htmlFor="customer-select">Customer</Label>}
      <Select
        id="customer-select"
        instanceId="customer-select"
        options={customerOptions}
        value={customer ? { value: customer._id, label: customer.name } : null}
        onChange={handleCustomerChange}
        onInputChange={handleInputChange}
        placeholder={isLoading ? "Loading..." : "Select customer"}
        className="react-select-container max-w-[280px] min-w-[200px] w-full"
        classNamePrefix="react-select"
        isLoading={isLoading}
      />
    </div>
  );
};

export default CustomerDropdown;
