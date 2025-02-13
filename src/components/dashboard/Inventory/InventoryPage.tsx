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

export type ItemType = {
  purchasePrice: number;
  salePrice: number;
  created_by_name: string;
  _id: string;
  created_at: string;
  total_cost: CalculationShape;
  products: Product[];
};

import { useQuery } from "@tanstack/react-query";
import { CirclePlus, CloudDownload, ListRestart } from "lucide-react";
import Loader from "@/components/ui/Loader";

import Link from "next/link";
import InventoryOption from "./InventoryOption";
import { CalculationShape } from "../Invoice/CreateInvoicePage";
import { Product } from "@/types/invoice.type";
import { formatDate, getCurrency } from "@/lib/utils";
import { Pagination } from "@/components/shared/pagination/Pagination";
import InvoiceSummary from "../Invoice/InvoiceSummary";
import { format } from "date-fns";
import { DateFilter } from "../Filter/DateFilter";

import StatusFilter from "../Filter/StatusFilter";



const InventoryPage = () => {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const [startDate, setStartDate] = useState<string | Date | undefined>();
  const [endDate, setEndDate] = useState<string | Date | undefined>();

  const [duration, setDuration] = useState<string>("");

  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };
  const fetchInventoryData = async () => {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/get-items`, {
      params: {
        page: currentPage,
        limit: limit,
        start_date: startDate ? format(startDate, "yyyy-MM-dd") : "",
        end_date: endDate ? format(endDate, "yyyy-MM-dd") : "",
        duration: duration,
        status: selectedStatus,
      },
    });
    if (!res?.data?.success) return;
    setTotalPages(res?.data?.data?.pagination?.totalPages);
    return res?.data;
  };

  const {
    data: inventoryData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [currentPage, limit, selectedStatus],
    queryFn: fetchInventoryData,
  });

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setDuration("");
    setSelectedStatus("");
    setTimeout(() => {
      refetch();
    }, 0);
  };

  const handleApplyFilter = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      refetch();
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const currency = getCurrency();
  const breadcrumbList = [
    {
      name: "Reports",
      link: "/dashboard/inventory",
    },
  ];
  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />

      <section>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                Inventory Invoices
              </h2>

              <span className="px-3 py-1 text-xs text-blue-800 bg-blue-50 rounded-md dark:bg-gray-800 dark:text-blue-400">
                {inventoryData?.data?.pagination?.totalDocuments} invoices
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Browse all the items here.
            </p>
          </div>

          <div className="flex items-center mt-4 gap-x-2 lg:gap-x-3">
            <Button variant={"outline"} className="py-3 px-2.5">
              <ListRestart />
            </Button>
            <Button variant={"outline"} className="py-3">
              <CloudDownload />
              <span>Import</span>
            </Button>

            <Link href={"/dashboard/inventory/add-products"}>
              <Button className="py-3">
                <CirclePlus />
                <span>Add New Items</span>
              </Button>
            </Link>
          </div>
        </div>

        <InvoiceSummary summary={inventoryData?.data?.invoice_summary} />
        <div className="flex gap-4 justify-between">
          <StatusFilter
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <DateFilter
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            startDate={startDate}
            setDuration={setDuration}
            duration={duration}
            handleSubmit={handleApplyFilter}
            handleReset={handleReset}
          />
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div>
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead className="w-[200px]">Created By</TableHead>
                    <TableHead>
                      Total{" "}
                      <span className="text-[10px] text-muted-foreground">
                        ({currency})
                      </span>
                    </TableHead>
                    <TableHead>
                      Due{" "}
                      <span className="text-[10px] text-muted-foreground">
                        ({currency})
                      </span>
                    </TableHead>

                    <TableHead>Created at</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData?.data?.invoices?.map(
                    (item: ItemType, idx: number) => (
                      <TableRow key={item?._id}>
                        <TableCell className="font-medium">{idx}</TableCell>
                        <TableCell className="font-medium">
                          {item?.created_by_name}
                        </TableCell>
                        <TableCell>{item?.total_cost?.total}</TableCell>
                        <TableCell>{item?.total_cost?.due}</TableCell>
                        <TableCell>
                          {item?.created_at && formatDate(item?.created_at)}
                        </TableCell>
                        <TableCell>
                          {" "}
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              item?.total_cost?.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item?.total_cost?.status}
                          </span>
                        </TableCell>

                        <TableCell>
                          <InventoryOption
                            refetch={refetch}
                            inventoryId={item?._id}
                            due_amount={item?.total_cost?.due || 0}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                limit={limit}
                onLimitChange={handleLimitChange}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default InventoryPage;
