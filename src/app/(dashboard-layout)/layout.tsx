"use client";

import { DashboardSidebar } from "@/components/dashboard/Sidebar/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import poppins from "@/fonts/font";
import NProgressBar from "@/components/Nprogress/NProgressBar";
import Loader from "@/components/ui/Loader";

interface LayoutProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();
export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <React.Suspense fallback={<Loader />}>
      <NProgressBar />
      <QueryClientProvider client={queryClient}>
        <SidebarProvider className={`${poppins.className} md:flex`}>
          <div className="md:min-w-20">
            <DashboardSidebar />
          </div>
          <div className="md:px-10 w-full md:flex-1 container  mb-6 overflow-hidden">
            {children}
          </div>
        </SidebarProvider>
      </QueryClientProvider>
    </React.Suspense>
  );
}
