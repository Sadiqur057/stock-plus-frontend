"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
  SquareTerminal,
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
          title: "Customize Attribute",
          url: "/dashboard/products/customize-attribute",
        },
        {
          title: "History",
          url: "#",
        },
      ],
    },
    {
      title: "Employees",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "All Employees",
          url: "#",
        },
        {
          title: "Add Employees",
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
          url: "#",
        },
        {
          title: "Create Invoice",
          url: "#",
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
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
  ],
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="customized-sidebar !min-w-20">
      <SidebarHeader className="py-2 mt-5">
        <SidebarMenuButton className="h-12 !min-w-10 mx-auto mb-4 py-4">
          <div>
            <GalleryVerticalEnd className="size-7" />
          </div>
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate text-lg font-semibold">Acme Inc</span>
            <span className="truncate text-xs">Enterprise</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
