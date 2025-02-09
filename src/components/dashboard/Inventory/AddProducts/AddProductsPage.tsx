"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import { useMutation } from "@tanstack/react-query";
import api from "@/interceptors/api";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";
import { CalculationShape } from "../../Invoice/CreateInvoicePage";
import ProductSection from "./ProductSection";
import { CalculationSection } from "../../Invoice/CalculationSection";

const breadcrumbList = [
  {
    name: "Inventory",
    link: "/dashboard/inventory",
  },
  {
    name: "Add Products",
    link: "/dashboard/inventory/add-product",
  },
];

export type Product = {
  _id?: string;
  isNew?: boolean;
  temp_id?: string;
  productName: string;
  company: string;
  salePrice: number;
  purchasePrice: number;
  attributes?: string;
  quantity: number;
  existing?: boolean;
};

type InventoryDataType = {
  products: Product[];
  total_cost: CalculationShape;
  created_at: string;
};

const AddProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [calculation, setCalculation] = useState<CalculationShape>({
    tax: 0,
    subtotal: 0,
    total: 0,
  });



  const { mutate } = useMutation({
    mutationFn: async (data: InventoryDataType) => {
      try {
        const result = await api.post(
          `${process.env.NEXT_PUBLIC_API_URL}/add-items`,
          data
        );
        if (!result?.data?.success) {
          toast.error(result?.data?.message || "Something went wrong.");
          return;
        }
        toast.success(result?.data?.message);
      } catch (error) {
        toast.error("An unexpected error occurred.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      products,
      total_cost: calculation,
      created_at: new Date().toLocaleString(),
    };
    console.log("checking", data);
    mutate(data);
  };

  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />
      <h2 className="text-2xl font-bold">Quick Add Products</h2>
      <p className="text-muted-foreground mt-1.5">
        Quickly add multiple products and generate invoice of new stock update.
        Added products will be added as new products in your inventory
      </p>
      <form onSubmit={handleSubmit} className="my-6">
        <ProductSection
          setProducts={setProducts}
          products={products}
          onTotalChange={setCalculation}
        />
        <CalculationSection
          calculation={calculation}
          setCalculation={setCalculation}
        />
        <div className="mt-6 flex justify-end">
          <Button size="lg" type="submit" className="px-8" disabled={loading}>
            {loading ? <ButtonLoader /> : "Add to Inventory"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddProductsPage;
