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

export type SupplierType = {
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
import AddSupplier from "./AddSupplier";
import SupplierOption from "./SupplierOption";
import { Pagination } from "@/components/shared/pagination/Pagination";
import EmptyMessage from "../Home/EmptyMessage";

const breadcrumbList = [
  {
    name: "Products",
    link: "/dashboard/products",
  },
];
const SuppliersPage = () => {
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
    data: supplierData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [currentPage, limit],
    queryFn: async () => {
      const res = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/suppliers`,
        {
          params: { limit: limit, page: currentPage },
        }
      );
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
                All Suppliers
              </h2>

              <span className="px-3 py-1 text-xs text-blue-800 bg-blue-50 rounded-md dark:bg-gray-800 dark:text-blue-400">
                {supplierData?.pagination?.totalDocuments || 0} Suppliers
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Browse all the Suppliers here.
            </p>
          </div>

          <div className="flex items-center mt-4 gap-x-3">
            <Button className="py-3" onClick={() => setIsOpen(true)}>
              <CirclePlus />
              <span>Add Supplier</span>
            </Button>
            <Modal
              isOpen={isOpen}
              size="sm"
              onClose={() => setIsOpen(false)}
              title="Add New Supplier"
            >
              <AddSupplier
                refetch={refetch}
                closeModal={() => setIsOpen(false)}
              />
            </Modal>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : supplierData?.suppliers?.length ? (
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
                  {supplierData?.suppliers?.map(
                    (supplier: SupplierType, index: number) => (
                      <TableRow key={supplier._id}>
                        <TableCell className="font-medium">
                          {(currentPage - 1) * limit + (index + 1)}.
                        </TableCell>
                        <TableCell className="font-medium">
                          {supplier?.name}
                        </TableCell>
                        <TableCell>{supplier?.email}</TableCell>
                        <TableCell>{supplier?.phone}</TableCell>
                        <TableCell>{supplier?.address}</TableCell>
                        <TableCell>
                          <SupplierOption
                            refetch={refetch}
                            supplierId={supplier?._id}
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

export default SuppliersPage;
