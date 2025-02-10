"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomerSection } from "./CustomerSection";
import { ProductSection } from "./ProductSection";
import { CalculationSection } from "./CalculationSection";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import { useMutation } from "@tanstack/react-query";
import api from "@/interceptors/api";
import toast from "react-hot-toast";
import Link from "next/link";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";

export type CalculationShape = {
  subtotal: number;
  total: number;
  tax: number;
  paid?: number;
  due?: number;
  discount?: number;
};
export type Product = {
  _id: string;
  productName: string;
  company: string;
  salePrice: number;
  quantity: number;
};
export type Customer = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};
type InvoiceType = {
  customer: Customer;
  products: Product[];
  created_at: Date | undefined;
  total_cost: CalculationShape;
  transaction_data?: {
    amount: number | null;
    payment_description: string;
    payment_method: string;
  };
};

export type PaymentDataType = {
  amount: number | null;
  payment_description: string;
};

export type PaymentShape = PaymentDataType & {
  payment_method: string;
};

export default function CreateInvoicePage() {
  const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [calculation, setCalculation] = useState<CalculationShape>({
    tax: 0,
    subtotal: 0,
    total: 0,
    paid: 0,
  });
  const [paymentData, setPaymentData] = useState<PaymentDataType>({
    amount: null,
    payment_description: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const breadcrumbList = [
    {
      name: "Invoices",
      link: "/dashboard/invoices",
    },
    {
      name: "Create Invoice",
      link: "/dashboard/invoices/create-invoice",
    },
  ];

  const [customer, setCustomer] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [products, setProducts] = useState<Product[]>([]);

  const { mutate } = useMutation({
    mutationFn: async (data: InvoiceType) => {
      try {
        setLoading(true);
        const result = await api.post(
          `${process.env.NEXT_PUBLIC_API_URL}/create-invoice`,
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
    const transaction_data = {
      amount: paymentData?.amount,
      payment_description: paymentData?.payment_description,
      payment_method: paymentMethod,
    };
    if (calculation.paid && calculation.paid > calculation?.total) {
      return toast.error("Invalid amount. Due amount cannot be less than 0");
    }
    
    const data = {
      customer,
      products,
      created_at: invoiceDate,
      total_cost: calculation,
      transaction_data,
    };
    console.log("checking before submitting", data);
    mutate(data);
  };

  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />
      <section className="mb-10">
        <div className="mb-4 lg:mb-8 bg-gray-50 border p-4 lg:p-6 rounded-md flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
              Create Invoice
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Fill in the details below to create a new invoice
            </p>
          </div>
          <Link href="/dashboard/invoices">
            <Button size="sm">All Invoices</Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="flex items-center justify-between mt-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Customer Information
            </h2>
          </div>
          <CustomerSection
            setCustomer={setCustomer}
            customer={customer}
            date={invoiceDate}
            setDate={setInvoiceDate}
          />

          <h2 className="text-xl font-semibold text-gray-900 mt-4">
            Select Products
          </h2>
          <div className="overflow-hidden">
            <ProductSection
              setProducts={setProducts}
              products={products}
              onTotalChange={setCalculation}
            />
          </div>

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
              {loading ? <ButtonLoader /> : "Create Invoice"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
