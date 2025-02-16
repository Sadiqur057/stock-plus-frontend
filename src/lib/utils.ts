import { clsx, type ClassValue } from "clsx";
import { getCookie } from "cookies-next";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate(dateString: string) {
  const date = format(new Date(dateString), "MM/dd/yyyy");
  return date;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return format(date, "MMM do, yyyy 'at' hh:mm a");
}

export function formatDateShort(dateString: string) {
  const date = new Date(dateString);
  return format(date, "MMM do, yyyy");
}

export function getFormattedPrice(price: number) {
  return price?.toLocaleString("en-IN");
}

export function getCurrency() {
  const code = getCookie("currency_code");
  return code;
}
