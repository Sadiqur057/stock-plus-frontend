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
  added_by: string
};

import { useQuery } from "@tanstack/react-query";
import { CirclePlus, CloudDownload } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { Modal } from "@/components/shared/Modal/Modal";
import AddSupplier from "./AddSupplier";
import toast from "react-hot-toast";
import SupplierOption from "./SupplierOption";
import { Pagination } from "@/components/shared/pagination/Pagination";

const breadcrumbList = [
  {
    name: "Products",
    link: "/dashboard/products",
  },
];
const SuppliersPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  //pagination
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
    data: suppliers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/suppliers`
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
                All Suppliers
              </h2>

              <span className="px-3 py-1 text-xs text-blue-800 bg-blue-50 rounded-md dark:bg-gray-800 dark:text-blue-400">
                12 Suppliers
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Browse all the Suppliers here.
            </p>
          </div>

          <div className="flex items-center mt-4 gap-x-3">
            <Button variant={"outline"} className="py-3">
              <CloudDownload />
              <span>Import</span>
            </Button>

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
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers?.map((supplier: SupplierType, index:number) => (
                    <TableRow key={supplier._id}>
                      <TableCell className="font-medium">
                        {index+1}.
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
                  ))}
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

export default SuppliersPage;
