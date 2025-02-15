import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TProps = {
  selectedStatus: string;
  setSelectedStatus: Dispatch<SetStateAction<string>>;
};

const status = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Partially Paid", value: "partially paid" },
];

const StatusFilter = ({
  selectedStatus,
  setSelectedStatus,
}: TProps) => {
  return (
    <div className="xl:w-[210px]">
      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
        <SelectTrigger className="py-[21px] min-w-[160px] xl:w-[210px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {status?.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StatusFilter;
