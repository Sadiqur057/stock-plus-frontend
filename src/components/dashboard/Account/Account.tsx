"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  Twitter,
  Edit,
  BriefcaseBusiness,
  Mail,
  Phone,
  Facebook,
} from "lucide-react";
import Image from "next/image";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";
// import userAvatar from "@/assets/images/user.png";
import PackageContent from "./PackageContent";
import { useQuery } from "@tanstack/react-query";
import api from "@/interceptors/api";
import Loader from "@/components/ui/Loader";
import { useState } from "react";
import UpdateAccount from "./UpdateAccount";
import Link from "next/link";

export default function Account() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const breadcrumbList = [
    {
      name: "My Account",
      link: "/dashboard/my-account",
    },
  ];
  const {
    data: user,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await api.get("/user");
      const data = user?.data?.data;
      return data;
    },
  });
  const date = new Date(user?.created_at);
  const formattedDate = date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />
      {isPending ? (
        <div className="min-h-[calc(100vh-192px)] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <section>
          <div className="overflow-hidden">
            <CardHeader className="bg-gray-100 p-6">
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-2">
                <div className="flex gap-2 flex-col md:flex-row text-center md:text-left items-center space-x-4">
                  <Image
                    src="https://i.postimg.cc/4dMvVfNp/user.png"
                    alt="Profile Picture"
                    width={72}
                    height={72}
                    className="rounded-full border-4 border-primary-foreground"
                  />
                  <div>
                    <CardTitle className="text-xl md:text-2xl font-semibold">
                      {user?.name || "NA"}
                      <span className="text-sm text-gray-700 font-normal md:hidden">
                        {" "}
                        ({user?.role || "NA"})
                      </span>
                    </CardTitle>
                    <CardDescription className="text-gray-700 hidden md:block">
                      {user?.role}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="text-primary"
                  onClick={() => setIsOpen(true)}
                >
                  <Edit className="mr-1 h-4 w-4" />
                  Update Account
                </Button>
                <UpdateAccount
                  refetch={refetch}
                  setIsOpen={setIsOpen}
                  isOpen={isOpen}
                  user={user}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="company" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-muted/50 p-0">
                  <TabsTrigger
                    value="company"
                    className="rounded-none border-b-2 border-transparent px-6 py-2 data-[state=active]:border-primary"
                  >
                    Company
                  </TabsTrigger>
                  <TabsTrigger
                    value="package"
                    className="rounded-none border-b-2 border-transparent px-6 py-2 data-[state=active]:border-primary"
                  >
                    Package
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="company" className="py-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        {user?.company_name || "No Company"}
                      </h3>
                      {user?.company_name ? (
                        <>
                          <p className="text-muted-foreground mb-4">
                            {user?.company_description || "NA"}
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <BriefcaseBusiness className="h-5 w-5 text-muted-foreground mr-2" />
                              <span>{user?.company_type || "NA"}</span>
                            </li>
                            <li className="flex items-center">
                              <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                              <span>{user?.company_location || "NA"}</span>
                            </li>
                          </ul>
                        </>
                      ) : (
                        <p>Please update your account</p>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="text-sm font-medium">Joined</span>
                        </div>
                        <span className="text-sm">{formattedDate}</span>
                      </div>
                      <p className="font-semibold">Contacts: </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                          <span>{user?.company_email || "NA"}</span>
                        </li>
                        <li className="flex items-center">
                          <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                          <span>{user?.company_phone || "NA"}</span>
                        </li>
                        {user?.twitter_url && (
                          <li className="flex items-center">
                            <Twitter className="h-5 w-5 text-muted-foreground mr-2" />
                            <Link
                              href={user?.twitter_url}
                              className="text-blue-600"
                            >
                              {user?.twitter_url || "NA"}
                            </Link>
                          </li>
                        )}
                        {user?.facebook_url && (
                          <li className="flex items-center">
                            <Facebook className="h-5 w-5 text-muted-foreground mr-2" />
                            <Link
                              href={user?.facebook_url}
                              className="text-blue-600"
                            >
                              {user?.facebook_url || "NA"}
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="package" className="py-6">
                  <PackageContent />
                </TabsContent>
              </Tabs>
            </CardContent>
          </div>
        </section>
      )}
    </>
  );
}
