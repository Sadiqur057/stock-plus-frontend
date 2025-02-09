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
  customer_email: string;
  customer_name: string;
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
import { beautifyDate } from "@/lib/utils";
import RevenueOption from "./RevenuesOption/RevenuesOption";
import CustomerDropdown, {
  Customer,
} from "@/components/shared/Dropdown/CustomerDropdown";
import DateRange from "@/components/shared/DatePicker/DateRange";

const RevenuesPage = () => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [customer, setCustomer] = useState<Customer>({
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const breadcrumbList = [
    {
      name: "Products",
      link: "/dashboard/products",
    },
  ];
  console.log("customer", customer);
  const {
    data: revenues,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["revenues"],
    queryFn: async () => {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/revenues`
      );
      if (!result?.data?.success) {
        return toast.error(result?.data?.message || "Something went wrong");
      }
      return result?.data?.data;
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
                12 Revenues
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
            <CustomerDropdown setCustomer={setCustomer} label={false} />
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
                  {revenues?.map((revenue: RevenueType, index: number) => (
                    <TableRow key={revenue?._id}>
                      <TableCell className="font-medium">
                        {index + 1}.
                      </TableCell>
                      <TableCell className="font-medium">
                        {revenue?.customer_name}
                      </TableCell>
                      <TableCell>{revenue?.revenue}</TableCell>
                      <TableCell>
                        {" "}
                        {beautifyDate(revenue?.created_at)}
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
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page{" "}
                <span className="font-medium text-gray-700 dark:text-gray-100">
                  1 of 10
                </span>
              </div>

              <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                <a
                  href="#"
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:-scale-x-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>

                  <span>previous</span>
                </a>

                <a
                  href="#"
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <span>Next</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:-scale-x-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default RevenuesPage;
