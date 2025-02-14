"use client";
import ScreenLoader from "@/components/shared/Loader/ScreenLoader";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";

import { useQuery } from "@tanstack/react-query";
import api from "@/interceptors/api";
import AccountingSummary from "./AccountingSummary";
import { AccountingChart } from "./AccountingChart";
import { useState } from "react";
import { format } from "date-fns";
import { Modal } from "@/components/shared/Modal/Modal";
import { DateFilter } from "../Filter/DateFilter";
import { Button } from "@/components/ui/button";
import { CalendarSearch, RotateCcw } from "lucide-react";

const breadcrumbList = [
  {
    name: "Accounting",
    link: "/dashboard/accounting",
  },
];

export default function AccountingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<string | Date | undefined>();
  const [endDate, setEndDate] = useState<string | Date | undefined>();
  const [duration, setDuration] = useState<string>("");

  const {
    isLoading,
    data: transactionData,
    refetch,
  } = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const result = await api.get("/accounting", {
        params: {
          start_date: startDate ? format(startDate, "yyyy-MM-dd") : "",
          end_date: endDate ? format(endDate, "yyyy-MM-dd") : "",
          duration: duration,
        },
      });
      console.log("checking result", result);
      return result?.data;
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
    setTimeout(() => {
      refetch();
    }, 0);
  };

  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />

      {isLoading ? (
        <ScreenLoader />
      ) : (
        <>
          <div className="flex gap-4 flex-wrap mb-4 justify-between items-center">
            <p className="font-medium">Customize Accounting</p>
            <div className="flex gap-4">
              <Button onClick={() => setIsModalOpen(true)}>
                <CalendarSearch />
                Date Filter
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
          <AccountingSummary summary={transactionData?.data?.summary} />
          <div className="my-6">
            <AccountingChart chartData={transactionData?.data?.chartData} />
          </div>
        </>
      )}
    </>
  );
}
