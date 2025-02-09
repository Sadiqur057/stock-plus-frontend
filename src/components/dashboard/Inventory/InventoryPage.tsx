"use client";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import api from "@/interceptors/api";
import { Button } from "@/components/ui/button";
// import ProductAction from "./ProductAction";
import React, {  useState } from "react";
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
// import { Modal } from "@/components/shared/Modal/Modal";
// import AddNewProduct from "./AddNewProduct";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import Link from "next/link";
import InventoryOption from "./InventoryOption";
import { CalculationShape } from "../Invoice/CreateInvoicePage";
import { Product } from "@/types/invoice.type";

const InventoryPage = () => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterProduct, setFilterProduct] = useState<string>("all");
  const [sortValue, setSortValue] = useState<string>("");
  // const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [inputKeyword, setInputKeyword] = useState<string>("");

  // const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchInventoryData = async () => {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/get-items`
      // ,{
      //   params: {
      //     filter: filterProduct !== "all" ? filterProduct : null,
      //     search: searchKeyword ? searchKeyword : null,
      //     sort: sortValue ? sortValue : null,
      //   },
      // }
    );
    console.log("api data", response.data);
    return response.data.data;
  };

  const {
    data: inventoryData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["items"],
    // queryKey: [filterProduct, searchKeyword, sortValue],
    queryFn: fetchInventoryData,
  });

  const handleSort = (value: string) => {
    setSortValue(value);
  };

  const handleFilter = (value: string) => {
    setFilterProduct(value);
  };

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setInputKeyword(value);

  //   if (debounceTimeout.current) {
  //     clearTimeout(debounceTimeout.current);
  //   }

  //   debounceTimeout.current = setTimeout(() => {
  //     setSearchKeyword(value);
  //   }, 300);
  // };

  const handleReset = () => {
    setFilterProduct("all");
    setSortValue("");
    // setSearchKeyword("");
    setInputKeyword("");
    refetch();
  };

  const breadcrumbList = [
    {
      name: "Products",
      link: "/dashboard/products",
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
                All Items
              </h2>

              <span className="px-3 py-1 text-xs text-blue-800 bg-blue-50 rounded-md dark:bg-gray-800 dark:text-blue-400">
                {inventoryData?.products?.length} Product
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Browse all the items here.
            </p>
          </div>

          <div className="flex items-center mt-4 gap-x-2 lg:gap-x-3">
            <Button
              onClick={handleReset}
              variant={"outline"}
              className="py-3 px-2.5"
            >
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

        <div className="my-6 md:flex md:items-center md:justify-between gap-4 flex-col 2lg:flex-row">
          <div className="flex w-full flex-col md:flex-row justify-between flex-1 gap-4">
            <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse w-fit">
              <button
                onClick={() => handleFilter("all")}
                className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200  sm:text-sm  max-w-fit ${
                  filterProduct === "all" && "bg-gray-600 text-white"
                }`}
              >
                View all
              </button>

              <button
                onClick={() => handleFilter("inStock")}
                className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200  sm:text-sm  max-w-fit ${
                  filterProduct === "inStock" && "bg-gray-600 text-white"
                }`}
              >
                In Stock
              </button>

              <button
                onClick={() => handleFilter("stockOut")}
                className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200  sm:text-sm  max-w-fit ${
                  filterProduct === "stockOut" && "bg-gray-600 text-white"
                }`}
              >
                Out of Stock
              </button>
            </div>
            <div>
              <Select value={sortValue} onValueChange={handleSort}>
                <SelectTrigger className="!py-[18px] w-full md:min-w-[100px] md:max-w-[196px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort By</SelectLabel>
                    <SelectItem value="price-desc">
                      Price(High to Low)
                    </SelectItem>
                    <SelectItem value="price-asc">
                      Price(Low to high)
                    </SelectItem>
                    <SelectItem value="date-asc">
                      Date(First to Last)
                    </SelectItem>
                    <SelectItem value="date-desc">
                      Date(Last to First)
                    </SelectItem>
                    <SelectItem value="quantity-desc">
                      Quantity(High to Low)
                    </SelectItem>
                    <SelectItem value="quantity-asc">
                      Quantity(Low to high)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="relative w-full 2lg:w-fit flex items-center mt-4 md:mt-0">
            <span className="ml-3 absolute">
              <Search size={16} />
            </span>

            <input
              type="search"
              placeholder="Search"
              value={inputKeyword}
              // onChange={handleSearch}
              className="searchBox"
            />
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
                    <TableHead className="w-[200px]">Created By</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>No of Items</TableHead>
                    <TableHead>
                      Cost <span className="text-[10px]">(BDT)</span>
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData?.map((item: ItemType) => (
                    <TableRow key={item?._id}>
                      <TableCell className="font-medium">
                        {item?.created_by_name}
                      </TableCell>
                      <TableCell>{item?.created_at}</TableCell>
                      <TableCell>{item?.products?.length}</TableCell>
                      <TableCell>{item?.total_cost?.total}</TableCell>
                      <TableCell>{item?.purchasePrice}</TableCell>
                      <TableCell>
                        <InventoryOption
                          refetch={refetch}
                          inventoryId={item?._id}
                        />
                      </TableCell>
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
    </>
  );
};

export default InventoryPage;
