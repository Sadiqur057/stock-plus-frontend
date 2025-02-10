"use client";

import Select from "react-select";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/shared/DatePicker/DatePicker";
import { useQuery } from "@tanstack/react-query";
import api from "@/interceptors/api";
import toast from "react-hot-toast";
import { useState } from "react";

type Supplier = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

type Props = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  setSupplier: (supplier: Supplier) => void;
  supplier: Supplier;
};

type OptionType = {
  value: string;
  label: string;
};

export function SupplierSection({
  supplier,
  setSupplier,
  date,
  setDate,
}: Props) {
  const [supplierOptions, setSupplierOptions] = useState<OptionType[]>([]);

  const { data: supplierList } = useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/suppliers`
      );
      if (!result?.data?.success) {
        toast.error(result?.data?.message || "Something went wrong");
        return [];
      }
      const suppliers = result?.data?.data;
      if (suppliers && Array.isArray(suppliers)) {
        const formattedOptions = suppliers.map((supplier: Supplier) => ({
          value: supplier._id,
          label: supplier.name,
        }));

        setSupplierOptions([
          { value: "new", label: "New Supplier" },
          ...formattedOptions,
        ]);
      }
      return result?.data?.data;
    },
  });

  const handleSupplierChange = (option: OptionType | null) => {
    if (!option) return;

    if (option.value === "new") {
      setSupplier({
        _id: new Date().toLocaleString(),
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    } else {
      const selectedSupplier = supplierList?.find(
        (cust: Supplier) => cust._id === option.value
      );
      if (selectedSupplier) {
        setSupplier(selectedSupplier);
      }
    }
  };

  return (
    <div className="space-y-6 my-6 lg:my-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col gap-2.5 flex-1">
          <Label htmlFor="supplier-select" className="text-gray-600">
            Select Supplier
          </Label>
          <Select
            id="supplier-select"
            instanceId="supplier-select"
            options={supplierOptions}
            onChange={handleSupplierChange}
            placeholder="Select supplier"
            className="react-select-container mt-1 max-w-[280px]"
            classNamePrefix="react-select"
          />
        </div>
        <div className="flex flex-col gap-3.5 max-w-[50%]">
          <Label htmlFor="date-select" className="text-gray-600">
            Select Date
          </Label>
          <DatePicker date={date} setDate={setDate} />
        </div>
      </div>
      {supplier && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="supplier-name" className="text-gray-600">
              Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="supplier-name"
                placeholder="Supplier Name"
                value={supplier.name}
                onChange={(e) =>
                  setSupplier({
                    ...supplier,
                    name: e.target.value,
                  })
                }
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="supplier-email" className="text-gray-600">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="supplier-email"
                type="email"
                placeholder="Email Address"
                value={supplier.email}
                onChange={(e) =>
                  setSupplier({
                    ...supplier,
                    email: e.target.value,
                  })
                }
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="supplier-phone" className="text-gray-600">
              Phone
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="supplier-phone"
                placeholder="Phone Number"
                value={supplier.phone}
                onChange={(e) =>
                  setSupplier({
                    ...supplier,
                    phone: e.target.value,
                  })
                }
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="supplier-address" className="text-gray-600">
              Address
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="supplier-address"
                placeholder="Address"
                value={supplier.address}
                onChange={(e) =>
                  setSupplier({
                    ...supplier,
                    address: e.target.value,
                  })
                }
                className="pl-10"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
