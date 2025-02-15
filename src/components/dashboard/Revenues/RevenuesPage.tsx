"use client";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import api from "@/interceptors/api";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  _id: string;
  productName: string;
  company: string;
  salePrice: number;
  quantity: number;
}

export type RevenueType = {
  _id: string;
  total_cost: number;
  revenue: number;
  revenue_percentage: number;
  created_at: string;
  company_email: string;
  created_by_name: string;
  created_by_email: string;
  customer: Customer;
  products?: Product[];
};

import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarSearch,
  RotateCcw,
} from "lucide-react";
import Loader from "@/components/ui/Loader";
import toast from "react-hot-toast";
import { formatDateShort } from "@/lib/utils";
import RevenueOption from "./RevenuesOption/RevenuesOption";
import { Pagination } from "@/components/shared/pagination/Pagination";
import { Customer } from "@/types/invoice.type";
import { format } from "date-fns";
import { DateFilter } from "../Filter/DateFilter";
import { Modal } from "@/components/shared/Modal/Modal";
import CustomerDropdown from "@/components/shared/Dropdown/CustomerDropdown";
const breadcrumbList = [
  {
    name: "Products",
    link: "/dashboard/products",
  },
];

const RevenuesPage = () => {
  const [startDate, setStartDate] = useState<string | Date | undefined>();
  const [endDate, setEndDate] = useState<string | Date | undefined>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [duration, setDuration] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };
  const {
    data: revenuesData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [currentPage, limit, customer],
    queryFn: async () => {
      const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/revenues`, {
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
        return toast.error(res?.data?.message || "Something went wrong");
      }
      setTotalPages(res?.data?.data?.pagination?.totalPages);
      return res?.data?.data;
    },
  });

  const handleApplyDateFilter = async () => {
    refetch();
    setIsModalOpen(false);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setDuration("");
    setCustomer(null);
    setTimeout(() => {
      refetch();
    }, 0);
  };

  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />

      <section>
        <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                All Revenues
              </h2>

              <span className="px-3 py-1 text-xs text-blue-800 bg-blue-50 rounded-md dark:bg-gray-800 dark:text-blue-400">
                {revenuesData?.pagination?.countDocuments} Revenues
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Browse all the Revenues here.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex gap-4 flex-wrap">
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
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div>
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>
                      Amount <span className="text-[10px]">(BDT)</span>
                    </TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenuesData?.revenues?.map(
                    (revenue: RevenueType, index: number) => (
                      <TableRow key={revenue?._id}>
                        <TableCell className="font-medium">
                          {(currentPage - 1) * limit + (index + 1)}.
                        </TableCell>
                        <TableCell className="font-medium">
                          {revenue?.customer?.name}
                        </TableCell>
                        <TableCell>{revenue?.revenue}</TableCell>
                        <TableCell>
                          {" "}
                          {formatDateShort(revenue?.created_at)}
                        </TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center ${
                              revenue?.revenue_percentage >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {revenue?.revenue_percentage >= 0 ? (
                              <ArrowUpIcon className="mr-1 h-4 w-4" />
                            ) : (
                              <ArrowDownIcon className="mr-1 h-4 w-4" />
                            )}
                            {Math.abs(revenue?.revenue_percentage).toFixed(2)}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <RevenueOption
                            refetch={refetch}
                            revenueId={revenue?._id}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              limit={limit}
              onLimitChange={handleLimitChange}
            />
          </>
        )}
      </section>
    </>
  );
};

export default RevenuesPage;
