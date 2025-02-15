import React, { useState } from "react";
import StatsCard from "../Home/StatsCard";
import { getCurrency, getFormattedPrice } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  CircleDollarSign,
  DollarSign,
  HandCoins,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/interceptors/api";
import toast from "react-hot-toast";
import { getCookie, setCookie } from "cookies-next";

type TCurrency = {
  code: string;
  name: string;
};

type Props = {
  summary: {
    profit_percentage: number;
    total_expense: number;
    total_sales: number;
    total_purchase: number;
    other_costs: number;
    profit: number;
  };
};
const AccountingSummary = ({ summary }: Props) => {
  const [newVatRate, setNewVatRate] = useState("");

  const { data: currencies } = useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const result = await api.get("/currencies");
      return result?.data?.data;
    },
  });

  const { data: vat, refetch } = useQuery({
    queryKey: ["vat"],
    queryFn: async () => {
      const result = await api.get("/vat");
      return result?.data?.vat_rate;
    },
  });

  const accountCurrency = {
    name: getCookie("currency_name") || "BDT",
    code: getCookie("currency_code") || "Bangladeshi Taka",
  };
  const [selectedCurrency, setSelectedCurrency] = useState<TCurrency>({
    code: accountCurrency?.code,
    name: accountCurrency?.name,
  });

  const { mutate: updateVat } = useMutation({
    mutationFn: async (data: { company_vat_rate: number }) => {
      const result = await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/update-account`,
        data
      );
      if (!result?.data?.success) {
        return toast.error(
          result?.data?.message ||
            "Something Went Wrong. Please try again lated"
        );
      }
      toast.success(result?.data?.message);
      refetch();
    },
  });
  const { mutate: updateCurrency } = useMutation({
    mutationFn: async (data: {
      currency_code: string;
      currency_name: string;
    }) => {
      const result = await api.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/update-account`,
        data
      );
      if (!result?.data?.success) {
        return toast.error(
          result?.data?.message ||
            "Something Went Wrong. Please try again lated"
        );
      }
      toast.success(result?.data?.message);
      setCookie("currency_name", data?.currency_name);
      setCookie("currency_code", data?.currency_code);
      setSelectedCurrency({
        name: data?.currency_name || "Bangladeshi Taka",
        code: data?.currency_code || "BDT",
      });
    },
  });

  const handleCurrencyChange = (value: string) => {
    const newCurrency = currencies.find((c: TCurrency) => c.code === value);
    console.log(newCurrency);
    if (newCurrency) {
      const data = {
        currency_name: newCurrency?.name,
        currency_code: newCurrency?.code,
      };
      updateCurrency(data);
    }
  };

  const updateVatRate = () => {
    if (newVatRate && !isNaN(Number.parseFloat(newVatRate))) {
      const vat = Number.parseFloat(newVatRate);
      setNewVatRate("");
      const data = { company_vat_rate: vat };
      updateVat(data);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Expense"
          Icon={CircleDollarSign}
          value={`${
            getFormattedPrice(summary?.total_expense) || 0
          }  ${getCurrency()}`}
          comment={`From 34 transactions`}
          trend="up"
        />
        <StatsCard
          title="Total Sales"
          Icon={CircleDollarSign}
          value={`${
            getFormattedPrice(summary?.total_sales) || 0
          }  ${getCurrency()}`}
          comment={`From 24 transactions`}
          trend="up"
        />
        <StatsCard
          title="Total Purchase"
          Icon={CircleDollarSign}
          value={`${
            getFormattedPrice(summary?.total_purchase) || 0
          }  ${getCurrency()}`}
          comment={`From 8 transactions`}
          trend="up"
        />
        <StatsCard
          title="Other Costs"
          Icon={CircleDollarSign}
          value={`${
            getFormattedPrice(summary?.other_costs) || 0
          }  ${getCurrency()}`}
          comment={`120 invoice need to be cleared`}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
        <div className="bg-gray-50 border rounded-md">
          <CardHeader>
            <CardTitle>Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10">
                <HandCoins className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Current Profit Rate
                </p>
                <p className="text-lg font-bold">
                  {summary?.profit_percentage}%
                </p>
              </div>
            </div>
            <p className="mt-6">
              Total <span className="font-semibold">{summary?.profit}</span>{" "}
              {getCurrency()}
            </p>
            <p className="text-sm text-muted-foreground">
              Based on current sales and expenses
            </p>
          </CardContent>
        </div>
        <div className="bg-gray-50 border rounded-md">
          <CardHeader>
            <CardTitle>Account Currency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Current Currency
                </p>
                <p className="text-lg font-bold">{selectedCurrency?.code}</p>
              </div>
            </div>
            <div className="mt-6">
              <form className="flex bg-white shadow p-1 rounded-3xl w-full">
                <Select
                  onValueChange={handleCurrencyChange}
                  defaultValue={selectedCurrency?.code}
                >
                  <SelectTrigger className="rounded-3xl border-none shadow-none w-full">
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies?.map((currency: TCurrency) => (
                      <SelectItem key={currency?.code} value={currency?.code}>
                        <div className="flex items-center">
                          {currency?.name} ({currency?.code})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </form>
            </div>
          </CardContent>
        </div>
        <div className="bg-gray-50 border rounded-md">
          <CardHeader>
            <CardTitle>Account VAT Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10">
                <Percent className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Current VAT Rate
                </p>
                <p className="text-lg font-bold">{vat}%</p>
              </div>
            </div>
            <div className="flex mt-6 shadow rounded-3xl items-center pr-1 bg-white">
              <div className="relative flex-grow">
                <Input
                  id="new-vat-rate"
                  type="number"
                  placeholder="New rate"
                  value={newVatRate}
                  onChange={(e) => setNewVatRate(e.target.value)}
                  className="pl-6 pr-7 border-none rounded-3xl"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                  %
                </span>
              </div>
              <Button onClick={updateVatRate} className="rounded-3xl py-1">
                Update
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </>
  );
};

export default AccountingSummary;
