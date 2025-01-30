"use client";

import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import AddNewProduct from "./AddNewProduct";

const AddProductPage = () => {
  const breadcrumbList = [
    {
      name: "Products",
      link: "/dashboard/products",
    },
    {
      name: "Add Product",
      link: "/dashboard/products/add-product",
    },
  ];

  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <AddNewProduct />
    </>
  );
};

export default AddProductPage;
