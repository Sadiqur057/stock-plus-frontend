"use client";
import { CirclePlus, CloudDownload } from "lucide-react";

import { Button } from "@/components/ui/button";
import ScreenLoader from "@/components/shared/Loader/ScreenLoader";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";

import { useQuery } from "@tanstack/react-query";
import api from "@/interceptors/api";
import TransactionTable from "./TransactionTable";
import AccountingSummary from "./AccountingSummary";


const breadcrumbList = [
  {
    name: "Accounting",
    link: "/dashboard/accounting",
  },
];

export default function AccountingPage() {

  const { isLoading, data: transactionData } = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const result = await api.get("/accounting");
      console.log("checking result", result);
      return result?.data?.data;
    },
  });

  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />

      {isLoading ? (
        <ScreenLoader />
      ) : (
        <>
          <AccountingSummary summary={transactionData?.summary} />
          <div className="mt-8 lg:mt-12">
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
              <div>
                <div className="flex items-center gap-x-3">
                  <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                    All Transactions
                  </h2>

                  <span className="px-3 py-1 text-xs text-blue-800 bg-blue-50 rounded-md dark:bg-gray-800 dark:text-blue-400">
                    {transactionData?.transactions?.length} Transaction
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                  Browse all the transaction here.
                </p>
              </div>

              <div className="flex items-center mt-4 gap-x-3">
                <Button variant={"outline"} className="py-3">
                  <CloudDownload />
                  <span>Export</span>
                </Button>

                <Button className="py-3">
                  <CirclePlus />
                  <span>Add Expense</span>
                </Button>
              </div>
            </div>
            <TransactionTable transactions={transactionData?.transactions} />
          </div>
        </>
      )}
    </>
  );
}

// const transactions = [
//   {
//     date: "2023-06-01",
//     createdBy: "John Doe",
//     type: "in",
//     description: "Sales",
//     amount: 1500,
//   },
//   {
//     date: "2023-06-02",
//     createdBy: "Jane Smith",
//     type: "out",
//     description: "Purchase",
//     amount: 750,
//   },
//   {
//     date: "2023-06-03",
//     createdBy: "Alice Johnson",
//     type: "out",
//     description: "Expense",
//     amount: 250,
//   },
//   {
//     date: "2023-06-04",
//     createdBy: "Bob Wilson",
//     type: "in",
//     description: "Sales",
//     amount: 2000,
//   },
//   {
//     date: "2023-06-05",
//     createdBy: "Eva Brown",
//     type: "out",
//     description: "Purchase",
//     amount: 1000,
//   },
// ];
