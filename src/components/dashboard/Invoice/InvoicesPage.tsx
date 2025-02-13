"use client";

import { useState } from "react";

import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import InvoiceTable from "./InvoiceTable";
import { useQuery } from "@tanstack/react-query";
import api from "@/interceptors/api";
import InvoiceSummary from "./InvoiceSummary";
import ScreenLoader from "@/components/shared/Loader/ScreenLoader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/shared/pagination/Pagination";
import toast from "react-hot-toast";
import { Filter } from "../Home/Filter";
import { Customer } from "@/types/invoice.type";
import { format } from "date-fns";

export default function InvoicesPage() {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const [startDate, setStartDate] = useState<string | Date | undefined>();
  const [endDate, setEndDate] = useState<string | Date | undefined>();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [duration, setDuration] = useState<string>("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const {
    data: invoiceData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [currentPage, limit],
    queryFn: async () => {
      const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/invoices`, {
        params: {
          page: currentPage,
          limit: limit,
          start_date: startDate ? format(startDate, "yyyy-MM-dd") : "",
          end_date: endDate ? format(endDate, "yyyy-MM-dd") : "",
          customer_phone: customer ? customer.phone : "",
          duration: duration,
        },
      });
      if (!res?.data?.success) {
        return toast.error(res?.data?.data?.message || "Something went wrong");
      }
      setTotalPages(res?.data?.data?.pagination?.totalPages);
      return res?.data?.data;
    },
  });

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
          <div className="mb-4 lg:mb-8 bg-gray-50 border p-4 lg:p-6 rounded-md flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Invoices
              </h1>
              <p className="text-gray-500 mt-1 text-sm md:text-base">
                Manage and track your order
              </p>
            </div>
            <Link href="/dashboard/create-invoice">
              <Button size="sm">Create Invoice</Button>
            </Link>
          </div>
          <InvoiceSummary summary={invoiceData?.invoice_summary} />

          <Filter
            setCustomer={setCustomer}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            startDate={startDate}
            refetch={refetch}
            setDuration={setDuration}
            duration={duration}
            customer={customer}
          />

          <div className="overflow-x-auto">
            <InvoiceTable invoices={invoiceData?.invoices} refetch={refetch} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              limit={limit}
              onLimitChange={handleLimitChange}
            />
          </div>
        </section>
      )}
    </>
  );
}
