"use client";
import React, { useState } from "react";
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
import { Modal } from "@/components/shared/Modal/Modal";
import { DateFilter } from "../Filter/DateFilter";
import { Button } from "@/components/ui/button";
import { CalendarSearch, RotateCcw } from "lucide-react";
import CustomerDropdown from "@/components/shared/Dropdown/CustomerDropdown";

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

  const [startDate, setStartDate] = useState<string | Date | undefined>();
  const [endDate, setEndDate] = useState<string | Date | undefined>();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [duration, setDuration] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [customer],
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

  const handleApplyDateFilter = async () => {
    refetch();
    setIsModalOpen(false);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setDuration("");
    setCustomer(null);
    setTimeout(() => {
      refetch();
    }, 0);
  };

  return (
    <>
      <SidebarInset>
        <BreadCrumb breadcrumbList={breadcrumbList} />
        <div className="flex gap-4 flex-wrap justify-between mb-4">
          <CustomerDropdown
            setCustomer={setCustomer}
            label={false}
            customer={customer}
          />
          <div className="flex gap-4">
            <Button onClick={() => setIsModalOpen(true)}>
              <CalendarSearch />
              <span className="hidden md:block">Date </span>Filter
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Update Date Filter"
          >
            <DateFilter
              endDate={endDate}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              startDate={startDate}
              setDuration={setDuration}
              duration={duration}
              handleSubmit={handleApplyDateFilter}
              handleReset={handleReset}
            />
          </Modal>
        </div>
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
