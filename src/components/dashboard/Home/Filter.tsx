"use client";

import React, { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { CalendarIcon, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomerDropdown from "@/components/shared/Dropdown/CustomerDropdown";
import { Customer } from "@/types/invoice.type";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { TDashboardOverviewData } from "./DashboardHome";

const durations = [
  { label: "Today", value: "D1" },
  { label: "Previous Day", value: "D-1" },
  { label: "Last 7 Days", value: "D7" },
  { label: "Last 30 Days", value: "D30" },
  { label: "Last 3 Months", value: "M3" },
  { label: "Last 6 Months", value: "M6" },
  { label: "Last 1 Year", value: "Y1" },
];

type TProps = {
  setCustomer: Dispatch<SetStateAction<Customer | null>>;
  customer: Customer | null;
  setStartDate: Dispatch<SetStateAction<string | Date | undefined>>;
  setEndDate: Dispatch<SetStateAction<string | Date | undefined>>;
  setDuration: Dispatch<SetStateAction<string>>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<TDashboardOverviewData, Error>>;
  endDate: string | Date | undefined;
  startDate: string | Date | undefined;
  duration: string;
};

export function Filter({
  setCustomer,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  refetch,
  setDuration,
  duration,
  customer,
}: TProps) {

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setCustomer(null);
    setDuration("");

    setTimeout(() => {
      refetch(); 
    }, 0); 
  };

  const handleApplyFilter = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      refetch();
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <form onSubmit={handleApplyFilter} className="space-y-4 mb-4 lg:mb-6">
      <div className="flex flex-wrap xl:flex-nowrap gap-4 justify-between w-full">
        <div className="flex gap-4 flex-wrap">
          <CustomerDropdown
            setCustomer={setCustomer}
            label={false}
            customer={customer}
          />
          <div className="xl:w-[220px]">
            <Select
              value={duration}
              onValueChange={(value) => {
                setDuration(value);
                setEndDate("");
                setStartDate("");
              }}
            >
              <SelectTrigger className="py-[22px] xl:w-[220px]">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {durations.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-4 w-fit flex-wrap">
          <Popover>
            <PopoverTrigger asChild className="min-w-[160px]">
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal !text-black",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? (
                  format(startDate, "LLL dd, y")
                ) : (
                  <span>Start date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate ? new Date(startDate) : undefined}
                onSelect={(date) => {
                  setStartDate(date ? date.toISOString() : "");
                  setDuration("");
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild className="min-w-[160px]">
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal !text-black",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "LLL dd, y") : <span>End date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate ? new Date(endDate) : undefined}
                onSelect={(date) => {
                  setEndDate(date ? date.toISOString() : "");
                  setDuration("");
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="flex gap-4 items-center">
            <Button type="submit">Apply Filters</Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
