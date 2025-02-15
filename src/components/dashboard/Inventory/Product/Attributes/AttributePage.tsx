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

export type AttributeType = {
  _id: string;
  name: string;
  description: string;
};

import { useQuery } from "@tanstack/react-query";
import { CirclePlus, CloudDownload } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { Modal } from "@/components/shared/Modal/Modal";
import AddAttribute from "./AddAttribute";
import AttributeOption from "./AttributeOption";
import { Pagination } from "@/components/shared/pagination/Pagination";
import EmptyMessage from "@/components/dashboard/Home/EmptyMessage";

const breadcrumbList = [
  {
    name: "Attributes",
    link: "/dashboard/attributes",
  },
];
const AttributesPage = () => {
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
    data: attributeData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [currentPage, limit],
    queryFn: async () => {
      const res = await api.get(`/attributes`, {
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
                All Attributes
              </h2>

              <span className="px-3 py-1 text-xs text-blue-800 bg-blue-50 rounded-md dark:bg-gray-800 dark:text-blue-400">
                {attributeData?.pagination?.totalDocuments || 0} Attributes
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Browse all the Attributes here.
            </p>
          </div>

          <div className="flex items-center mt-4 gap-x-3">
            <Button variant={"outline"} className="py-3">
              <CloudDownload />
              <span>Import</span>
            </Button>

            <Button className="py-3" onClick={() => setIsOpen(true)}>
              <CirclePlus />
              <span>Add Attribute</span>
            </Button>
            <Modal
              isOpen={isOpen}
              size="sm"
              onClose={() => setIsOpen(false)}
              title="Add New Attribute"
            >
              <AddAttribute
                refetch={refetch}
                closeModal={() => setIsOpen(false)}
              />
            </Modal>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : attributeData?.attributes?.length ? (
          <>
            <div>
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attributeData?.attributes.map(
                    (attribute: AttributeType, index: number) => (
                      <TableRow key={attribute._id}>
                        <TableCell className="font-medium">
                          {(currentPage - 1) * limit + (index + 1)}.
                        </TableCell>
                        <TableCell className="font-medium">
                          {attribute?.name}
                        </TableCell>
                        <TableCell>{attribute?.description}</TableCell>
                        <TableCell>
                          <AttributeOption
                            refetch={refetch}
                            attributeId={attribute?._id}
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

export default AttributesPage;
