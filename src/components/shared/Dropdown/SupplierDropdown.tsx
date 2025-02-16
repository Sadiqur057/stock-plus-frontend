import { Label } from "@/components/ui/label";
import Select from "react-select";
import api from "@/interceptors/api";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { Customer } from "@/types/invoice.type";

// Option and Supplier types
type OptionType = {
  value: string;
  label: string;
  phone?: string;
};

type Props = {
  setSupplier: React.Dispatch<React.SetStateAction<Customer | null>>;
  label?: boolean;
  supplier: Customer | null;
};

const SupplierDropdown = ({ setSupplier, label = true, supplier }: Props) => {
  const [supplierOptions, setSupplierOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch suppliers with optional search term
  const fetchSuppliers = async (search = "") => {
    setIsLoading(true);
    try {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/suppliers`,
        {
          params: { search },
        }
      );

      if (!result?.data?.success) {
        toast.error(result?.data?.message || "Something went wrong");
        return;
      }

      const suppliers = result?.data?.data?.suppliers;
      if (Array.isArray(suppliers)) {
        const formattedOptions = suppliers.map((supplier: Customer) => ({
          value: supplier._id,
          label: supplier.name,
          phone: supplier?.phone,
        }));
        setSupplierOptions(formattedOptions);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load suppliers");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial suppliers on component mount
  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Handle supplier selection
  const handleSupplierChange = (option: OptionType | null) => {
    if (!option) return;
    setSupplier({
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
        fetchSuppliers(inputValue);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col gap-2.5 min-w-[210px]">
      {label && <Label htmlFor="supplier-select">Supplier</Label>}
      <Select
        id="supplier-select"
        instanceId="supplier-select"
        options={supplierOptions}
        value={supplier ? { value: supplier._id, label: supplier.name } : null}
        onChange={handleSupplierChange}
        onInputChange={handleInputChange}
        placeholder={isLoading ? "Loading..." : "Select supplier"}
        className="react-select-container max-w-[280px] min-w-[200px] w-full"
        classNamePrefix="react-select"
        isLoading={isLoading}
      />
    </div>
  );
};

export default SupplierDropdown;
