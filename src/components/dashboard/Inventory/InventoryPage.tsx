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
import { CirclePlus, CloudDownload, ListRestart, Search } from "lucide-react";
import Loader from "@/components/ui/Loader";

import Link from "next/link";
import InventoryOption from "./InventoryOption";
import { CalculationShape } from "../Invoice/CreateInvoicePage";
import { Customer, Product } from "@/types/invoice.type";
import { formatDate, getCurrency } from "@/lib/utils";
import { Pagination } from "@/components/shared/pagination/Pagination";
import InvoiceSummary from "../Invoice/InvoiceSummary";
import { DateRangePicker } from "@/components/shared/DatePicker/DateRangePicker";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import CustomerDropdown from "@/components/shared/Dropdown/CustomerDropdown";

const InventoryPage = () => {
  const [customer, setCustomer] = useState<Customer | null>({
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [date, setDate] = useState<DateRange | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

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

  const fetchInventoryData = async () => {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/get-items`, {
      params: {
        page: currentPage,
        limit: limit,
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
    queryKey: [currentPage, limit],
    queryFn: fetchInventoryData,
  });

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

        <div className="mb-4 lg:mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Date Range
            </label>
            <DateRangePicker date={date} setDate={setDate} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Customer
            </label>
            <CustomerDropdown
              setCustomer={setCustomer}
              label={false}
              customer={customer}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
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
