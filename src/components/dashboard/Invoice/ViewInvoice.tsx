"use client";

import { format } from "date-fns";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import { useQuery } from "@tanstack/react-query";
import api from "@/interceptors/api";
import ScreenLoader from "@/components/shared/Loader/ScreenLoader";
import { Product } from "@/types/invoice.type";

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

  const { data: invoice, isLoading } = useQuery({
    queryKey: ["invoice"],
    queryFn: async () => {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/invoice/${id}`
      );
      return result?.data?.data;
    },
  });
  console.log("checkiing result", invoice);

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
                <span className="text-3xl font-semibold text-gray-900">
                  {invoice?.company?.name}
                </span>
              </div>
              <h1 className="text-3xl font-semibold text-gray-900">Invoice</h1>
            </div>

            <div className="flex justify-between mb-8">
              <div>
                <p className="text-gray-600">
                  Date: {format(new Date(invoice?.created_at), "MM/dd/yyyy")}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Invoice Id: {invoice._id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-gray-600 mb-2">Invoiced To:</h2>
                <p className="font-medium">{invoice?.customer?.name}</p>
                <p className="text-gray-600">{invoice?.customer?.address}</p>
                <p className="text-gray-600">{invoice?.customer?.phone}</p>
                <p className="text-gray-600">{invoice?.customer?.email}</p>
              </div>
              <div className="text-right">
                <h2 className="text-gray-600 mb-2">Pay To:</h2>
                <p className="font-medium">{invoice?.company.name}</p>
                <p className="text-gray-600">{invoice?.company.location}</p>
                <p className="text-gray-600">{invoice?.company.phone}</p>
                <p className="text-gray-600">{invoice?.company.email}</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Company
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                        Rate
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                        QTY
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoice?.products?.map((product: Product) => (
                      <tr key={product?.id}>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {product?.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {product?.company}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">
                          ${product?.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">
                          {product?.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">
                          ${(product.price * product.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end mb-8">
              <div className="w-80">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Sub Total:</span>
                  <span className="font-medium">
                    ${invoice.cost_summary.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">
                    ${invoice.cost_summary.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">
                    ${invoice.cost_summary.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="text-sm text-gray-500 mb-8 text-center">
              <p>
                NOTE: This is computer generated receipt and does not require
                physical signature.
              </p>
            </div>
          </div>

          {/* Print Button - Hidden in print */}
          <div className="print:hidden flex justify-center">
            <Button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white"
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
            }
          `}</style>
        </section>
      )}
    </>
  );
}
