import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  CheckCircle2,
  ShieldPlus,
  Users,
} from "lucide-react";
import BreadCrumb from "@/components/shared/dashboard/BreadCrumb";

export default function UpgradePackage() {
  const breadcrumbList = [
    {
      name: "Upgrade Account",
      link: "/dashboard/upgrade",
    },
  ];
  return (
    <>
      <BreadCrumb breadcrumbList={breadcrumbList} />
      <section>
        <div className="space-y-6">
          <div className="space-y-6 text-center flex flex-col items-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Grow your business with better customer relationships
            </h1>
            <p className="text-lg text-muted-foreground">
              Empower your team with the tools they need to provide exceptional
              customer service and drive growth.
            </p>
            {/* <div className="flex space-x-4">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div> */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Badge variant="secondary" className="rounded-full px-4 py-1">
                <CheckCircle2 className="mr-1 h-4 w-4" />
                30-day free trial
              </Badge>
              <span className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                2,000+ companies
              </span>
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl pt-4 px-6 pb-6">
            <Tabs defaultValue="features" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                <TabsTrigger className="py-3" value="features">
                  Basic
                </TabsTrigger>
                <TabsTrigger className="py-3" value="pricing">
                  Standard
                </TabsTrigger>
                <TabsTrigger className="py-3" value="faq">
                  Premium
                </TabsTrigger>
              </TabsList>
              <TabsContent value="features" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Package</CardTitle>
                    <CardDescription>
                      Best for Startup Business.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        <span>
                          Customized dashboard to analyze business progress.
                        </span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        <span>Access to create invoices.</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        <span>All customization regarding products.</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        <span>Limited to 3 Employees account.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="pricing" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Standard Package</CardTitle>
                    <CardDescription>
                    Best for Customized Business Solutions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        <span>
                          Customized dashboard to analyze business progress.
                        </span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        <span>Access to create invoices.</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        <span>All customization regarding products.</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        <span>Limited to 6 Employees account.</span>
                      </li>
                    </ul>
                    <Button size="lg" className="mt-5 px-4">
                      <ShieldPlus /> Upgrade Package
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="faq" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Premium Package</CardTitle>
                    <CardDescription>
                      Best for International Business Solutions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        <span>
                          Customized dashboard to analyze business progress.
                        </span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        <span>Multi vendor functionalities.</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        <span>Customized invoices.</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        <span>All customization regarding products.</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        <span>Limited to 20 Employees account.</span>
                      </li>
                    </ul>
                    <Button size="lg" className="mt-5 px-4">
                      <ShieldPlus /> Upgrade Package
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}
