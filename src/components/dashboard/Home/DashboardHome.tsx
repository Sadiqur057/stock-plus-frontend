"use client";
import React from "react";
import { RecentSales } from "./RecentSales";
import { InvoiceOverview } from "./InvoiceOverview";
import { SidebarInset } from "@/components/ui/sidebar";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import { InvoiceStats } from "./InvoiceStats";
import { PaymentOverview } from "./PaymentOverview";
import { RecentTransactions } from "./RecentTransaction";
import api from "@/interceptors/api";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import ScreenLoader from "@/components/shared/Loader/ScreenLoader";
import { DashboardFilter } from "./DashboardFilter";
import { RevenueOverview } from "./RevenueOverview";
import RecentRevenue from "./RecentRevenue";
import { format } from "date-fns";
import { Customer, Invoice } from "@/types/invoice.type";
import {
  TInvoiceOverviewData,
  TPaymentOverviewData,
  TRevenueOverviewData,
} from "@/types/dashboard.type";
import { TransactionType } from "../Transaction/TransactionPage";

export type TDashboardOverviewData = {
  invoices: Invoice[];
  transactions: TransactionType[];
  invoiceChartData: TInvoiceOverviewData;
  paymentChartData: TPaymentOverviewData;
  revenueChartData: TRevenueOverviewData;
  summary: {
    invoice_count: number;
    total_payment: number;
    due_invoice_count: number;
    due_invoice_amount: number;
    total_paid_amount: number;
    total_invoice_amount: number;
    total_revenue_amount: number;
    transaction_count: number;
    total_sell: number;
    customer_count: number;
  };
};

const DashboardHome = () => {
  const breadcrumbList = [
    {
      name: "Overview",
      link: "/dashboard",
    },
  ];

  const [startDate, setStartDate] = React.useState<string | Date | undefined>();
  const [endDate, setEndDate] = React.useState<string | Date | undefined>();

  const [customer, setCustomer] = React.useState<Customer | null>(null);
  const [duration, setDuration] = React.useState<string>("");

  const {
    data: data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const params = new URLSearchParams({
        start_date: startDate ? format(startDate, "yyyy-MM-dd") : "",
        end_date: endDate ? format(endDate, "yyyy-MM-dd") : "",
        customer_phone: customer ? customer.phone : "",
        duration: duration,
      });
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
        { params }
      );
      if (!result?.data?.success) {
        return toast.error(result?.data?.message || "Something went wrong");
      }
      return result?.data?.data;
    },
  });

  return (
    <>
      <SidebarInset>
        <BreadCrumb breadcrumbList={breadcrumbList} />
        <DashboardFilter
          setCustomer={setCustomer}
          endDate={endDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          startDate={startDate}
          refetch={refetch}
          setDuration={setDuration}
          duration={duration}
          customer={customer}
        />
        {isLoading ? (
          <ScreenLoader />
        ) : (
          <div className="space-y-4 lg:space-y-6">
            <InvoiceStats summary={data?.summary} />
            <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
              <div className="border rounded-md p-4 lg:p-6 max-h-[472px] overflow-auto custom-scrollbar">
                <InvoiceOverview chartData={data?.invoiceChartData} />
              </div>

              <div className="border rounded-md p-4 lg:p-6 max-h-[472px] overflow-auto custom-scrollbar">
                <RecentSales invoices={data?.invoices} />
              </div>

              <div className="border rounded-md p-4 lg:p-6 max-h-[472px] overflow-auto custom-scrollbar">
                <RecentRevenue revenues={data?.invoices} />
              </div>
              <div className="border rounded-md p-4 lg:p-6 max-h-[472px] overflow-auto custom-scrollbar">
                <RevenueOverview chartData={data?.revenueChartData} />
              </div>
              <div className="border rounded-md p-4 lg:p-6 max-h-[472px] overflow-auto custom-scrollbar">
                <PaymentOverview chartData={data?.paymentChartData} />
              </div>
              <div className="border rounded-md p-4 lg:p-6 max-h-[472px] overflow-auto custom-scrollbar">
                <RecentTransactions transactions={data?.transactions} />
              </div>
            </div>
          </div>
        )}
      </SidebarInset>
    </>
  );
};

export default DashboardHome;
