"use client";
import ScreenLoader from "@/components/shared/Loader/ScreenLoader";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";

import { useQuery } from "@tanstack/react-query";
import api from "@/interceptors/api";
import AccountingSummary from "./AccountingSummary";
import { AccountingChart } from "./AccountingChart";

const breadcrumbList = [
  {
    name: "Accounting",
    link: "/dashboard/accounting",
  },
];

export default function AccountingPage() {
  const { isLoading, data: transactionData } = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const result = await api.get("/accounting");
      console.log("checking result", result);
      return result?.data?.data;
    },
  });

  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />

      {isLoading ? (
        <ScreenLoader />
      ) : (
        <>
          <AccountingSummary summary={transactionData?.summary} />
          <div className="my-6">
            <AccountingChart chartData={transactionData?.chartData} />
          </div>
        </>
      )}
    </>
  );
}
