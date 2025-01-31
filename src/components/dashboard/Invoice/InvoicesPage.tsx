"use client";

import { useState } from "react";

import { Search } from "lucide-react";
import type { DateRange } from "react-day-picker";

import Select from "react-select";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/shared/DatePicker/DateRangePicker";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import InvoiceTable from "./InvoiceTable";
import { useQuery } from "@tanstack/react-query";
import api from "@/interceptors/api";
import InvoiceSummary from "./InvoiceSummary";
import ScreenLoader from "@/components/shared/Loader/ScreenLoader";

type CustomerOption = {
  value: string;
  label: string;
};

const customers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Bob Wilson" },
];

export default function InvoicesPage() {
  const [date, setDate] = useState<DateRange | undefined>();
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerOption | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/invoices`
      );
      console.log(result);
      return result?.data?.data;
    },
  });

  const customerOptions: CustomerOption[] = customers.map((customer) => ({
    value: customer.id,
    label: customer.name,
  }));

  const breadcrumbList = [
    {
      name: "Invoices",
      link: "/dashboard/invoices",
    },
  ];

  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <section>
          <div className="mb-4 lg:mb-8 bg-gray-50 border p-4 lg:p-6 rounded-md ">
            <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
            <p className="text-gray-500 mt-1">Manage and track your order</p>
          </div>
          <InvoiceSummary />

          <div className="mb-4 lg:mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Date Range
              </label>
              <DateRangePicker date={date} setDate={setDate} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Customer
              </label>
              <Select
                options={customerOptions}
                value={selectedCustomer}
                onChange={setSelectedCustomer}
                placeholder="Select customer"
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <InvoiceTable invoices={invoices} />
          </div>
        </section>
      )}
    </>
  );
}
