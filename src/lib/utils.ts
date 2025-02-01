import { clsx, type ClassValue } from "clsx";
import { parse, format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate(date: string) {
  const parsedDate = parse(date ?? "", "M/d/yyyy, h:mm:ss a", new Date());
  const formattedDate = format(parsedDate, "MMMM do, yyyy 'at' hh:mm a");
  return formattedDate;
}
