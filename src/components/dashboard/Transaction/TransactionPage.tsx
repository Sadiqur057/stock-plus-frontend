"use client";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import api from "@/interceptors/api";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type TransactionType = {
  customer: {
    name: string;
    email: string;
  };
  payment_method: string;
  payment_description: string;
  _id: string;
  added_by: string;
  user_name: string;
  created_at: string;
  amount: number;
};

import { useQuery } from "@tanstack/react-query";
import { CloudDownload, FolderUp } from "lucide-react";
import Loader from "@/components/ui/Loader";
import toast from "react-hot-toast";
import TransactionOption from "./TransactionOption/TransactionOption";
import { getFormattedDate } from "@/lib/utils";

const TransactionPage = () => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const breadcrumbList = [
    {
      name: "Products",
      link: "/dashboard/products",
    },
  ];

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
                    <TableHead>Payment By</TableHead>
                    <TableHead>Payment method</TableHead>
                    <TableHead>Amount</TableHead>
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
                          {transaction?.customer?.name}
                        </TableCell>
                        <TableCell>{transaction?.payment_method}</TableCell>
                        <TableCell>{transaction?.amount} BDT.</TableCell>
                        <TableCell>
                          {getFormattedDate(transaction?.created_at)}
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

export default TransactionPage;
