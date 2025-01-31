"use client";

import * as React from "react";
import {
  BookOpen,
  BookUser,
  GalleryVerticalEnd,
  LayoutList,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react";

import { NavMain } from "./NavMain";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavProjects } from "./NavProject";
import { NavUser } from "./NavUser";
import { useQuery } from "@tanstack/react-query";
import api from "@/interceptors/api";

const data = {
  navMain: [
    {
      title: "Products",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All Products",
          url: "/dashboard/products",
        },
        {
          title: "Add Products",
          url: "/dashboard/products/add-product",
        },
        {
          title: "History",
          url: "#",
        },
      ],
    },
    {
      title: "Invoices",
      url: "#",
      isActive: false,
      icon: BookOpen,
      items: [
        {
          title: "View Invoices",
          url: "/dashboard/invoices",
        },
        {
          title: "Create Invoice",
          url: "/dashboard/create-invoice",
        },
        {
          title: "History",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Employees",
      url: "/dashboard/employees",
      icon: BookUser,
    },
    {
      name: "Customers",
      url: "/dashboard/customers",
      icon: Users,
    },
    {
      name: "Attributes",
      url: "/dashboard/products/customize-attribute",
      icon: LayoutList,
    },
  ],
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await api.get("/user");
      console.log(user?.data?.data);
      return user?.data?.data;
    },
  });

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="customized-sidebar !min-w-20"
    >
      <SidebarHeader className="py-2 mt-5">
        <SidebarMenuButton className="h-12 !min-w-10 mx-auto mb-4 py-4">
          <div>
            <GalleryVerticalEnd className="size-7" />
          </div>
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate text-lg font-semibold">
              {user?.company_name || "No Company"}
            </span>
            <span className="truncate text-xs">
              {user?.company_type || "NA"}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
