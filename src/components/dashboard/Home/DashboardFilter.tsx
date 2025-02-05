"use client";

import * as React from "react";
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
import toast from "react-hot-toast";

const durations = [
  { label: "Today", value: "today" },
  { label: "Previous Day", value: "previous_day" },
  { label: "7 Days", value: "7_days" },
  { label: "30 Days", value: "30_days" },
  { label: "6 Months", value: "6_months" },
  { label: "1 Year", value: "1_year" },
];

export function DashboardFilter() {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [customer, setCustomer] = React.useState<string>("");
  const [product, setProduct] = React.useState<string>("");
  const [duration, setDuration] = React.useState<string>("");

  const handleReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setCustomer("");
    setProduct("");
    setDuration("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // const params = new URLSearchParams({
    //   start_date: startDate ? format(startDate, "yyyy-MM-dd") : "",
    //   end_date: endDate ? format(endDate, "yyyy-MM-dd") : "",
    //   customer,
    //   product,
    //   duration,
    // });

    try {
      // const response = await fetch(`/api/dashboard?${params.toString()}`);
      // const data = await response.json();
      // console.log(data);
      toast.error("Under maintenance. Will be added soon");
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4 lg:mb-6">
      <div className="flex flex-wrap xl:flex-nowrap gap-4">
        <div className="flex gap-4 w-fit">
          <Popover>
            <PopoverTrigger asChild>
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
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
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
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Select value={customer} onValueChange={setCustomer}>
          <SelectTrigger className="flex-1 py-[22px]">
            <SelectValue placeholder="Select customer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer1">Customer 1</SelectItem>
            <SelectItem value="customer2">Customer 2</SelectItem>
            <SelectItem value="customer3">Customer 3</SelectItem>
          </SelectContent>
        </Select>

        <Select value={product} onValueChange={setProduct}>
          <SelectTrigger className="flex-1 py-[22px]">
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="product1">Product 1</SelectItem>
            <SelectItem value="product2">Product 2</SelectItem>
            <SelectItem value="product3">Product 3</SelectItem>
          </SelectContent>
        </Select>

        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger className="flex-1 py-[22px]">
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
        <div className="flex gap-4 items-center flex-1">
          <Button type="submit">Apply Filters</Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
