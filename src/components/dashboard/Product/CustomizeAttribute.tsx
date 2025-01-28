"use client";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import { Modal } from "@/components/shared/Modal/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const productAttributes = [
  {
    _id: "1",
    name: "Color",
    query: "color",
    description: "lorem ipsum",
  },
  {
    _id: "2",
    name: "Size",
    query: "size",
    description: "lorem ipsum",
  },
  {
    _id: "3",
    name: "Material",
    query: "material",
    description: "lorem ipsum",
  },
];
type AttributeType = {
  _id: string;
  name: string;
  description: string;
};

import { CirclePlus } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { Textarea } from "@/components/ui/textarea";
const isLoading = false;
const CustomizeAttribute = () => {
  const breadcrumbList = [
    {
      name: "Products",
      link: "/dashboard/products",
    },
    {
      name: "Customize Product",
      link: "/dashboard/products/customize-attribute",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <BreadCrumb breadcrumbList={breadcrumbList} />
      <section>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                All Products Attributes
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Browse all the attributes of product here.
            </p>
          </div>

          <div className="flex items-center mt-4 gap-x-3 mb-10">
            <Button className="py-3" onClick={() => setIsOpen(true)}>
              <CirclePlus />
              <span>Add Attribute</span>
            </Button>
            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Add Attribute"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="productName">Product Attribute Name</Label>
                  <Input
                    id="name"
                    value={formData?.name}
                    name="name"
                    placeholder="Enter Product Attribute Name"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="gap-1.5 flex flex-col">
                  <Label htmlFor="productName">Description</Label>
                  <Textarea rows={3} placeholder="Type your message here." />
                </div>
              </form>
            </Modal>
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
                    <TableHead className="w-[200px]">No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productAttributes?.map((attribute: AttributeType, index) => (
                    <TableRow key={attribute._id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {attribute.name}
                      </TableCell>
                      <TableCell>{attribute.description}</TableCell>
                    </TableRow>
                  ))}
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
    </div>
  );
};

export default CustomizeAttribute;
