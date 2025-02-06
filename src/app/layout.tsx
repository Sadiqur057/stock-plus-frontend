import type { Metadata } from "next";
import "./globals.css";
import "@/assets/styles/global.scss";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: "StockPlus Pro | Simplify Inventory & Invoicing in 20 Seconds!",
    template: "%s | StockPlus Pro",
  },
  description:
    "Save time, reduce costs, & boost efficiency with StockPlus Pro. The ultimate inventory management & invoicing solution that your business needs. Try now!",
  keywords: [
    "Stock Management",
    "Stock Plus",
    "stockpluspro",
    "stock plus pro",
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
    title: "StockPlus Pro | Simplify Inventory & Invoicing in 20 Seconds!",
    description:
      "Save time, reduce costs, & boost efficiency with StockPlus Pro. The ultimate inventory management & invoicing solution that your business needs. Try now!",
    images: ["https://i.postimg.cc/g2wbF47F/heroImg.jpg"],
    url: "https://www.stockpluspro.shop",
    siteName: "StockPlus Pro",
    type: "website",
  },
  twitter: {
    title: "StockPlus Pro - Your Inventory management and Invoicing solutions",
    description:
      "Save time, reduce costs, & boost efficiency with StockPlus Pro. The ultimate inventory management & invoicing solution that your business needs. Try now!",
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
