"use client";

import { useState } from "react";
import Select from "react-select";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/shared/DatePicker/DatePicker";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

const customerOptions = [
  { value: "new", label: "Add New Customer" },
  { value: "1", label: "John Doe" },
  { value: "2", label: "Jane Smith" },
];

const existingCustomers: { [key: string]: Customer } = {
  "1": {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
  },
  "2": {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "098-765-4321",
    address: "456 Elm St, Town, Country",
  },
};

type Props = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
};

type OptionType = {
  value: string;
  label: string;
};

export function CustomerSection({ date, setDate }: Props) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const handleCustomerChange = (option: OptionType | null) => {
    if (!option) return;
    if (option.value === "new") {
      setSelectedCustomer({
        id: "new",
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    } else {
      setSelectedCustomer(existingCustomers[option.value]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 justify-between">
        <div className="flex flex-col gap-2.5 flex-1">
          <Label htmlFor="customer-select" className="text-gray-600">
            Select Customer
          </Label>
          <Select
            id="customer-select"
            options={customerOptions}
            onChange={handleCustomerChange}
            placeholder="Select customer"
            className="react-select-container mt-1 max-w-[280px]"
            classNamePrefix="react-select"
          />
        </div>
        <div className="flex flex-col gap-3.5">
          <Label htmlFor="date-select" className="text-gray-600">
            Select Date
          </Label>
          <DatePicker date={date} setDate={setDate} />
        </div>
      </div>
      {selectedCustomer && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="customer-name" className="text-gray-600">
              Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="customer-name"
                placeholder="Customer Name"
                value={selectedCustomer.name}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    name: e.target.value,
                  })
                }
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer-email" className="text-gray-600">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="customer-email"
                type="email"
                placeholder="Email Address"
                value={selectedCustomer.email}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    email: e.target.value,
                  })
                }
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer-phone" className="text-gray-600">
              Phone
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="customer-phone"
                placeholder="Phone Number"
                value={selectedCustomer.phone}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    phone: e.target.value,
                  })
                }
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="customer-address" className="text-gray-600">
              Address
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="customer-address"
                placeholder="Address"
                value={selectedCustomer.address}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
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
