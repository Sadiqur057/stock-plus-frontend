"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomerSection } from "./CustomerSection";
import { ProductSection } from "./ProductSection";
import { CalculationSection } from "./CalculationSection";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";

export default function CreateInvoicePage() {
  const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(new Date());
  const [subtotal, setSubtotal] = useState(0);
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
  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />
      <section className="">
        <div className="mb-4 bg-gray-100 p-4 rounded-md">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create Invoice
          </h1>
          <p className="text-gray-500 mt-1">
            Fill in the details below to create a new invoice
          </p>
        </div>

        <div className="grid gap-6">
          <div className="flex items-center justify-between mt-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Customer Information
            </h2>
          </div>
          <CustomerSection date={invoiceDate} setDate={setInvoiceDate} />

          <h2 className="text-xl font-semibold text-gray-900 mt-4">
            Select Products
          </h2>
          <div className="overflow-hidden">
            <ProductSection onTotalChange={setSubtotal} />
          </div>

          <CalculationSection subtotal={subtotal} />
          <div className="mt-6 flex justify-end">
            <Button size="lg" className="px-8">
              Create Invoice
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
