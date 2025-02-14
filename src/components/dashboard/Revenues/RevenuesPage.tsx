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
  CloudDownload,
  FolderUp,
  Search,
} from "lucide-react";
import Loader from "@/components/ui/Loader";
import toast from "react-hot-toast";
import { formatDateShort } from "@/lib/utils";
import RevenueOption from "./RevenuesOption/RevenuesOption";
import DateRange from "@/components/shared/DatePicker/DateRange";
import { Pagination } from "@/components/shared/pagination/Pagination";
import { Customer } from "@/types/invoice.type";
const breadcrumbList = [
  {
    name: "Products",
    link: "/dashboard/products",
  },
];

const RevenuesPage = () => {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

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
    queryKey: [currentPage, limit],
    queryFn: async () => {
      const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/revenues`, {
        params: {
          page: currentPage,
          limit: limit,
        },
      });
      if (!res?.data?.success) {
        return toast.error(res?.data?.message || "Something went wrong");
      }
      setTotalPages(res?.data?.data?.pagination?.totalPages);
      return res?.data?.data;
    },
  });

  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />

      <section>
        <div className="sm:flex sm:items-center sm:justify-between">
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

          <div className="flex items-center mt-4 gap-x-3">
            <Button variant={"outline"} className="py-3">
              <CloudDownload />
              <span>Import</span>
            </Button>

            <Button className="py-3">
              <FolderUp />
              <span>Export</span>
            </Button>
          </div>
        </div>

        <div className="my-6 md:flex md:items-center md:justify-between flex-wrap gap-4">
          <div className="flex gap-4 items-center flex-wrap">
            <DateRange
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </div>
          <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
              <Search className="text-muted-foreground ml-3" size="16" />
            </span>

            <input type="text" placeholder="Search" className="searchBox" />
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
                          {index + 1}.
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
