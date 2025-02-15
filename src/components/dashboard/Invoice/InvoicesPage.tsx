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
import { Customer } from "@/types/invoice.type";
import { format } from "date-fns";
import StatusFilter from "../Filter/StatusFilter";
import CustomerDropdown from "@/components/shared/Dropdown/CustomerDropdown";
import { DateFilter } from "../Filter/DateFilter";
import { Modal } from "@/components/shared/Modal/Modal";
import { CalendarSearch, RotateCcw } from "lucide-react";
import EmptyMessage from "../Home/EmptyMessage";

export default function InvoicesPage() {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const [startDate, setStartDate] = useState<string | Date | undefined>();
  const [endDate, setEndDate] = useState<string | Date | undefined>();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [duration, setDuration] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    queryKey: [currentPage, limit, selectedStatus, selectedStatus, customer],
    queryFn: async () => {
      const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/invoices`, {
        params: {
          page: currentPage,
          limit: limit,
          start_date: startDate ? format(startDate, "yyyy-MM-dd") : "",
          end_date: endDate ? format(endDate, "yyyy-MM-dd") : "",
          customer_phone: customer ? customer.phone : "",
          duration: duration,
          status: selectedStatus,
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

  const handleApplyDateFilter = async () => {
    refetch();
    setIsModalOpen(false);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setDuration("");
    setSelectedStatus("");
    setCustomer(null);
    setTimeout(() => {
      refetch();
    }, 0);
  };

  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />
      <div className="mb-4 bg-gray-50 border p-4 lg:p-6 rounded-md flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Invoices
          </h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Manage and track your sales
          </p>
        </div>
        <Link href="/dashboard/create-invoice">
          <Button size="sm">Create Invoice</Button>
        </Link>
      </div>
      <div className="flex gap-4 flex-wrap mb-4 justify-between">
        <div className="flex gap-4 flex-wrap">
          <StatusFilter
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <CustomerDropdown
            setCustomer={setCustomer}
            label={false}
            customer={customer}
          />
        </div>
        <div className="flex gap-4">
          <Button onClick={() => setIsModalOpen(true)}>
            <CalendarSearch />
            <span className="hidden md:block">Date </span>Filter
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Update Date Filter"
        >
          <DateFilter
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            startDate={startDate}
            setDuration={setDuration}
            duration={duration}
            handleSubmit={handleApplyDateFilter}
            handleReset={handleReset}
          />
        </Modal>
      </div>
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <section>
          {invoiceData?.invoices?.length > 0 ? (
            <>
              <InvoiceSummary summary={invoiceData?.invoice_summary} />
              <div className="overflow-x-auto">
                <InvoiceTable
                  invoices={invoiceData?.invoices}
                  refetch={refetch}
                  limit={limit}
                  currentPage={currentPage}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  limit={limit}
                  onLimitChange={handleLimitChange}
                />
              </div>
            </>
          ) : (
            <div className="py-20">
              <EmptyMessage />
            </div>
          )}
        </section>
      )}
    </>
  );
}
