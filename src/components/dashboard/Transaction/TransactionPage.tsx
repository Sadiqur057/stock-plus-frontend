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

export type TransactionType = {
  customer?: {
    name: string;
    email: string;
  };
  supplier?: {
    name: string;
    email: string;
  };
  payment_method: string;
  payment_description: string;
  _id: string;
  created_by_email: string;
  created_by_name: string;
  created_at: string;
  amount: number;
};

import { useQuery } from "@tanstack/react-query";
import { CloudDownload, FolderUp } from "lucide-react";
import Loader from "@/components/ui/Loader";
import toast from "react-hot-toast";
import TransactionOption from "./TransactionOption/TransactionOption";
import { formatDate } from "@/lib/utils";
import { Pagination } from "@/components/shared/pagination/Pagination";
const breadcrumbList = [
  {
    name: "Products",
    link: "/dashboard/products",
  },
];

const TransactionPage = () => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const totalItems = 1000;
  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const {
    data: transactions,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions`
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
                All Transactions
              </h2>

              <span className="px-3 py-1 text-xs text-blue-800 bg-blue-50 rounded-md dark:bg-gray-800 dark:text-blue-400">
                12 Transactions
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Browse all the Transactions here.
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
            {/* <Modal
              isOpen={isOpen}
              size="sm"
              onClose={() => setIsOpen(false)}
              title="Add New Transaction"
            >
              <AddTransaction
                refetch={refetch}
                closeModal={() => setIsOpen(false)}
              />
            </Modal> */}
          </div>
        </div>

        <div className="my-6 md:flex md:items-center md:justify-between">
          <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
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
                    <TableHead>Created By</TableHead>
                    <TableHead>Payment method</TableHead>
                    <TableHead>
                      Amount <span className="text-[10px]">(BDT)</span>
                    </TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions?.map(
                    (transaction: TransactionType, index: number) => (
                      <TableRow key={transaction._id}>
                        <TableCell className="font-medium">
                          {index + 1}.
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction?.created_by_name}
                        </TableCell>
                        <TableCell>{transaction?.payment_method}</TableCell>
                        <TableCell>{transaction?.amount}</TableCell>
                        <TableCell>
                          {formatDate(transaction?.created_at)}
                        </TableCell>
                        <TableCell>
                          <TransactionOption
                            refetch={refetch}
                            transactionId={transaction?._id}
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

export default TransactionPage;
