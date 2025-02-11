import { clsx, type ClassValue } from "clsx";
import { getCookie } from "cookies-next";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate(dateString: string) {
  const date = new Date(dateString);
  return format(date, "MMM do, yyyy");
}
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return format(date, "MMM do, yyyy 'at' hh:mm a");
}

export function getFormattedPrice(price: number) {
  return price?.toLocaleString("en-IN");
}

export function beautifyDate(date: string) {
  return format(parseISO(date), "MMM d, yyyy 'at' hh:mm a");
}
export function getCurrency() {
  const code = getCookie("currency_code");
  return code;
}
