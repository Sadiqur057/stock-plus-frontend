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

export type CustomerType = {
  name: string;
  email: string;
  phone: string;
  address: string;
  _id: string;
  added_by: string;
};

import { useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { Modal } from "@/components/shared/Modal/Modal";
import AddCustomer from "./AddCustomer";
import CustomerOption from "./CustomerOption";
import { Pagination } from "@/components/shared/pagination/Pagination";
import EmptyMessage from "../Home/EmptyMessage";

const breadcrumbList = [
  {
    name: "Products",
    link: "/dashboard/products",
  },
];
const CustomersPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    data: customerData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [currentPage, limit],
    queryFn: async () => {
      const res = await api.get(`/customers`, {
        params: { limit: limit, page: currentPage },
      });
      setTotalPages(res?.data?.data?.pagination?.totalPages);
      return res?.data?.data;
    },
  });

  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />

      <section>
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                All Customers
              </h2>

              <span className="px-3 py-1 text-xs text-blue-800 bg-blue-50 rounded-md dark:bg-gray-800 dark:text-blue-400">
                {customerData?.pagination?.totalDocuments || 0} Customers
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Browse all the Customers here.
            </p>
          </div>

          <div className="flex items-center mt-4 gap-x-3">
            <Button className="py-3" onClick={() => setIsOpen(true)}>
              <CirclePlus />
              <span>Add Customer</span>
            </Button>
            <Modal
              isOpen={isOpen}
              size="sm"
              onClose={() => setIsOpen(false)}
              title="Add New Customer"
            >
              <AddCustomer
                refetch={refetch}
                closeModal={() => setIsOpen(false)}
              />
            </Modal>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : customerData?.customers?.length ? (
          <>
            <div>
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerData?.customers?.map(
                    (customer: CustomerType, index: number) => (
                      <TableRow key={customer._id}>
                        <TableCell className="font-medium">
                          {(currentPage - 1) * limit + (index + 1)}.
                        </TableCell>
                        <TableCell className="font-medium">
                          {customer?.name}
                        </TableCell>
                        <TableCell>{customer?.email}</TableCell>
                        <TableCell>{customer?.phone}</TableCell>
                        <TableCell>{customer?.address}</TableCell>
                        <TableCell>
                          <CustomerOption
                            refetch={refetch}
                            customerId={customer?._id}
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
          <div className="py-20">
            <EmptyMessage />
          </div>
        )}
      </section>
    </>
  );
};

export default CustomersPage;
