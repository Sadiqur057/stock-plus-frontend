"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import { useMutation } from "@tanstack/react-query";
import api from "@/interceptors/api";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";
import {
  CalculationShape,
  PaymentDataType,
} from "../../Invoice/CreateInvoicePage";
import ProductSection from "./ProductSection";
import { CalculationSection } from "../../Invoice/CalculationSection";
import { SupplierSection } from "./SupplierSection";
import Link from "next/link";
import { useRouter } from "next/navigation";

const breadcrumbList = [
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

export type Supplier = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

type InventoryDataType = {
  products: Product[];
  total_cost: CalculationShape;
  created_at: Date | undefined;
  supplier: Supplier;
  transaction_data?: {
    amount: number | null;
    payment_description: string;
    payment_method: string;
  };
};

const AddProductsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(new Date());
  const [supplier, setSupplier] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [calculation, setCalculation] = useState<CalculationShape>({
    tax: 0,
    subtotal: 0,
    total: 0,
  });
  const [paymentData, setPaymentData] = useState<PaymentDataType>({
    amount: null,
    payment_description: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const { mutate } = useMutation({
    mutationFn: async (data: InventoryDataType) => {
      try {
        setLoading(true);
        const result = await api.post(
          `${process.env.NEXT_PUBLIC_API_URL}/add-items`,
          data
        );
        if (!result?.data?.success) {
          toast.error(result?.data?.message || "Something went wrong.");
          return;
        }
        toast.success(result?.data?.message);
        router.push("/dashboard/inventory/reports")
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
    if (calculation.paid && calculation.paid > calculation?.total) {
      return toast.error("Invalid amount. Due amount cannot be less than 0");
    }
    const total_cost = Object.assign({}, calculation);
    delete total_cost.due;
    const data = {
      supplier,
      products,
      total_cost: total_cost,
      created_at: invoiceDate,
      transaction_data: {
        payment_method: paymentMethod,
        amount: paymentData?.amount,
        payment_description: paymentData?.payment_description,
      },
    };
    mutate(data);
  };

  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />
      <form onSubmit={handleSubmit} className="my-6">
        <div className="mb-4 lg:mb-8 bg-gray-50 border p-4 lg:p-6 rounded-md flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
              Add Products
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Fill in the details below to create a new invoice
            </p>
          </div>
          <Link href="/dashboard/inventory/reports">
            <Button size="sm">All Reports</Button>
          </Link>
        </div>
        <SupplierSection
          setSupplier={setSupplier}
          supplier={supplier}
          date={invoiceDate}
          setDate={setInvoiceDate}
        />
        <ProductSection
          setProducts={setProducts}
          products={products}
          onTotalChange={setCalculation}
        />
        <CalculationSection
          calculation={calculation}
          setCalculation={setCalculation}
          paymentData={paymentData}
          setPaymentData={setPaymentData}
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
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
