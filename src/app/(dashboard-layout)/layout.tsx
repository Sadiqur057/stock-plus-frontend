"use client";

import { DashboardSidebar } from "@/components/dashboard/Sidebar/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface LayoutProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();
export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <DashboardSidebar />
          <div className="md:px-6 w-full container mb-6">{children}</div>
        </SidebarProvider>
      </QueryClientProvider>
    </>
  );
}
