import React from "react";
import { RecentSales } from "./RecentSales";
import { Overview } from "./Overview";
import { SidebarInset } from "@/components/ui/sidebar";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
import { InvoiceStats } from "./InvoiceStats";
import { PaymentOverview } from "./PaymentOverview";
import { RecentTransactions } from "./RecentTransaction";

const DashboardHome = () => {
  const breadcrumbList = [
    {
      name: "Overview",
      link: "/dashboard",
    },
  ];
  return (
    <>
      <SidebarInset>
        <BreadCrumb breadcrumbList={breadcrumbList} />
        <div className="space-y-4 lg:space-y-6">
          <InvoiceStats />
          <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
            <div className="rounded-md border max-h-[460px] overflow-y-auto custom-scrollbar">
              <Overview />
            </div>
            <div className="border rounded-md p-4 lg:p-6 max-h-[460px] overflow-auto custom-scrollbar">
              <RecentSales />
            </div>
            <div className="border rounded-md p-4 lg:p-6 max-h-[460px] overflow-auto custom-scrollbar">
              <PaymentOverview />
            </div>
            <div className="border rounded-md p-4 lg:p-6 max-h-[460px] overflow-auto custom-scrollbar">
              <RecentTransactions />
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
};

export default DashboardHome;
