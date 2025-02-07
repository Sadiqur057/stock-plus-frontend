import { ArrowRight, BarChart3, Clock, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import lineChartImage from "@/assets/images/line-chart-2.png";
import barChartImage from "@/assets/images/bar-chart-2.png";
import statImage1 from "@/assets/images/stat-card-1.png";
import statImage2 from "@/assets/images/stat-card-2.png";
import SectionHeading from "./SectionHeading";

const features = [
  {
    icon: TrendingUp,
    title: "Maximize Your Profits",
    description:
      "Track business profits effortlessly. Our analytics dashboard provides real-time insights into your inventory performance, helping you make informed decisions and optimize your business strategy.",
    stat: "37%",
    statText: "average profit increase",
  },
  {
    icon: Clock,
    title: "Save Precious Time",
    description:
      "Create customized invoices in minutes, saving you time and effort. Our user-friendly interface streamlines the process, allowing you to focus on what matters most - your business.",
    stat: "12hrs",
    statText: "saved per week",
  },
  {
    icon: BarChart3,
    title: "Scale Your Business",
    description:
      "From small shops to large enterprises, our flexible platform grows with you. Allowing seamless integration of various product types, making the platform adaptable for all inventory needs. ",
    stat: "2.5x",
    statText: "faster scaling",
  },
];

export function Specialties() {
  return (
    <section className="enhanced-features-bg pt-24 pb-16">
      <div className="relative container">
        <SectionHeading
          subtitle="Advanced Features"
          title="Everything you need to manage your inventory smarter"
          description="Take control of your business with our comprehensive inventory management solution. Boost efficiency, reduce costs, and drive growth with powerful features designed for modern businesses."
        />

        <div className="mx-auto mt-16 sm:mt-20 lg:mt-24">
          <div className="grid gap-x-20 gap-y-20 lg:grid-cols-2 2xl:grid-cols-7">
            <div className="flex flex-col gap-12 2xl:col-span-3">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`relative flex flex-col gap-4 animate-fadeInLeft animate-delay-${
                    (index + 2) * 100
                  }`}
                >
                  <div className="flex justify-between items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl md:text-2xl font-bold text-indigo-600">
                        {feature.stat}
                      </span>
                      <span className="text-sm text-gray-500">
                        {feature.statText}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="md:text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-gray-600 leading-relaxed text-sm md:text-base">{feature.description}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm font-medium text-indigo-600">
                    <Link
                      href="/dashboard"
                      className="flex gap-2 items-center"
                      aria-label="Try our inventory management solution now"
                    >
                      Try now <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative lg:ml-4 2xl:col-span-4 h-fit">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-white shadow-xl h-fit">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
                <div className="relative h-fit w-full p-4 md:p-8">
                  <div className="h-full rounded-xl bg-white p-3 md:p-6 shadow-lg">
                    <div className="mb-6 flex items-center justify-between">
                      <h4 className="text-lg font-semibold">
                        Dashboard Overview
                      </h4>
                      <div className="flex gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-400" />
                        <div className="h-2 w-2 rounded-full bg-yellow-400" />
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="">
                        <Image
                          src={statImage1}
                          alt="Statistical card showing inventory insights about invoices and incomes"
                          className="rounded-md"
                        />
                        <Image
                          src={statImage2}
                          alt="Statistical card showing inventory insights about due payments and number of customers"
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <Image
                            src={barChartImage}
                            alt="Bar chart visualizing business sales"
                          />
                        </div>
                        <div className="flex-1">
                          <Image
                            alt="Line chart displaying due and paid amount over time"
                            src={lineChartImage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="floatingCard cardTop"
                tabIndex={0}
                aria-label="System status is optimal"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400 text-white">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      System Status
                    </div>
                    <div className="text-xs text-gray-500"> Optimal</div>
                  </div>
                </div>
              </div>

              <div
                className="floatingCard cardBottom"
                tabIndex={0}
                aria-label="Efficiency Score 100% improvement"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Efficiency Score
                    </div>
                    <div className="text-xs text-gray-500">
                      100% improvement
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
