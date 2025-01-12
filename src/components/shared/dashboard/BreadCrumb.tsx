import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";
interface BreadCrumbItem {
  name: string;
  link: string;
}
interface BreadCrumbProps {
  breadcrumbList: BreadCrumbItem[];
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ breadcrumbList }) => {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear bg-gray-50 mb-6 mt-3 rounded-md">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1">
            <PanelLeft />
          </SidebarTrigger>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink className="hover:text-blue-800" href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  className="hover:text-blue-800"
                  href="/dashboard"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              {breadcrumbList
                ?.slice(0, breadcrumbList.length - 1)
                ?.map((item) => (
                  <React.Fragment key={item?.link}>
                    <BreadcrumbItem key={item?.link}>
                      <BreadcrumbLink
                        className="hover:text-blue-800"
                        href={item?.link}
                      >
                        {item?.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </React.Fragment>
                ))}
              <BreadcrumbItem>
                <BreadcrumbPage className="text-blue-800">
                  {breadcrumbList[breadcrumbList?.length - 1]?.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
    </>
  );
};

export default BreadCrumb;
