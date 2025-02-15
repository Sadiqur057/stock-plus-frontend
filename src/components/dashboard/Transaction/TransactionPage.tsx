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
import { useQuery } from "@tanstack/react-query";
import { CalendarSearch, FolderUp, RotateCcw } from "lucide-react";
import Loader from "@/components/ui/Loader";
import toast from "react-hot-toast";
import TransactionOption from "./TransactionOption/TransactionOption";
import { formatDateShort, getCurrency } from "@/lib/utils";
import { Pagination } from "@/components/shared/pagination/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Modal } from "@/components/shared/Modal/Modal";
import { DateFilter } from "../Filter/DateFilter";
import { format } from "date-fns";
import EmptyMessage from "../Home/EmptyMessage";

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
  transaction_desc: string;
  _id: string;
  created_by_email: string;
  created_by_name: string;
  invoice_id: string;
  created_at: string;
  amount: number;
  transaction_type: string;
};

const paymentMethods = [
  { label: "All", value: "all" },
  { label: "Cash Payment", value: "Cash Payment" },
  { label: "Online Payment", value: "Online Payment" },
  { label: "Cheque Payment", value: "Cheque Payment" },
];

const paymentTypes = [
  { label: "All", value: "all" },
  { label: "sales", value: "sales" },
  { label: "Purchases", value: "purchases" },
  { label: "other", value: "other" },
];

const breadcrumbList = [
  {
    name: "Products",
    link: "/dashboard/products",
  },
];

const TransactionPage = () => {
  const [startDate, setStartDate] = useState<string | Date | undefined>();
  const [endDate, setEndDate] = useState<string | Date | undefined>();
  const [duration, setDuration] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    data: transactionData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [currentPage, limit, paymentMethod, paymentType],
    queryFn: async () => {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
        {
          params: {
            limit: limit,
            page: currentPage,
            payment_method: paymentMethod,
            payment_type: paymentType,
            start_date: startDate ? format(startDate, "yyyy-MM-dd") : "",
            end_date: endDate ? format(endDate, "yyyy-MM-dd") : "",
            duration: duration,
          },
        }
      );
      if (!result?.data?.success) {
        return toast.error(result?.data?.message || "Something went wrong");
      }
      setTotalPages(result?.data?.data?.pagination?.totalPages);
      return result?.data?.data;
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
    setPaymentMethod("");
    setPaymentType("");
    setTimeout(() => {
      refetch();
    }, 0);
  };
  const currency = getCurrency();
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
                {transactionData?.pagination?.totalDocuments} Transactions
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Browse all the Transactions here.
            </p>
          </div>

          <div className="flex items-center mt-4 gap-x-3">
            <Button className="py-3">
              <FolderUp />
              <span>Export</span>
            </Button>
          </div>
        </div>

        <div className="my-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <div className="xl:w-[210px]">
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="py-[21px] min-w-[160px] xl:w-[210px]">
                  <SelectValue placeholder="Payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods?.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="xl:w-[210px]">
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger className="py-[21px] min-w-[160px] xl:w-[210px]">
                  <SelectValue placeholder="Payment type" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTypes?.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
          <Loader />
        ) : transactionData?.transactions.length ? (
          <>
            <div>
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Payment method</TableHead>
                    <TableHead>
                      Amount <span className="text-[10px]">({currency})</span>
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionData?.transactions?.map(
                    (transaction: TransactionType, index: number) => (
                      <TableRow key={transaction._id}>
                        <TableCell className="font-medium">
                          {(currentPage - 1) * limit + (index + 1)}.
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction?.created_by_name}
                        </TableCell>
                        <TableCell>{transaction?.payment_method}</TableCell>
                        <TableCell>{transaction?.amount}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              transaction?.transaction_desc === "sales"
                                ? "bg-green-100 text-green-700"
                                : transaction?.transaction_desc === "purchases"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {transaction?.transaction_desc}
                          </span>
                        </TableCell>
                        <TableCell>
                          {formatDateShort(transaction?.created_at)}
                        </TableCell>
                        <TableCell>
                          <TransactionOption
                            refetch={refetch}
                            invoiceId={transaction?.invoice_id}
                            transactionDesc={transaction?.transaction_desc}
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
        ) : (
          <div className="py-24">
            <EmptyMessage />
          </div>
        )}
      </section>
    </>
  );
};

export default TransactionPage;
