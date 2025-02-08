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

const DashboardHome = () => {
  const breadcrumbList = [
    {
      name: "Overview",
      link: "/dashboard",
    },
  ];

  const {
    data: data,
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["attributes"],
    queryFn: async () => {
      const result = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard`
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
        <DashboardFilter />
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
