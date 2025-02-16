"use client";

import { format } from "date-fns";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import { useQuery } from "@tanstack/react-query";
import api from "@/interceptors/api";
import ScreenLoader from "@/components/shared/Loader/ScreenLoader";
import { Product } from "@/types/invoice.type";
import { getCurrency, getFormattedDate } from "@/lib/utils";

type Props = {
  id: string;
};

export default function ViewInvoice({ id }: Props) {
  const handlePrint = () => {
    window.print();
  };
  const breadcrumbList = [
    {
      name: "Invoices",
      link: "/dashboard/invoices",
    },
    {
      name: "Create Invoice",
      link: "/dashboard/invoices/id",
    },
  ];

  const { data: invoiceData, isLoading } = useQuery({
    queryKey: ["invoice"],
    queryFn: async () => {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/invoice/${id}`
      );
      return result?.data?.data;
    },
  });
  const currency = getCurrency();
  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <section className="bg-white">
          <div className="printable-content bg-white print:p-0">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
                  {invoiceData?.invoice?.company?.name}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
                Invoice
              </h1>
            </div>

            <div className="flex flex-col md:flex-row justify-between mb-6 md:mb-8 gap-3">
              <div>
                <p className="text-gray-600">
                  Date:{" "}
                  {format(
                    new Date(invoiceData?.invoice?.created_at),
                    "MM/dd/yyyy"
                  )}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  Invoice Id: {invoiceData?.invoice._id}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8 justify-between">
              <div>
                <h2 className="text-gray-600 mb-2">Invoiced To:</h2>
                <p className="font-medium">
                  {invoiceData?.invoice?.customer?.name}
                </p>
                <p className="text-gray-600">
                  {invoiceData?.invoice?.customer?.address}
                </p>
                <p className="text-gray-600">
                  {invoiceData?.invoice?.customer?.phone}
                </p>
                <p className="text-gray-600">
                  {invoiceData?.invoice?.customer?.email}
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-gray-600 mb-2">Pay To:</h2>
                <p className="font-medium">
                  {invoiceData?.invoice?.company.name}
                </p>
                <p className="text-gray-600">
                  {invoiceData?.invoice?.company.location}
                </p>
                <p className="text-gray-600">
                  {invoiceData?.invoice?.company.phone}
                </p>
                <p className="text-gray-600">
                  {invoiceData?.invoice?.company.email}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="border overflow-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Rate
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoiceData?.invoice?.products?.map(
                      (product: Product, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {product?.productName}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {product?.company}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {product?.salePrice?.toFixed(2)} {currency}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-left">
                            {product?.quantity}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right">
                            {(product.salePrice * product.quantity).toFixed(2)}{" "}
                            {currency}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end mb-8">
              <div className="w-80">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Sub Total:</span>
                  <span className="font-medium">
                    {invoiceData?.invoice.total_cost.subtotal.toFixed(2)}{" "}
                    {currency}
                  </span>
                </div>
                {invoiceData?.invoice?.total_cost?.discount > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium">
                      {invoiceData?.invoice.total_cost.discount.toFixed(2)}{" "}
                      {currency}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Vat:</span>
                  <span className="font-medium">
                    + {invoiceData?.invoice.total_cost.tax.toFixed(2)}{" "}
                    {currency}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">
                    {invoiceData?.invoice.total_cost.total.toFixed(2)}{" "}
                    {currency}
                  </span>
                </div>
                {invoiceData?.invoice?.total_cost?.status !== "unpaid" && (
                  <>
                    {invoiceData?.transactions?.map(
                      (transaction: {
                        created_at: string;
                        amount: string;
                        _id: string;
                        payment_method: string;
                      }) => (
                        <div
                          key={transaction?._id}
                          className="flex justify-between py-2"
                        >
                          <span className="text-gray-600">
                            {getFormattedDate(transaction?.created_at)}{" "}
                            <small>
                              ({transaction?.payment_method?.split(" ")[0]})
                            </small>
                          </span>
                          <span className="font-medium">
                            - {transaction?.amount} {currency}
                          </span>
                        </div>
                      )
                    )}
                    <div className="flex justify-between py-2 font-semibold border-t border-gray-200">
                      <span>Due:</span>
                      <span>
                        {invoiceData?.invoice.total_cost.total_due.toFixed(2)}{" "}
                        {currency}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="text-sm font-medium mb-8 max-w-48 border-t border-gray-400 text-center py-2">
              <p>Signature</p>
            </div>
          </div>

          <div className="print:hidden flex justify-center mb-6">
            <Button
              onClick={handlePrint}
            >
              <Printer className="w-4 h-4 mr-2" />
              Print & Download
            </Button>
          </div>

          {/* Global Print Styles */}
          <style jsx global>{`
            @media print {
              body * {
                visibility: hidden;
              }
              .printable-content,
              .printable-content * {
                visibility: visible;
              }
              .printable-content {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }

              /* Force Desktop View */
              .printable-content {
                max-width: 900px; /* Ensure desktop width */
                margin: auto;
                font-size: 14px; /* Adjust font size for better readability */
              }

              .printable-content .flex {
                display: flex !important;
                flex-direction: row !important;
              }

              .printable-content .grid {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
              }

              .printable-content .text-left {
                text-align: left !important;
              }

              .printable-content .text-right {
                text-align: right !important;
              }

              .printable-content table {
                min-width: 100% !important;
              }

              /* Hide Print Button */
              .print:hidden {
                display: none !important;
              }
            }
          `}</style>
        </section>
      )}
    </>
  );
}
