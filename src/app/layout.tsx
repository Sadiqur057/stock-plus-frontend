import type { Metadata } from "next";
import "./globals.css";
import "@/assets/styles/global.scss";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: "Stock Plus - Your Inventory management and Invoicing solutions",
    template: "%s | Stock Plus",
  },
  description:
    "Take control of your business with our comprehensive inventory management solution. Boost efficiency, reduce costs, and drive growth with powerful features designed for modern businesses. Generate Invoice in just 30 seconds efficiently and effective. A fully user friendly stock management and Invoicing solutions that your business needs.",
  keywords: [
    "Stock Management",
    "Stock Plus",
    "stockpluspro",
    "StockPlus",
    "invoicing",
    "invoicing solutions",
    "generate invoicing",
    "stock manager",
    "manage stock",
    "create invoice",
    "invoice",
    "inventory",
    "inventory manage",
    "shop manage",
    "management system",
    "manage business",
  ],
  openGraph: {
    title: "Stock Plus - Your Inventory management and Invoicing solutions",
    description:
      "Take control of your business with our comprehensive inventory management solution. Boost efficiency, reduce costs, and drive growth with powerful features designed for modern businesses. Generate Invoice in just 30 seconds efficiently and effective. A fully user friendly stock management and Invoicing solutions that your business needs.",
    images: ["https://i.postimg.cc/g2wbF47F/heroImg.jpg"],
    url: "https://www.stockpluspro.shop",
  },
  twitter: {
    title: "Stock Plus - Your Inventory management and Invoicing solutions",
    description:
      "Take control of your business with our comprehensive inventory management solution. Boost efficiency, reduce costs, and drive growth with powerful features designed for modern businesses. Generate Invoice in just 30 seconds efficiently and effective. A fully user friendly stock management and Invoicing solutions that your business needs.",
    images: ["https://i.postimg.cc/g2wbF47F/heroImg.jpg"],
    card: "summary_large_image",
    creator: "Sadiqur057",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
