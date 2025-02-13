"use client";

import React, { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
  setStartDate: Dispatch<SetStateAction<string | Date | undefined>>;
  setEndDate: Dispatch<SetStateAction<string | Date | undefined>>;
  setDuration: Dispatch<SetStateAction<string>>;
  handleSubmit: (event: React.MouseEvent) => Promise<void>;
  handleReset: () => void;
  endDate: string | Date | undefined;
  startDate: string | Date | undefined;
  duration: string;
};

export function DateFilter({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  handleSubmit,
  setDuration,
  duration,
}: TProps) {
  return (
    <>
      <div className="w-full">
        <Select
          value={duration}
          onValueChange={(value) => {
            setDuration(value);
            setEndDate("");
            setStartDate("");
          }}
        >
          <SelectTrigger className="py-[22px] w-full">
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
      <p className="text-center mt-4 text-muted-foreground">Or</p>
      <div className="flex gap-4 w-full my-4">
        <Popover modal={true}>
          <PopoverTrigger asChild className="w-full">
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

        <Popover modal={true}>
          <PopoverTrigger asChild className="w-full">
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
      </div>

      <div className="flex justify-end">
        <Button type="submit" onClick={handleSubmit}>
          Apply
        </Button>
      </div>
    </>
  );
}
