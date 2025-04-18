"use client";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import api from "@/interceptors/api";
import { Button } from "@/components/ui/button";
import ProductAction from "./ProductAction";
import React, { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Attribute = {
  key: string;
  value: string;
};

type ProductType = {
  _id: string;
  productName: string;
  company: string;
  quantity: string;
  purchasePrice: string;
  salePrice: string;
  remarks: string;
  attributes: Attribute[];
};

import style from "./Product.module.scss";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus, CloudDownload, ListRestart, Search } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { Modal } from "@/components/shared/Modal/Modal";
import AddNewProduct from "./AddNewProduct";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Pagination } from "@/components/shared/pagination/Pagination";
import { getCurrency } from "@/lib/utils";

const ProductPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterProduct, setFilterProduct] = useState<string>("all");
  const [sortValue, setSortValue] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [inputKeyword, setInputKeyword] = useState<string>("");

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

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

  const fetchProducts = async () => {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        params: {
          filter: filterProduct !== "all" ? filterProduct : null,
          search: searchKeyword ? searchKeyword : null,
          sort: sortValue ? sortValue : null,
          limit: limit,
          page: currentPage,
        },
      }
    );
    setTotalPages(response?.data?.pagination?.totalPages);
    return response.data;
  };

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [filterProduct, searchKeyword, sortValue, currentPage, limit],
    queryFn: fetchProducts,
  });

  const handleSort = (value: string) => {
    setSortValue(value);
  };

  const handleFilter = (value: string) => {
    setFilterProduct(value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputKeyword(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setSearchKeyword(value);
    }, 300);
  };

  const handleReset = () => {
    setFilterProduct("all");
    setSortValue("");
    setSearchKeyword("");
    setInputKeyword("");
    refetch();
  };

  const breadcrumbList = [
    {
      name: "Products",
      link: "/dashboard/products",
    },
  ];
  const currency = getCurrency();
  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />

      <section>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                All Products
              </h2>

              <span className="px-3 py-1 text-xs text-blue-800 bg-blue-50 rounded-md dark:bg-gray-800 dark:text-blue-400">
                {products?.pagination?.totalDocuments || 0} Product
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Browse all the products here.
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

            <Button className="py-3" onClick={() => setIsOpen(true)}>
              <CirclePlus />
              <span>Add Product</span>
            </Button>
            <Modal
              isOpen={isOpen}
              size="lg"
              onClose={() => setIsOpen(false)}
              title="Add New Product"
            >
              <AddNewProduct
                refetch={refetch}
                closeModal={() => setIsOpen(false)}
              />
            </Modal>
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
              onChange={handleSearch}
              className={style.searchBox}
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
                    <TableHead>No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>
                      Price <span className="text-[10px]">({currency})</span>
                    </TableHead>
                    <TableHead>Attributes</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products?.data.map((product: ProductType, index: number) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">
                        {(currentPage - 1) * limit + (index + 1)}.
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.productName}
                      </TableCell>
                      <TableCell>{product.company}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.purchasePrice}</TableCell>
                      <TableCell>
                        {product?.attributes &&
                          product.attributes.map((attr, index) => (
                            <span key={index}>
                              {attr.key !== "new"
                                ? `${attr.key}: ${attr.value}`
                                : attr.value}
                              {index < product.attributes.length - 1
                                ? ", "
                                : ""}
                            </span>
                          ))}
                      </TableCell>
                      <TableCell>
                        <ProductAction
                          refetch={refetch}
                          productId={product?._id}
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

export default ProductPage;
