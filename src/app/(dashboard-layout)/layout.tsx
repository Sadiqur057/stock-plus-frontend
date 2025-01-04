"use client";

import { DashboardSidebar } from "@/components/dashboard/Sidebar/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import * as React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <>
      <SidebarProvider>
        <DashboardSidebar />
        {children}
      </SidebarProvider>
    </>
  );
}
