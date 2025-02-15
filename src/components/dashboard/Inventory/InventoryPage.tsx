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
import { CalendarSearch, RotateCcw } from "lucide-react";

import Link from "next/link";
import InventoryOption from "./InventoryOption";
import { CalculationShape } from "../Invoice/CreateInvoicePage";
import { Customer, Product } from "@/types/invoice.type";
import { formatDateShort, getCurrency } from "@/lib/utils";
import { Pagination } from "@/components/shared/pagination/Pagination";
import InvoiceSummary from "../Invoice/InvoiceSummary";
import { format } from "date-fns";
import { DateFilter } from "../Filter/DateFilter";

import StatusFilter from "../Filter/StatusFilter";
import { Modal } from "@/components/shared/Modal/Modal";
import ScreenLoader from "@/components/shared/Loader/ScreenLoader";
import EmptyMessage from "../Home/EmptyMessage";
import SupplierDropdown from "@/components/shared/Dropdown/SupplierDropdown";

const InventoryPage = () => {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [supplier, setSupplier] = useState<Customer | null>(null);
  const [startDate, setStartDate] = useState<string | Date | undefined>();
  const [endDate, setEndDate] = useState<string | Date | undefined>();

  const [duration, setDuration] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        supplier_phone: supplier ? supplier?.phone : "",
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
    queryKey: [currentPage, limit, selectedStatus, supplier],
    queryFn: fetchInventoryData,
  });

  const handleApplyDateFilter = async () => {
    refetch();
    setIsModalOpen(false);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setDuration("");
    setSelectedStatus("");
    setSupplier(null);
    setTimeout(() => {
      refetch();
    }, 0);
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
      <div className="mb-4 bg-gray-50 border p-4 lg:p-6 rounded-md flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Purchase Invoices
          </h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Manage and track your purchase
          </p>
        </div>
        <Link href="/dashboard/inventory/add-products">
          <Button size="sm">Create Purchase</Button>
        </Link>
      </div>
      <section>
        <div className="flex gap-4 justify-between flex-wrap mb-4">
          <div className="flex gap-4 flex-wrap">
            <StatusFilter
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
            <SupplierDropdown
              setSupplier={setSupplier}
              label={false}
              supplier={supplier}
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
        ) : inventoryData?.data?.invoices?.length ? (
          <>
            <InvoiceSummary summary={inventoryData?.data?.invoice_summary} />
            <div>
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
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
                    (item: ItemType, index: number) => (
                      <TableRow key={item?._id}>
                        <TableCell className="font-medium">
                          {(currentPage - 1) * limit + (index + 1)}.
                        </TableCell>
                        <TableCell className="font-medium">
                          {item?.created_by_name}
                        </TableCell>
                        <TableCell>{item?.total_cost?.total}</TableCell>
                        <TableCell>{item?.total_cost?.due}</TableCell>
                        <TableCell>
                          {item?.created_at &&
                            formatDateShort(item?.created_at)}
                        </TableCell>
                        <TableCell>
                          {" "}
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              item?.total_cost?.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : item?.total_cost?.status === "unpaid"
                                ? "bg-red-100 text-red-800"
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
        ) : (
          <div className="py-20">
            <EmptyMessage />
          </div>
        )}
      </section>
    </>
  );
};

export default InventoryPage;
